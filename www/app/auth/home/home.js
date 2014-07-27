angular.module('app.home', [])

.config(function($stateProvider) {

  $stateProvider
  .state('app.home', {
    url: '/search',
    views: {
      'main': {
        templateUrl: 'app/auth/home/home.html'
      }
    }
  });

})

.controller('HomeCtrl', function($scope) {
  console.log('HomeCtrl');

});