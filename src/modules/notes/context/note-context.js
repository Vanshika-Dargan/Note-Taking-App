import React from 'react';
export const NoteContext = React.createContext(
    {
        notes:[], 
        searchNotes:[],
        clicked:false,
        total :0, 
        getNotes:function(){},
        getSearchNotes:function(){},
        addSingleNote:function(note){},
        isMarking:function(){},
        deleteForever:function(note){},
        updateNote:function(note){},
        addSearchNote:function(note){},
        searchNote:function(title){},
    });