class Note {
  constructor(id, title, text){
    this.title=title;
    this.text=text;
    this.id=id;
  }
}

class App{
  constructor(){
    this.notes = []
  }


  addNote(id,{title,text}) {
    const newNote = new Note(id, title, text);
    this.notes = [...this.notes, newNote ]
  }

  editNote(id, {title, text}){
    this.notes = this.notes.map(note => {
      if(note.id === id){
        note.title = title;
        note.text = text;
      }

      return note;
    })
  }
  
  deleteNote(id){
   this.notes = this.notes.filter(note =>note.id !=id)
  }

  displayNotes(){
    this.notes.map(note => console.log(`
     ID: ${note.id}
     Title: ${note.title}
     Text: ${note.text}
    `))
  }
}

const note1 = {
  title:"Test note",
  text:"text",
}

const updatedNote = {
  title:"updated test note",
  text:"updated text"
}
const app = new App();
app.addNote(0,note1);
app.addNote(1,note1);
app.addNote(2,note1);
app.addNote(3,note1);
app.displayNotes();

setTimeout(()=>{
  app.editNote(2, updatedNote);
  app.displayNotes();
}, 2000)

setTimeout(()=>{
  app.deleteNote(2)
  app.displayNotes();
}, 3000)

app.displayNotes();