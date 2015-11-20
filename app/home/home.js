'use strict';

angular.module('app.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/home/home.html',
        controller: 'degreeCtrl',
        controllerAs: 'degree'
    });
}]);
