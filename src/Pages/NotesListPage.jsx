import React, { useEffect, useState } from "react";
import ListItem from "../Component/ListItem";
import { Api } from "../Api";
import AddButton from "../Component/AddButton";

const NotesListPage = () => {
  let [notes, setNotes] = useState([]);
  useEffect(() => {
    getNotes();
  }, []);
  let getNotes = async () => {
    let res = await fetch(`${Api}/api/notes/`);
    let data = await res.json();

    setNotes(data);
  };
  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesListPage;
