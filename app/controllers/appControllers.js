angular.module('appControllers', [])
  .controller('mainCtrl', ['$http', function($http) {
    var vm = this;

  }])

  .controller('degreeCtrl', ['$http', function ($http) {
    var vm = this;
    // Gets the current courses in the json file and puts it in the scope
    $http.get('app/database/degree_plan.JSON')
      .success(function (data) {
        vm.courses = data['courses'];
      })
      .error(function (data) {
        console.log("ERROR: Could not get courses");
        vm.courses = data;
      });

  }])

  .controller('testCtrl', [function() {
    var vm = this;

    vm.items = ['starbux', '2%', 'dericious'];
    vm.newitems = ['shit', 'moreshit', 'dubleshit'];
    vm.coffee = 'starbux';
    vm.milk = '2%';
    vm.tea = 'dericious';

    vm.bool = true;

    vm.fade = function(){
      setInterval(function(){
        vm.bool = !vm.bool;
      }, 1000)
    };

    vm.updateMenu = function(item){
      console.log(item);
      for(var i = 0; i < vm.items.length; ++i){
        vm.items[i] = vm.newitems[i];
      }
    }
  }])

  .filter('unique', function () {
    return function (collection, keyname) {
      var output = [],
        keys = [];

      angular.forEach(collection, function (item) {
        var key = item[keyname];
        if (keys.indexOf(key) === -1) {
          keys.push(key);
          output.push(item);
        }
      });

      return output;
    };
  });
