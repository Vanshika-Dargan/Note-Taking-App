import React, {useContext, useEffect} from 'react'
import Container from '@mui/material/Container';
import {Grid} from '@mui/material';
import { Header } from '../../../shared/components/Header';
import SideBar from '../components/SideBar';
import Main from '../components/Main';
import { useLocation } from 'react-router-dom';
import { NoteContext } from '../context/note-context';
import { useState } from 'react';
import { getNotes } from '../../../shared/services/api-client';
export const NoteDashBoard = () => {
  const location = useLocation();
  const [notes, setNotes] = useState([]);
  const isMarking=()=>{
    setNotes([...notes])
  }
  const deleteForever=(new_notes)=>{
    setNotes([...new_notes]);
  }

  const getDataFromAPI = async ()=>{
    const notes = await getNotes();
    setNotes(notes);
    console.log('All Notes are ', notes);
}

// Mounting
  useEffect(()=>{
  console.log('Mount Phase....');
  getDataFromAPI();
},[]);


  console.log('Location is ', location);
  if(location && location.state){
    localStorage.setItem('username', location.state.username);
  }

  const addNote = (noteObject)=>{
    console.log('Rec Note From Add ', noteObject);
    const cloneNotes = [...notes];
    cloneNotes.push(noteObject);
    setNotes(cloneNotes);
  }
  const deleteNote=(val)=>{
    const new_notes=notes.filter(note=>note.title!==val.title)
    setNotes(new_notes);
    console.log(new_notes);
    deleteForever(new_notes);
  }
  return (
   <Container>
      <Header username = {localStorage.getItem('username')}/>
      <Grid container spacing={2}>
  <Grid item xs={4}>
   <SideBar/>
  </Grid>
  <Grid item xs={8}>
  <NoteContext.Provider  value = {{notes:notes, addSingleNote:addNote,isMarking:isMarking,deleteForever:deleteForever,deleteNote:deleteNote}}>
   <Main/>
   </NoteContext.Provider>
  </Grid>
  </Grid>
   </Container>
  )
}
