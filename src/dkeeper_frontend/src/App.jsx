import { useEffect, useState } from 'react';
import { dkeeper_backend } from 'declarations/dkeeper_backend';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateArea from './components/CreateArea';
import Note from './components/Note';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(()=> {
    console.log("Data loading...");
    fetchData();
  },[]);

  async function fetchData() {
    const notesArray = await dkeeper_backend.readNotes();
    setNotes(notesArray);
  }



  function addNote(newNote){
    setNotes(prevNotes => {
      dkeeper_backend.createNote(newNote.title, newNote.content);      
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      dkeeper_backend.removeNote(id);
      return prevNotes.filter((noteItem, index) => {
        return index != id;
      });
    });
  }

  return (
    <main>
     <Header />
      <CreateArea onAdd={addNote}/>
      {notes.map((noteItem, index) =>{
        return (
          <Note 
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote} />
        );
      })}
     <Footer />
    </main>
  );
}

export default App;
