import React from 'react';
export const NoteContext = React.createContext(
    {
        notes:[], 
        total :0, 
        getNotes:function(){},
        addSingleNote:function(note){},
        isMarking:function(){},
        deleteForever:function(note){},
        deleteNote:function(note){},
    });