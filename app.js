const app = angular.module('SOAPNotes', ['ngRoute', 'ngMaterial'])

app.config(($routeProvider) => {
  $routeProvider
    .when('/', {
      controller: 'ListsController',
      templateUrl: 'pages/home.html'
    })
    .when('/log', {
      controller: 'ListsController',
      templateUrl: 'pages/log.html'
    })
    .when('/new', {
      controller: 'NotesController',
      templateUrl: 'pages/noteNew.html'
    })
    .when('/note', {
      controller: 'NotesController',
      templateURL: 'pages/noteView.html'
    })

})

app.controller('ListsController', ($scope) => {
  $scope.patients = [
    {name: 'lucas'}, {name: 'devard'}, {name: 'demostenes'}
  ]
})

app.controller('NotesController', ($scope) => {

})

app.controller('SOAPController', ($scope) => {
  $scope.title = 'SOAP Notes'
})
