import React from 'react'
import { useFormAction, useLocation, useParams } from 'react-router-dom'
import {Button, TextField} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useRef , useState} from 'react';
import { useContext } from 'react';
import { NoteContext } from '../context/note-context';
import {useForm} from 'react-hook-form';
import dayjs from 'dayjs';
import { useApi } from '../../../shared/hooks/api-hook';

/*
  Add and Update Screen is Same
*/
const Add = () => {
  const location=useLocation()
  const note=location.state?.note
  const type=location.state?.type
  const [title,setTitle]=useState(note?.title);
  const [desc,setDesc]=useState(note?.desc);
  
 
  const [dateValue, setDateValue] = useState(dayjs('2022-04-17'));
  
  const {register, handleSubmit, formState:{errors}, reset} = useForm();
  //console.log('Register is ', {...register('password')})
  const [message , setMessage] = useState('');
  const apiCall = useApi('POST');
  const params = useParams();
  console.log('Params are ', params);
  const nameRef = useRef();
  const descRef = useRef();
  const dateRef = useRef();
  const errorStyle = {
    color:'red'
  }
  const noteContext = useContext(NoteContext);
  // const takeInput = ()=>{
  //       const noteObject = {
  //            title : nameRef.current.value,
  //            desc : descRef.current.value,
  //            date:dateRef.current.value
  //       } 
  //       noteContext.addSingleNote(noteObject); 
  //       console.log('Input is ', noteObject);
  //       setMessage('Note Added....');
  // }
  const giveError = ()=>{
    throw new Error('Error....');
  }
  const getFormData = async (formData)=>{
    if(type==='update'){
    noteContext.deleteNote(note);
    }
      noteContext.addSingleNote(formData); 
      const result = await apiCall(formData); 
        setMessage(result.message);
  }
  return (
    <form onSubmit={handleSubmit(getFormData)}>
      <h1> {type==='update'?'Update':'Add'} Note {message}</h1>
      <TextField value={title}  {...register('title',{required:true, min:3, max:10})}  id="outlined-basic" label="Title" variant="outlined" />
      {errors && errors.title && errors.title.type==='required' && <p style = {errorStyle}>Title Can't be Empty</p> }
      <br/>    <br/>    <br/>
      <TextField
      value={desc}
      {...register('desc', {
        validate:{
          
          checkLength:(value)=>value.length>7
        }
      })}
      
     
          id="outlined-multiline-static"
          label="Desc"
          multiline
          rows={4}
          
        />
        {errors && errors.desc && errors.desc.type==='checkLength' && <p style = {errorStyle}>Len is greater than 7 Error</p> }
        <br/> <br/> 
        {/* {giveError()} */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker value={dateValue}  {...register('date')}  onChange={(newValue) => {
            console.log('New Value is ', newValue);
            setDateValue(newValue);}}   label="Note Date" />
        </LocalizationProvider>

        <br/> <br/>
        <Button type='submit'  variant="contained">{type==='update'?'Update Note':'Add Note'}</Button> &nbsp;&nbsp;
        <Button  onClick={()=>{
          reset({title:'', desc:'', date:setDateValue(dayjs('2023-01-01'))})
        }} variant="contained">Reset Note</Button>


    </form>
  )
}

export default Add