import { TextField } from "@mui/material";
import { useState } from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { NoteContext } from "../context/note-context";
import { useContext } from "react";
export const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const noteContext=useContext(NoteContext);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    console.log(searchValue);
    noteContext.searchNote(searchValue)
  };

  return (
    <>
      <TextField value={searchValue} onChange={handleSearchChange} />
      <IconButton onClick={() => handleSearchClick()}>
        <SearchIcon />
      </IconButton>
    </>
  );
};
