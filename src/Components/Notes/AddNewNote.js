import React, { useContext, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import sty from "./AddNewNote.module.css";
import { fireCreateNewNote } from "../../firebase/notes";
import { userContext } from "../../context/store";
import { toast } from "react-toastify";

const AddNewNote = ({ closeAddNewNoteForm }) => {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const { state, dispatch } = useContext(userContext);

  const onAdded = (value) => {
    if (value.status === "created") {
      closeAddNewNoteForm();
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (name === "" || tag === "") {
      if (name === "" && tag !== "") {
        toast.info("Please provide note name before proceeding", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (name !== "" && tag === "") {
        toast.info("Please provide note tag before proceeding", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.info("Please provide note name and tag before proceeding", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else fireCreateNewNote({ name, tag, uid: state.uid, onAdded, dispatch });
  };

  return (
    <OutsideClickHandler onOutsideClick={closeAddNewNoteForm}>
      <form
        onSubmit={handleFormSubmit}
        className={sty.addNewNoteForm + " border-primary shadow-md"}
      >
        <label htmlFor="name">Name</label>
        <input
          placeholder="Enter Name"
          maxLength="30"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="tag"> Tag</label>
        <input
          placeholder="Enter Tag"
          maxLength="16"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button type="submit" className={sty.submitButton}>
          Add Note
        </button>
        <button
          type="submit"
          className={sty.cancleButton}
          onClick={closeAddNewNoteForm}
        >
          Cancel
        </button>
      </form>
    </OutsideClickHandler>
  );
};

export default AddNewNote;
