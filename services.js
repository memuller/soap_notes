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
    if(!params.id){
      this.id = (new Date()).valueOf()
      this.createdAt = new Date()
    }
    for(let property in params){
      this[property] = params[property]
    }
  }

  // fetches list of all objects, straight from LocalStorage
  static fetch(){
    return JSON.parse(localStorage.getItem(this.keyName())) || []
  }

  // stores the list given to LocalStorage
  static store(objects){
    localStorage.setItem(this.keyName(), JSON.stringify(objects))
  }

  // fetches list of all objects, then return them as new Object()
  static list(){
    return this.fetch().map( (item) => new this(item) )
  }

  // stores an object:
  // * if there's no item with this ID yet, appends to the end of the current
  //   objects list then saves it.
  // * if theres an item w/ this ID, overwrites it in the list, then saves it.
  // returns the saved object.
  save (){
    const id = this.id
    const objects = this.constructor.fetch()

    const index = objects.findIndex( (item) => item.id == id )

    if(index != -1){
      objects[index] = this
    } else {
      objects.push(this)
    }

    this.constructor.store(objects)

    return this.constructor.get(id)
  }

  // fetches a specific object, by id
  static get (id) {
    const objects = this.fetch()
    return new this(objects.find( (item) => item.id == id ))
  }

  // returns an StoredObject whose id is saved at the PARAMId property.
  // ORM-like behavior for relationships.
  object (klass){
    const fieldName = `${klass.name.toLowerCase()}Id`
    return klass.get(this[fieldName])
  }
}

/* # Notes service
 */
app.factory('Note', ['Patient', function(Patient){

  class Note extends StoredObject {

    // returs this note's Patient
    patient(){
      return this.object(Patient)
    }

    // overrides list() so that all Note objects listed
    // already have their Patients pre-fetched.
    static list(){
      return super.list().map((item) => {
        item.patient = item.patient()
        return item
      })
    }
  }

  return Note
}])

/* # Patients service
 */
app.factory('Patient', ['$injector', function($injector){

  class Patient extends StoredObject {

    // returns this patient's notes
    // uses depency injector, which isn't great.
    notes(){
      const notes = $injector.get('Note').fetch()
      const id = this.id
      return notes.filter((item) => item.patientId == id)
    }

    // property: number of Notes this patient has
    // uses this.notes()
    get numNotes(){
      return this.notes().length
    }



  }

  return Patient
}])
