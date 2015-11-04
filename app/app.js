angular.module("app", [
    'appControllers',
    'ngRoute',
    'app.home'
])

.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider,
                                                                         $locationProvider,
                                                                         $httpProvider) {
    //$routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);

  }]);
