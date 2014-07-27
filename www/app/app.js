angular.module('suchApp', [
  'ionic',

  'home'
])
.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'app/app.html',
    controller: 'AppCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})

.factory('authInterceptor', function ($rootScope, $q, $window, $injector) {
  var User = null;
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if (!User) {
        User = $injector.get('User');
      }
      if (User.isAuthenticated()) {
        config.headers.Authorization = 'Bearer ' + User.getToken();
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        if (!User) {
          User = $injector.get('User');
        }
        // handle the case where the user is not authenticated
        User.logout();
      }
      return response || $q.when(response);
    }
  };

})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
})

.factory('User', function($http, $window) {

  var baseUrl = 'http://156d2b91.ngrok.com';
  var token = $window.sessionStorage.suchLuckToken || null;

  return {
    isAuthenticated: function() {
      return !!token;
    },
    getToken: function() {
      return token;
    },
    login: function(input) {
      return $http.post(baseUrl + '/api/login', {
        username: input.username,
        password: input.password
      }).then(function(res) {
        console.log('token', res.data.token);
        token = res.data.token;
        delete res.data.token;
        $window.sessionStorage.suchLuckToken = token;
        return res.data;
      });
    },
    logout: function() {
      token = null;
      $window.sessionStorage.suchLuckToken = null;
    }

  };

})

.factory('Doge', function() {

  var cache = {
    step: 100,
    coin: 0
  };


  return {
    coin: cache.coin,
    step: cache.step,
    get: function(type) {
      return cache[type];
    },
    up: function() {
      cache.coin += cache.step;
    },
    down: function() {
      if (cache.coin) {
        cache.coin -= cache.step;
      }

    }
  };

})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, User) {
  // Form data for the login modal
  $scope.loginData = {};

  $scope.isAuthenticated = User.isAuthenticated;

  // Create the login modal that we will use later
  var login = $ionicModal.fromTemplateUrl('app/auth/login.html', { scope: $scope });
  login.then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.logout = function() {
    console.log('Logout');
    User.logout();
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function(input) {
    $scope.disable = true;
    console.log('Doing login', $scope.loginData);

    User.login({
      username: input.username,
      password: input.password
    })
    .then(function(response) {
      console.log('response', response);
      $scope.closeLogin();
    })
    .catch(function(err) {
      console.log('err', err);
    })
    .finally(function() {
      $scope.disable = false;
      $scope.loginData = {};
    });

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);

  };

  // Create the login modal that we will use later
  // var signup = $ionicModal.fromTemplateUrl('app/auth/signup.html', { scope: $scope });
  // signup.then(function(modal) {
  //   $scope.signup = modal;
  // });

  // // Triggered in the login modal to close it
  // $scope.closeSignup = function() {
  //   $scope.signup.hide();
  // };

  // // Open the Signup modal
  // $scope.signup = function() {
  //   $scope.signup.show();
  // };

  // // Perform the Signup action when the user submits the Signup form
  // $scope.doSignup = function() {
  //   console.log('Doing login', $scope.loginData);

  //   // Simulate a login delay. Remove this and replace with your login
  //   // code if using a login system
  //   $timeout(function() {
  //     $scope.closeSignup();
  //   }, 1000);

  // };


})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

