const app = angular.module('helloWorld', [])
app.controller('helloWorldCtrl', ($scope) => {
  $scope.message = "Hello World!"
})
