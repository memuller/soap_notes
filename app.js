const app = angular.module('SOAPNotes', [])

app.controller('SOAPController', ($scope) => {
  $scope.title = 'SOAP Notes'

  $scope.patients = [
    {name: 'lucas'}, {name: 'devard'}, {name: 'demostenes'}
  ]

})
