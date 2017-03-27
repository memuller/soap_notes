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

app.controller('ListsController', function($scope, $location, Note, Patient, $q) {
  const notes = Note.list()
  const patients = Patient.list()

  $scope.notes = notes
  $scope.patients = (query) => {
    return $q((resolve,reject) => {
      resolve(patients.filter((item) => item.name.includes(query)))
    })
  }

  $scope.goToNote = (note) => $location.path(`/note/${note.id}`)
  $scope.newNote = (patient) => $location.path(`/new/${patient.id}`)
  $scope.createPatientAndGoToNewNote = (patientName) => {
    const patient = new Patient( { name: patientName } )
    patient.save()
    $location.path(`/new/${patient.id}`)
  }
  $scope.goToPatient = (note) => console.log('not implemented')

})

app.controller('NotesController', function($scope) {

})

app.controller('SOAPController', function($scope) {
  $scope.title = 'SOAP Notes'
})
