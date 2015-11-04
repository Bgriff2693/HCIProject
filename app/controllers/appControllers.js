angular.module('appControllers', [])
    .controller('degreeController', ['$http', '$scope', function($http, $scope) {
        vm = this;
        $scope.courses = null;

        $http.get('app/database/degree_plan.JSON')
            .success(function(data) {
                $scope.courses = data.courses;
                console.log(data);
            })
            .error(function (data, status, headers, config) {
                console.log("ERROR, ERROR, ERROR");
            });
    }])

    .controller('MenuController', [function() {

    }]);
