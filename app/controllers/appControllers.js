angular.module('appControllers', [])
    .controller('degreeController', ['$http', '$scope', function($http, $scope) {

        var vm = this;
        vm.panelBodyOpen = false;

        // Gets the current courses in the json file and puts it in the scope
        $http.get('app/database/degree_plan.JSON')
            .success(function(data) {
                vm.courses = data.courses;
                console.log("Courses:");
                console.log(data);
            })
            .error(function (data, status, headers, config) {
                console.log("ERROR: Could not get courses");
            });
    }])

    .controller('trackController', ['$http', '$scope', function($http, $scope) {

        var vm = this;
        vm.panelBodyOpen = false;
        vm.panelTwoOpen = false;
        vm.panelThreeOpen = false;
        vm.selectedCourse = null;
        // Gets the current courses in the json file and puts it in the scope

    }])

    .controller('sectionController', ['$scope', function($scope) {

        $scope.init = function(cid)
        {
            // This function is sort of private constructor for controller
            // You can pass the CID to this through ng-init and use it in the controller
            $scope.sections = sections;
            console.log(sections)
        };

    }])

    .controller('userController', ['$scope', function($scope) {

        $scope.user =  {
            name: 'Matt Mullenweg',
            hours: 258,
            gpa: 1.6,
            classification: 'U4',
            email: 'm@mullenweg.com'
        }
    }])

    .filter('unique', function() {
        return function(collection, keyname) {
            var output = [],
            keys = [];

            angular.forEach(collection, function(item) {
                var key = item[keyname];
                if(keys.indexOf(key) === -1) {
                    keys.push(key);
                    output.push(item);
                }
            });

            return output;
        };
    });
