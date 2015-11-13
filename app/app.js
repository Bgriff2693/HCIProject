angular.module("app", [
    'appControllers',
    'ngRoute',
    'app.home',
    'ui.gravatar' // For loading gravatar image with email
])

.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider,
                                                                         $locationProvider,
                                                                         $httpProvider) {
    //$routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);

  }]);
