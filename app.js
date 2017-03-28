const app = angular.module('SOAPNotes', ['ngRoute', 'ngMaterial', 'ngMdIcons'])

app.config(($routeProvider, $locationProvider) => {
  $routeProvider
    .when('/', {
      title:        'New Note',
      controller:   'ListsController',
      templateUrl:  'pages/home.html'
    })
    .when('/log', {
      title:        'Notes by Date',
      controller:   'ListsController',
      templateUrl:  'pages/log.html'
    })
    .when('/new/:patientId', {
      title:        'Creating Note',
      controller:   'NoteCreationController',
      templateUrl:  'pages/noteNew.html'
    })
    .when('/note/:id', {
      title:        'Note',
      controller:   'NoteViewController',
      templateUrl:  'pages/noteView.html'
    })

  // would really prefer this, but it's not working right now.
  //$locationProvider.html5Mode(true)
})

// sets $scope.title to title specified in the route definitions.
// * title.nav is meant for use in the main nav;
// * title.page is for the HTML <title> attribute.
app.run(['$rootScope', ($rootScope) => {
  $rootScope.$on('$routeChangeSuccess', (e, current, previous) => {
    $rootScope.title = {
      nav: current.$$route.title,
      page: `SOAP Notes: ${current.$$route.title}`
    }
  })
}])
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
