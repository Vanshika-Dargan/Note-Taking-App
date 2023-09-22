import { getNotes, postNote, updateNote } from "../services/api-client";

// Api Hook for Making API Call
export const useApi = (method)=>{
    const apiCall = async (data = {})=>{
        if(method ==='GET'){
                return await getNotes();
        }
        else if(method ==='POST'){
             const note = await postNote(data);
             if(note && note.title ){
                return {message:'Note Added to the DB'};
             }
             else{
                return {message:'Some Problem in Note Adding'}
             }
        }
        else if(method==='UPDATE'){
           const note=await updateNote(data);
           if(note && note.title ){
            return {message:'Note Updated In DB'};
         }
         else{
            return {message:'Some Problem in Note Adding'}
         }
        }
    }
    return apiCall;
}