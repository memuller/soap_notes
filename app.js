const app = angular.module('SOAPNotes', ['ngRoute', 'ngMaterial', 'ngMdIcons', 'ngMessages'])

app.config(($routeProvider, $locationProvider) => {
  $routeProvider
    .when('/', {
      title:        'Notes',
      controller:   'ListsController',
      templateUrl:  'pages/home.html'
    })
    .when('/patients', {
      title:        'Patients',
      controller:   'ListsController',
      templateUrl:  'pages/home.html'
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
    .when('/patient/:id', {
      title:        'Patient',
      controller:   'PatientViewController',
      templateUrl:  'pages/patientView.html'
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

app.controller('ListsController', function($scope, $route, $location, Note, Patient, $q) {
  if($route.current.$$route.originalPath == '/patients'){
    $scope.listView = 'pages/_patients.html'
  } else {
    $scope.listView = 'pages/_list.html'
  }
  const notes = Note.list()
  const patients = Patient.list()

  $scope.notes = notes
  $scope.patients = patients
  $scope.patientsSearch = (query) => {
    return $q((resolve,reject) => {
      query = query.toLowerCase()
      resolve(patients.filter((item) => item.name.toLowerCase().includes(query)))
    })
  }

  $scope.goToNote = (note) => $location.path(`/note/${note.id}`)
  $scope.newNote = (patient) => $location.path(`/new/${patient.id}`)
  $scope.createPatientAndGoToNewNote = (patientName) => {
    const patient = new Patient( { name: patientName } )
    patient.save()
    $location.path(`/new/${patient.id}`)
  }
  $scope.goToPatient = (patient) => $location.path(`/patient/${patient.id}`)
  $scope.focusSearch = () => console.log('not implemented')

})

app.controller('NoteCreationController', function($scope, $route, Note, Patient, $location) {
  const note = {
    patientId: parseInt($route.current.pathParams.patientId)
  }
  const patient = Patient.get(note.patientId)

  $scope.note = note
  $scope.patient = patient

  $scope.newNote = () => {
    const note = new Note($scope.note)
    note.save()
    $location.path(`/note/${note.id}`)
  }
})

app.controller('NoteViewController', function($scope, $route, Note) {
  const note = Note.get($route.current.pathParams.id)
  $scope.note = note
})

app.controller('PatientViewController', function($scope, $route, $location, Patient) {
  const patient = Patient.get($route.current.pathParams.id)
  $scope.patient = patient
  $scope.notes = patient.notes()

  $scope.hidePatientLink = true

  $scope.goToNote = (note) => $location.path(`/note/${note.id}`)
  $scope.newNote = (patient) => $location.path(`/new/${patient.id}`)
})
