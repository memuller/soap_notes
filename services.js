/* # Notes Service
 * lists, creates, and saves Notes.
 */
app.service('Notes', function(){

  // key which will be used for HTML5 localStorage .
  this.keyName = 'notes'

  // returns all notes as an array (or an empty array, if none)
  this.list = () => {
    return JSON.parse(localStorage.getItem(this.keyName)) || []
  }

  // returns a properly formatted note, ready for storage
  this.create = (params) => {
    const note = {
      subjective:   params.subjective,
      objective:    params.objective,
      assessment:   params.assessment,
      plan:         params.plan,
      patientName:  params.patientName,
      createdAt:    new Date()
    }

    return note
  }

  // pushes a given note to storage
  this.push = (note) => {
    const notes = this.list()
    notes.push(note)
    localStorage.setItem(this.keyName, JSON.stringify(notes))
  }

  // creates and stores a note
  this.save = (note) => {
    this.push(this.create(note))
  }

})
