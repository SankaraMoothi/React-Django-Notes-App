import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Api } from "../Api";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let [note, setNote] = useState(null);
  useEffect(() => {
    getNote();
  }, [id]);
  let getNote = async () => {
    if (id === "new") return;
    let res = await fetch(`${Api}/api/notes/${id}`);
    let data = await res.json();

    setNote(data);
  };
  let createNote = async () => {
    fetch(`${Api}/api/notes/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let updateNote = async () => {
    fetch(`${Api}/api/notes/${id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let deleteNote = async () => {
    fetch(`${Api}/api/notes/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  };
  let handleSubmit = () => {
    if (id !== "new" && note.body === "") {
      deleteNote();
    } else if (id !== "new") {
      updateNote();
    } else if (id === "new" && note.body !== null) {
      createNote();
    }
    navigate("/");
  };
  let Back = () => {
    navigate("/");
  };
  let handleChange = (value) => {
    setNote((note) => ({ ...note, body: value }));
  };
  return (
    <div className="note">
      <div className="note-header">
        <h3>
          {id !== "new" ? (
            <ArrowLeft onClick={handleSubmit} />
          ) : (
            <ArrowLeft onClick={Back} />
          )}
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>

      <textarea
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
