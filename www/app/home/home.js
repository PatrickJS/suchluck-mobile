angular.module('home', [])

.config(function($stateProvider) {

  $stateProvider
  .state('app.home', {
    url: '/home',
    views: {
      'main': {
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      }
    }
  });

})

.controller('HomeCtrl', function($scope, Doge) {
  console.log('HomeCtrl');

  $scope.doge = Doge;

});