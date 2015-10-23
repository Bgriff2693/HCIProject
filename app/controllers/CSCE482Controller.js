app.controller('CSCE482Controller', ['$scope', function($scope) {
  $scope.sections =
  [
      {
          professor: 'Dr. Shell',
          section: '504',
          link: 'http://robotics.cs.tamu.edu/dshell/',
          rmplink: 'http://www.ratemyprofessors.com/ShowRatings.jsp?tid=1871874'
      },
      {
          professor: 'Dr. Shell',
          section: '505',
          link: 'http://robotics.cs.tamu.edu/dshell/',
          rmplink: 'http://www.ratemyprofessors.com/ShowRatings.jsp?tid=1871874'
      },
      {
          professor: 'Dr. Keyser',
          section: '506',
          link: 'http://faculty.cs.tamu.edu/keyser/',
          rmplink: '#'
      }
  ]
}]);
