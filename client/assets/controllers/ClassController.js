app.controller('ClassController', ['$scope', function($scope) {
  $scope.classes =
  [
      {
          name: 'Senior Design',
          code: 'CSCE 482',
          link: 'class_views/csce482.html'
      },
      {
          name: 'Graphics',
          code: 'CSCE 441',
          link: 'class_views/csce441.html'
      }
  ]
}]);
