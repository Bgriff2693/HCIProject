(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .controller('mainController', ['$http', '$scope', function($http, $scope) {
        $http.get('assets/json/degree_plan.json')
            .success(function(data) {
                $scope.courses = data.courses;
                console.log($scope.courses);
            })
            .error(function(data, status, headers, config) {
                console.log('Error');
            });
    }])
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }

})();
