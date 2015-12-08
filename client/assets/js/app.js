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
            name : 'Gina Fargle',
            email : 'gina.fargle@gmail.com'
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

        $scope.register = function(section, course) {
            ++section.current_capacity;
            section.registered = true;
            $scope.save();
            $scope.addClass(section, course)
        }

        $scope.addClass = function(section, course){
            console.log("Course: "+JSON.stringify(course));
            //for(var i = 0; i < course.length; i++){
            //console.log("Looking");
            //if(course.section[i].CRN == crn){
            var newCourse = section;
            newCourse.subject = course.name;
            newCourse.CID = course.CID;
            //  console.log("Section found: "+JSON.stringify(course.section[i]));
            $scope.schedule.courses.push(newCourse);
            $http.post('http://localhost:9000/save2', JSON.stringify($scope.schedule));
            //}
            //}
            console.log($scope.schedule);
            //$http.post('http://localhost:9000/save2', JSON.stringify($scope.schedule));
        }

        // $scope.removeClass = function(CRN){
        //     // console.log("Course: "+JSON.stringify(course));
        //     delete $scope.schedule.courses.section.
        //     $http.post('http://localhost:9000/save3/' + CRN);
        //     //}
        //     //}
        //     console.log($scope.schedule);
        //     //$http.post('http://localhost:9000/save2', JSON.stringify($scope.schedule));
        // }

        $scope.track = function(section) {
            section.tracking = true;
            $scope.save();
        }

        $scope.untrack = function(section) {
            section.tracking = false;
            $scope.save();
        }

        $scope.drop = function(section, CID) {

          //var newSchedule = $scope.schedule;
         console.log("Removing: "+section.CID);
          var newSchedule = new Array();
          for(var i = 0; i < $scope.schedule.courses.length; i++){

            //newSchedule.courses = [];

            if($scope.schedule.courses[i].CID != section.CID){
              console.log("Pushing "+JSON.stringify($scope.schedule.courses[i]));
              //$scope.schedule.courses.splice(i, 1);
              newSchedule.push($scope.schedule.courses[i]);
              console.log("Pushing "+JSON.stringify(newSchedule));

            }

          }
          $scope.schedule.courses = newSchedule;
          console.log("New: "+JSON.stringify(newSchedule));
          console.log("Removed: "+JSON.stringify($scope.schedule));
          $http.post('http://localhost:9000/save2', JSON.stringify($scope.schedule));
            --section.current_capacity;
            section.registered = false;
            if(section.tracking) {
                $http.get('http://localhost:9000/email/' + CID )
                .success(function(data) {
                    console.log('Drop Response: ' + data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            }

            // $scope.removeClass(section.CRN);
            $scope.save();
        }

        $scope.save = function() {
            $http.post('http://localhost:9000/save', JSON.stringify({"courses": $scope.courses}));
        }

        $scope.full = function(registered, capacity) {
            return registered >= capacity;
        }

        $scope.registered = function(course) {
            for(var i = 0; i < course.section.length; i++) {
                if(course.section[i].registered) {
                    // console.log("Found a registered section");
                    return true;
                }
            }
            // console.log("Did not find a registered section");
            return false;
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
                name: 'Communication',
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
                track: 'SYSTEMS',
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
