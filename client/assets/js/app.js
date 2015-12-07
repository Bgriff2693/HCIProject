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

        $scope.user = {
            name : 'Test User'
        }

        $http.get('assets/json/degree_plan.json')
            .success(function(data) {
                $scope.courses = data.courses;
                console.log($scope.courses);
            })
            .error(function(data, status, headers, config) {
                console.log('Error');
            });
        $http.get('assets/json/scheduled.json')
          .success(function(data) {
            $scope.schedule = data;
            console.log($scope.schedule);
          })
          .error(function(data, status, headers, config) {
            console.log('Error');
          });

      $scope.addClass = function(course, crn){
        for(var i = 0; i < course.section.length; i++){
          //console.log("Looking");
          if(course.section[i].CRN == crn){
            var newCourse = course.section[i];
            newCourse.subject = course.name;
            newCourse.CID = course.CID;
            console.log("Section found: "+JSON.stringify(course.section[i]));

            $scope.schedule.courses.push(newCourse);
            $http.post('http://localhost:9000/save2', JSON.stringify($scope.schedule));
          }
        }

        console.log($scope.schedule);
        //$http.post('http://localhost:9000/save2', JSON.stringify($scope.schedule));
      }

        $scope.register = function(course, crn) {
            ++course.registered;
          $http.post('http://localhost:9000/save', JSON.stringify({"courses": $scope.courses}));
          $scope.save();


          $scope.addClass(course, crn);

        }

        $scope.save = function() {
            $http.post('http://localhost:9000/save', JSON.stringify({"courses": $scope.courses}));
        }

        $scope.full = function(registered, capacity) {
            return registered >= capacity;
        }
    }])
    .controller('coreController', ['$scope', function($scope) {

        $scope.coreTracks = [
            {
                track: 'CORE',
                name: 'Computer Science',
                hours: 30
            },
            {
                track: 'MATH & STAT',
                name: 'Math and Statistics',
                hours: 14
            },
            {
                track: 'COMMUNICATION',
                name: 'Communitcation',
                hours: 6
            },
            {
                track: 'GOVT/POLITICAL SCI',
                name: 'Political Science',
                hours: 6
            },
            {
                track: 'LANG, PHIL & CULT',
                name: 'Humanities',
                hours: 3
            },
            {
                track: 'SCIENCE',
                name: 'Science',
                hours: 16
            }
        ]

        $scope.completeTracks = ['General Elective', 'History']

    }])
    .controller('upperController', ['$scope', function($scope) {
        $scope.upperTracks = [
            {
                track: 'Algorithms and Theory',
                name: 'Algorithms and Theory',
            },
            {
                track: 'Systems',
                name: 'Systems',
            },
            {
                track: 'Software',
                name: 'Software',
            },
            {
                track: 'Information and intelligent Systems',
                name: 'Information and Intelligent Systems',
            }
        ]
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
