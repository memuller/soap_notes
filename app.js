const app = angular.module('SOAPNotes', ['ngRoute', 'ngMaterial'])

app.config(($routeProvider, $locationProvider) => {
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
    .when('/note/:noteId', {
      controller: 'NotesController',
      templateUrl: 'pages/noteView.html'
    })

  // would really prefer this, but it's not working right now.
  //$locationProvider.html5Mode(true)
})

app.controller('ListsController', function($scope) {
  $scope.patients = [
    {name: 'lucas'}, {name: 'devard'}, {name: 'demostenes'}
  ]
})

app.controller('NotesController', function($scope) {

})

app.controller('SOAPController', function($scope) {
  $scope.title = 'SOAP Notes'
})
