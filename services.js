/* # Notes Service
 * lists, creates, and saves Notes.
 */
app.factory('Note', function(){

  class Note {

    // key at which notes will be stored
    static keyName () { return 'notes' }

    // costructor.
    // * id is an unique timestamp used as identifier
    // * createdAt is a timestamp
    // * all other attributes are textual, fetched from the given parameters
    constructor (params) {
      this.id =           (new Date()).valueOf()
      this.subjective =   params.subjective
      this.objective =    params.objective
      this.assessment =   params.assessment
      this.plan =         params.plan
      this.patientName =  params.patientName
      this.createdAt =    new Date()
    }

    // returns all notes as an array (or an empty array, if none)
    static list () {
      return JSON.parse(localStorage.getItem(this.keyName())) || []
    }

    // pushes a given note to storage
    static push (note) {
      const notes = this.list()
      notes.push(note)
      localStorage.setItem(this.keyName(), JSON.stringify(notes))
      return note
    }

    // creates and stores a note
    static save (note) {
      return this.push( new Note(note) )
    }

    // fetches a specific note, by id
    static get (id) {
      const notes = this.list()
      return notes.find( (item) => item.id == id )
    }

  }
  return Note
})
