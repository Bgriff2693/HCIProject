angular.module('appControllers', [])
  .controller('MainController', ['$http', function($http) {
    vm = this;

    $http.get('database/degree_plan.JSON').success(function(data) {
      this.data = data;
    })


  }])
  .controller('MenuController', [function() {

  }]);