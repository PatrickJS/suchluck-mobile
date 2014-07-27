angular.module('suchApp', [
  'ionic',

  'home'
])

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

.factory('User', function($http) {

  return {
    login: function(input) {
      return $http.post('/api/login', {
        username: input.username,
        password: input.password
      }).then(function(res) {
        return res.data;
      });
    },
    logout: function() {

    }

  };

})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, User) {
  // Form data for the login modal
  $scope.loginData = {};

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

  // Perform the login action when the user submits the login form
  $scope.doLogin = function(input) {
    console.log('Doing login', $scope.loginData);

    User.login({
      username: input.username,
      password: input.password
    })
    .then(function(response) {
      console.log(response);
      $scope.closeLogin();

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
  //   $scope.modal = modal;
  // });

  // Triggered in the login modal to close it
  $scope.closeSignup = function() {
    $scope.modal.hide();
  };

  // Open the Signup modal
  $scope.signup = function() {
    $scope.modal.show();
  };

  // Perform the Signup action when the user submits the Signup form
  $scope.doSignup = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);

  };


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

