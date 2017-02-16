const app = angular.module('Phonebook', [])


app.controller('PhonebookController', ($scope) => {
  $scope.app = 'Lista Telefônica'
  $scope.contacts = [
    {name: 'Matheus', phone: 988535854, },
    {name: 'Alline', phone: 72198321},
    {name: 'Lucas', phone: 732891723}
  ]
  $scope.phoneOperators = [
      {name: 'Oi', code: 14, category: 'Mobile'},
      {name: 'Claro', code: 21, category: 'Mobile'},
      {name: 'Tim', code: 15, category: 'Landline'}
  ]
  $scope.addContact = (contact) => {
    console.log(contact)
    $scope.contacts.push(contact)
    delete $scope.contact
  }
  $scope.someSelected = (contacts) => {
    return contacts.some((contact) => {
      if(contact.selected)
        return true
    })
  }
  $scope.removeContact = (contacts) => {
    $scope.contacts = contacts.filter((contact) =>{
      if(!contact.selected)
        return contact
    })
  }
})
