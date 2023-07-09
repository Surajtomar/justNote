import React, { useContext, useEffect, useState } from "react";
import sty from "./Notes.module.css";
import { MdSearch } from "react-icons/md";
import { CgAdd } from "react-icons/cg";
import NoteCard from "./NoteCard";
import AddNewNote from "./AddNewNote";
import { fireGetNotes, fireNotesBytag } from "../../firebase/notes";
import { userContext } from "../../context/store";
const Notes = () => {
  const { state, dispatch } = useContext(userContext);
  const [isNewClick, setIsNewClick] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [serachByTag, setSearchByTag] = useState("");
  const { uid, notes } = state;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (serachByTag === "") {
        fireGetNotes({ uid, dispatch, sortBy });
      } else {
        fireNotesBytag({ uid, dispatch, searchTag: serachByTag });
      }
      setSearchByTag("");
    }
  };
  const closeAddNewNoteForm = () => {
    setIsNewClick(false);
  };
  const openAddNewNoteForm = () => {
    setIsNewClick(true);
  };

  useEffect(() => {
    if (uid) fireGetNotes({ uid, dispatch, sortBy });
  }, [uid, sortBy]);

  return (
    <div className={sty.container}>
      <div className={sty.toolbar + " shadow-md"}>
        <div className={sty.addNewNote} onClick={openAddNewNoteForm}>
          <CgAdd />
          <p>New</p>
        </div>
        <div className={sty.tagInput}>
          <MdSearch />
          <input
            onKeyDown={handleKeyDown}
            placeholder="Search by Tag Name"
            value={serachByTag}
            onChange={(e) => setSearchByTag(e.target.value)}
          />
        </div>

        <div className={sty.sortby}>
          <label for="sortBy">Sort By:</label>
          <select
            name="sortBy"
            id="sortBy"
            className={sty.select + " border-primary"}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="createdAt">Created At</option>
            <option value="modifiedAt">Modified At</option>
          </select>
        </div>
        {isNewClick ? (
          <AddNewNote closeAddNewNoteForm={closeAddNewNoteForm} />
        ) : null}
      </div>

      <div className={sty.notesContainer}>
        <div className={sty.notesSubContainer}>
          {Object.values(notes).map((value) => (
            <NoteCard value={value} key={value.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
