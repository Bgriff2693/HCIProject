'use strict';

angular.module('app.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/home/home.html',
        controller: 'homeCtrl',
        controllerAs: 'home'
    });
}])


.controller('homeCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {
	var vm = this;

    $scope.tracks =
    [
        { name: 'Core' },
        { name: 'Algorithms and Theory' },
        { name: 'Systems' },
        { name: 'Software' },
        { name: 'Information and intelligent Systems' }
    ]

}]);
