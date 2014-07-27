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

.controller('HomeCtrl', function($scope) {
  console.log('HomeCtrl');

  $scope.dogecoin = 0;

  $scope.step = 100;

  $scope.up = function() {
    $scope.dogecoin += $scope.step;
  };

  $scope.down = function() {
    if ($scope.dogecoin) {
      $scope.dogecoin -= $scope.step;
    }
  };

});