import React, { useContext } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { NoteContext } from '../context/note-context';
import { Table, TableHead, TableContainer, 
  TableRow, TableCell, Paper, TableBody, IconButton } from '@mui/material';
import { useState } from 'react';
import { getNotes } from '../../../shared/services/api-client';
import DeleteIcon from '@mui/icons-material/Delete';
import { toHaveFormValues } from '@testing-library/jest-dom/matchers';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Edit } from '@mui/icons-material';

const View = () => {
  const navigate=useNavigate();
  const [marked,setMarked]=useState(0)
  const location=useLocation();
  let val=location.search.substring(6)
  const searchParams = useSearchParams();
  const noteContext=useContext(NoteContext);
  for(let [key, value] of searchParams[0].entries()){
    console.log('Val is ', value);
    //setType(value);
  }
  const markOrUnmark=(note)=>{
    console.log(note.isMarked);
    note.isMarked=!note.isMarked;
    console.log(note);
    noteContext.isMarking();
    setMarked(noteContext.notes.filter((val)=>val.isMarked).length)
  }
  const handleDeleteForever=()=>{
     noteContext.notes=noteContext.notes.filter((note)=>!note.isMarked)
     noteContext.deleteForever(noteContext.notes);
  }
  const editRecord=(note)=>{
    navigate('../add-note/Add',{state:{note:note,type:val}});
  }
  return (
    <div>
      <NoteContext.Consumer>
        {(value)=>{
            
            return (
              <>
            <h1>{val=='update'?'Update Notes':val==='view'?`Total Notes ${value.notes.length}`:`Marked Notes ${value.notes.filter((val)=>val.isMarked).length}`}</h1>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>Note Id</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Desc</TableCell>
                <TableCell>Date</TableCell>
                {val==='delete' &&
                <TableCell>Delete 
                  {marked>0 &&
                  <IconButton onClick={()=>handleDeleteForever()}>
                <DeleteForeverIcon/>
              </IconButton>}
              </TableCell>}
              {val==='update' &&
                <TableCell>Edit
              </TableCell>}
                </TableRow>
                </TableHead>
               <TableBody>
                  {value.notes.map((note, index)=><TableRow key={index} style={{backgroundColor:note.isMarked?'red':''}}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{note.title}</TableCell>
                    <TableCell>{note.desc}</TableCell>
                    <TableCell>{note.date}</TableCell>
                    {val==='delete' &&
                    <TableCell>
                      <IconButton onClick={()=>{
                        markOrUnmark(note);
                      }}>
                        <DeleteIcon/>
                      </IconButton>
                    </TableCell>}
                    {val==='update' &&
                    <TableCell>
                      <IconButton onClick={()=>{
                        editRecord(note);
                      }}>
                        <EditIcon/>
                      </IconButton>
                    </TableCell>}
                  </TableRow>)}
               </TableBody>
                </Table>
                </TableContainer> 
                
                </>
            );
        }}
      
      </NoteContext.Consumer>
    </div>
  )
}

export default View