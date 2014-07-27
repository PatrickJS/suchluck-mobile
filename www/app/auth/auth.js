angular.module('app.auth', [])

.config(function($stateProvider) {

  $stateProvider
  .state('app.auth', {
    url: '/auth',
    abstract: true,
    views: {
      'main': {
        templateUrl: 'app/auth/auth.html'
      }
    }
  });

})

.controller('HomeCtrl', function($scope) {
  console.log('HomeCtrl');

});