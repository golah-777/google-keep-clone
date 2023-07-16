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
    this.selectedNoteId = "";

    this.$activateForm = document.querySelector(".active-form");
    this.$notetitlepin = document.querySelector(".notetitle-pin");
    this.$footer = document.querySelector(".footer");
    this.$btndiv = document.querySelector(".btn-div ");
    this.$formiconssec = document.querySelector(".form-icons-sec");
    this.$clearBtn =  document.querySelector(".btn-div");
    this.$noteTitle= document.querySelector(".title-placeholder");
    this.$noteText = document.querySelector(".active-form");
    // this.noteText = document.querySelector(".note-content");
    this.$notes = document.querySelector(".notes");
    this.$formActive = document.querySelector("#form-active");
    this.$modal = document.querySelector(".modal");
    this.$modalForm = document.querySelector(".modal-form");
    this.$modalTitle = document.querySelector(".modal-title");
    this.$modalNote = document.querySelector(".modal-note");
    this.$modalBtnClose = document.querySelector(".clear-btn");
   
    this.addEventListeners();
  }

  addEventListeners(){
    document.body.addEventListener("click", (event)=>{
      this.handleFormClick(event);
      this.openModal(event);
      this.handleArchive(event);
    })

    this.$formActive.addEventListener("submit", (event) =>{
      event.preventDefault();
    })

    this.$modalForm.addEventListener("submit",(event)=>{
      event.preventDefault();
    })
  }

  handleFormClick(event){
   const activateFormClicked = this.$activateForm.contains(event.target);
   const clearbtnFormClicked =  this.$clearBtn.contains(event.target);
   const noteTitlePin = this.$notetitlepin.contains(event.target) ;
   const footerform = this.$footer.contains(event.target);
   const title = this.$noteTitle.value;
   const text = this.$noteText.value;
  //  console.log(cuid())
    
   if(activateFormClicked){
    this.openForm();
   } else if((!activateFormClicked && !noteTitlePin && !footerform) ||  clearbtnFormClicked){
    this.closeForm();
    this.addNote({title, text});
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
    this.$noteText.value = "";
    this.$noteTitle.value = "";
  }


  addNote({title,text}) {
   if(text != "" || title !=""){
    const newNote = new Note(cuid(),title, text);
    this.notes = [...this.notes, newNote ];
    this.displayNotes();
   }
  }

  editNote(id, {title, text}){
    this.notes = this.notes.map(note => {
      if(note.id === id){
        note.title = title;
        note.text = text;
      }

      return note;
    });

    this.displayNotes();
  }
  
  deleteNote(id){
   this.notes = this.notes.filter(note =>note.id !=id);
   this.displayNotes();
  }

 
 
  handleMouseOver(element){
    // this.$notes  = document.querySelector("#"+element.id);
    this.$notes.querySelector("#"+element.id);
    const checkNoteDiv = this.$notes.querySelector('.check-note');
    const footerNoteDiv = this.$notes.querySelector('.footer-note');
    
   checkNoteDiv.style.visibility = 'visible';
   footerNoteDiv.style.visibility = 'visible';
  }

  handleMouseOut(element){
    // this.$notes = document.querySelector("#"+element.id);
    this.$notes.querySelector("#"+element.id);
    const $checkNoteDiv = this.$notes.querySelector('.check-note');
    const $footerNoteDiv = this.$notes.querySelector('.footer-note');
    
   $checkNoteDiv.style.visibility = 'hidden';
   $footerNoteDiv.style.visibility = 'hidden';
  }

  openModal(event){
    const modalFormClicked = this.$modalForm.contains(event.target);
    const $selectedNote = event.target.closest(".note");
    const $modalTitleValue = this.$notes.querySelector("#title");
    const $modalTextValue = this.$notes.querySelector("#text");
    // const $modalTitleValue = $selectedNote.querySelector(".title-note span"); 
    // const $modalTextValue = $selectedNote.querySelector(".text-note span");
    const note = this.$notes.querySelector('.note');
    const clearbtnFormClicked =  this.$clearBtn.contains(event.target);
 
    if($selectedNote && !event.target.closest(".archive")){
      this.selectedNoteId = $selectedNote.id;
      this.$modal.style.display = 'inline';
      //problem!!!!
      this.$modalTitle.value =  $modalTitleValue.textContent;
      this.$modalNote.value = $modalTextValue.textContent;
    } else if (!modalFormClicked){
      this.$modal.style.display = 'none';
      this.editNote(this.selectedNoteId, {title: this.$modalTitle.value, text:this.$modalNote.value});
    }
  }

  handleArchive(event){
    const $selectedNote = event.target.closest(".note");

    if($selectedNote && event.target.closest(".archive")){
      this.selectedNoteId =$selectedNote.id;
      this.deleteNote(this.selectedNoteId);
    } 
  }

  displayNotes(){
    this.$notes.innerHTML = this.notes.map(note =>`
    <div class="note" id="${note.id}" onmouseover="app.handleMouseOver(this)" onmouseout="app.handleMouseOut(this)">
        <div class="check-note">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        </div>
        <div class="title-note">
          <span id="title">${note.title}</span>
          <div class="icons">
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><path d="M14,4v5c0,1.12,0.37,2.16,1,3H9c0.65-0.86,1-1.9,1-3V4H14 M17,2H7C6.45,2,6,2.45,6,3c0,0.55,0.45,1,1,1c0,0,0,0,0,0l1,0v5 c0,1.66-1.34,3-3,3v2h5.97v7l1,1l1-1v-7H19v-2c0,0,0,0,0,0c-1.66,0-3-1.34-3-3V4l1,0c0,0,0,0,0,0c0.55,0,1-0.45,1-1 C18,2.45,17.55,2,17,2L17,2z"/></g></svg>
            <div class="tooltip">Pin note</div>
          </div>
        </div>
        <div class="text-note">
          <span id="text">${note.text}</span>
        </div>
        <div class="footer-note">
          <div class="icons">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99h-3.98zM12 6c2.76 0 5 2.24 5 5v7H7v-7c0-2.76 2.24-5 5-5zm0-4.5c-.83 0-1.5.67-1.5 1.5v1.17C7.36 4.85 5 7.65 5 11v6l-2 2v1h18v-1l-2-2v-6c0-3.35-2.36-6.15-5.5-6.83V3c0-.83-.67-1.5-1.5-1.5zM13 8h-2v3H8v2h3v3h2v-3h3v-2h-3z"/></svg> 
            <div class="tooltip">Remind Me</div>
          </div>
          <div class="icons">
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><path d="M13,8c0-2.21-1.79-4-4-4S5,5.79,5,8s1.79,4,4,4S13,10.21,13,8z M11,8c0,1.1-0.9,2-2,2S7,9.1,7,8s0.9-2,2-2S11,6.9,11,8z M1,18v2h16v-2c0-2.66-5.33-4-8-4S1,15.34,1,18z M3,18c0.2-0.71,3.3-2,6-2c2.69,0,5.78,1.28,6,2H3z M20,15v-3h3v-2h-3V7h-2v3h-3v2 h3v3H20z"/></g></svg>
            <div class="tooltip">Collaborator</div>
          </div>
          <div class="icons">
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><g><g><g><path d="M12,22C6.49,22,2,17.51,2,12S6.49,2,12,2s10,4.04,10,9c0,3.31-2.69,6-6,6h-1.77c-0.28,0-0.5,0.22-0.5,0.5 c0,0.12,0.05,0.23,0.13,0.33c0.41,0.47,0.64,1.06,0.64,1.67C14.5,20.88,13.38,22,12,22z M12,4c-4.41,0-8,3.59-8,8s3.59,8,8,8 c0.28,0,0.5-0.22,0.5-0.5c0-0.16-0.08-0.28-0.14-0.35c-0.41-0.46-0.63-1.05-0.63-1.65c0-1.38,1.12-2.5,2.5-2.5H16 c2.21,0,4-1.79,4-4C20,7.14,16.41,4,12,4z"/><circle cx="6.5" cy="11.5" r="1.5"/><circle cx="9.5" cy="7.5" r="1.5"/><circle cx="14.5" cy="7.5" r="1.5"/><circle cx="17.5" cy="11.5" r="1.5"/></g></g></g></g></svg>
            <div class="tooltip">Background options</div>
          </div>
          <div class="icons">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/></svg>
            <div class="tooltip">Add image</div>
          </div>
          <div class="icons archive">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.81.97H5.44l.8-.97zM5 19V8h14v11H5zm8.45-9h-2.9v3H8l4 4 4-4h-2.55z"/></svg>
            <div class="tooltip">Archive</div>
          </div>
          <div class="icons">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
            <div class="tooltip">More</div>
          </div>
        </div>
    </div>
    `).join(' ')

  }
   
 

  
}

const app = new App();
