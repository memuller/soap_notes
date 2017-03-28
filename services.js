/* # StoredObject Class
 * Handles storage of objects in the brower's LocalStorage.
 * Works with an ORM-like API.
 */
 class StoredObject {

   // keyname at which all objects will be stored under
   static keyName() { return this.name }

   // constructor:
   // * sets all properties on given parameter as properties of this object;
   // * sets object's id;
   // * sets object's timestamp.
   constructor (params){
     for(let property in params){
       this[property] = params[property]
     }

     this.id = (new Date()).valueOf()
     this.createdAt = new Date()
   }

   // returns the list of all objects
   static list(){
     return JSON.parse(localStorage.getItem(this.keyName())) || []
   }

   // pushes a given object to storage
   static push (object) {
     const objects = this.list()
     objects.push(object)
     localStorage.setItem(this.keyName(), JSON.stringify(objects))
     return object
   }

   // creates and stores an object
   static save (object) {
     return this.push( new this(object) )
   }

   // fetches a specific object, by id
   static get (id) {
     const objects = this.list()
     return objects.find( (item) => item.id == id )
   }
 }

/* # Notes service
 */
app.factory('Note', function(){

  class Note extends StoredObject {

  }

  return Note
})

/* # Patients service
 */
app.factory('Patient', function(){

  class Patient extends StoredObject {

  }

  return Patient
})
