import React, { useState } from "react";
import sty from "./Notes.module.css";
import { MdSearch, MdArrowDropDown } from "react-icons/md";
import { CgAdd } from "react-icons/cg";
import NoteCard from "./NoteCard";
const Notes = () => {
  const [isNewClick, setIsNewClick] = useState(false);
  return (
    <div className={sty.container}>
      <div className={sty.toolbar + " shadow-md"}>
        <div className={sty.addNewNote} onClick={() => setIsNewClick(true)}>
          <CgAdd />
          <p>New</p>
        </div>
        <div className={sty.tagInput}>
          <MdSearch />
          <input placeholder="Search by Tag Name" />
        </div>

        <div className={sty.sortby}>
          <label for="sortBy">Sort By:</label>
          <select name="sortBy" id="sortBy" className="border-primary">
            <option value="name">Name</option>
            <option value="createdAt">Created At</option>
            <option value="modifiedAt">Modified At</option>
          </select>
        </div>
        {isNewClick ? (
          <div className={sty.addNewNoteForm + " border-primary shadow-lg"}>
            <label htmlFor="name">Name</label>
            <input placeholder="Enter Name" maxLength="30" />
            <label htmlFor="tag"> Tag</label>
            <input placeholder="Enter Tag" maxLength="16" />
            <button type="submit" className={sty.submitButton}>
              Add Note
            </button>
            <button
              type="submit"
              className={sty.cancleButton}
              onClick={() => setIsNewClick(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className={sty.notesContainer}>
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
      </div>
    </div>
  );
};

export default Notes;
