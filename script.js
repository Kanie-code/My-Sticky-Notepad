document.addEventListener("DOMContentLoaded", () => {
  let noteText = JSON.parse(localStorage.getItem("savedNotes")) || [];

  const addNoteBtn = document.getElementById("addNoteBtn");
  const notesContainer = document.getElementById("notesContainer");

  //Load saved notes
  loadNotes();

  //Add note on button click
  addNoteBtn.addEventListener("click", () => {
    createNote();
    saveNotes();
  });

  //Create a new note
  function createNote(content = "") {
    const noteWrapper = document.createElement("div");
    noteWrapper.classList.add("note");

    const textarea = document.createElement("textarea");
    textarea.value = content;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "X";

    //Auto-save on input
    textarea.addEventListener("input", saveNotes);

    //Only show the delete button when the textarea is focused
    textarea.addEventListener('focus' , () => {
        deleteBtn.classList.add('focus');
    });

    textarea.addEventListener('blur' , () => { setTimeout(() => {
        deleteBtn.classList.remove('focus');} , 400);
    });

    //Delete note
    deleteBtn.addEventListener("click", () => {
      noteWrapper.remove();
      saveNotes();
    });

    noteWrapper.appendChild(deleteBtn);
    noteWrapper.appendChild(textarea);
    notesContainer.appendChild(noteWrapper);
  }

  //Save all notes to localStorage
  function saveNotes() {
    const allNotes = document.querySelectorAll(".note textarea");
    const notes = [...allNotes].map(note => note.value);
    localStorage.setItem("savedNotes", JSON.stringify(notes));
  }

  //Load all notes from localStorage
  function loadNotes() {
    noteText.forEach(note => {
      createNote(note);
    });
  }
});