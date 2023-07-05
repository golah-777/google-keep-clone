class Note {
  constructor(id, title, text){
    this.title=title;
    this.text=text;
    this.id=id;
  }
}

class App{
  constructor(){
    this.notes = [];
    this.$activateForm = document.querySelector(".active-form");
    this.$notetitlepin = document.querySelector(".notetitle-pin");
    this.$footer = document.querySelector(".footer");
    this.$btndiv = document.querySelector(".btn-div ");
    this.$formiconssec = document.querySelector(".form-icons-sec");
    this.$clearBtn =  document.querySelector(".clear-btn");
    this.$noteTitle = document.querySelector(".note-title");
    this.noteText = document.querySelector(".note-content");

    this.addEventListeners();
  }

  addEventListeners(){
    document.body.addEventListener("click", (event)=>{
      this.handleFormClick(event);
    })
  }

  handleFormClick(event){
   const activateFormClicked = this.$activateForm.contains(event.target);
   const clearbtnFormClicked =  this.$clearBtn.contains(event.target);
   const noteTitlePin = this.$notetitlepin.contains(event.target) ;
   const footerform = this.$footer.contains(event.target);
   const title =  this.$noteTitle.value;
   const text = this.noteText.value;
   console.log(cuid())
    
   if(activateFormClicked){
    this.openForm();

   } else if((!activateFormClicked && !noteTitlePin && !footerform) || clearbtnFormClicked){
    this.closeForm();
    this.addNote({title, text})
   }
  }

  openForm(){
    this.$notetitlepin.style.display = 'inline';
    this.$footer.style.display = 'inline';
    this.$footer.style.display = 'flex';
    this.$btndiv.style.display = 'inline-block';
    this.$formiconssec.style.display = 'none'
  }

  closeForm(){
    this.$notetitlepin.style.display = 'none';
    this.$footer.style.display = 'none';
    this.$formiconssec.style.display = 'inline';
    this.$formiconssec.style.display = 'flex';
  }


  addNote({title,text}) {
    const newNote = new Note(cuid(), title, text);
    this.notes = [...this.notes, newNote ];
    this.displayNotes();
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

const app = new App();
