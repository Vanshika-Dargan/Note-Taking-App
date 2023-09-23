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
  const [searchNotes,setSearchNotes]=useState(notes)
  const [clicked,setClicked]=useState(false)
  const isMarking=()=>{
    setNotes([...notes])
  }
  const deleteForever=(new_notes)=>{
    setNotes([...new_notes]);
  }
const getSearchNotes=()=>{
  setSearchNotes([...searchNotes]);
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
    const cloneNotes = [...notes];
    cloneNotes.push(noteObject);
    setNotes(cloneNotes);
  }
  const deleteSingleNote=(tobedeleted)=>{
    const new_notes=notes.filter(note=>note.id!==tobedeleted.id)
     setNotes(new_notes);
    console.log(new_notes);
    deleteForever(new_notes);
  }
  const updateNote=({id,formData})=>{
    console.log(formData);
  const updated_notes=notes.filter(note=>note.id!==id);
  updated_notes.push(formData);
  console.log(updated_notes);
  setNotes(updated_notes);
  }
  const searchNote=(title)=>{
  console.log(title);
  setClicked(true)
  const search_notes=notes.filter(note=>note.title===title);
  console.log(search_notes);
  setSearchNotes(search_notes);
  }
  return (
   <Container>
      <Header username = {localStorage.getItem('username')}/>
      <Grid container spacing={2}>
  <Grid item xs={4}>
   <SideBar/>
  </Grid>
  <Grid item xs={8}>
  <NoteContext.Provider  value = {{clicked:clicked,setClicked:setClicked,notes:notes, searchNotes:searchNotes,addSingleNote:addNote,isMarking:isMarking,deleteForever:deleteForever,updateNote:updateNote,searchNote:searchNote,getSearchNotes:getSearchNotes}}>
   <Main/>
   </NoteContext.Provider>
  </Grid>
  </Grid>
   </Container>
  )
}
