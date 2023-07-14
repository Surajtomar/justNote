import React, { useContext, useRef } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import sty from "./AddNewNote.module.css";
import { fireCreateNewNote } from "../../firebase/notes";
import { userContext } from "../../context/store";
import { toast } from "react-toastify";

const AddNewNote = ({ closeAddNewNoteForm }) => {
  const name = useRef(null);
  const tag = useRef(null);
  const { state, dispatch } = useContext(userContext);

  const onAdded = (value) => {
    if (value.status === "created") {
      closeAddNewNoteForm();
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (name.current.value === "" || tag.current.value === "") {
      if (name.current.value === "" && tag.current.value !== "")
        infotoast("Please provide note name before proceeding");
      else if (name.current.value !== "" && tag.current.value === "")
        infotoast("Please provide note tag before proceeding");
      else infotoast("Please provide note name and tag before proceeding");
    } else
      fireCreateNewNote({
        name: name.current.value,
        tag: tag.current.value,
        uid: state.uid,
        onAdded,
        dispatch,
      });
  };

  return (
    <OutsideClickHandler onOutsideClick={closeAddNewNoteForm}>
      <form
        onSubmit={handleFormSubmit}
        className={sty.addNewNoteForm + " border-primary shadow-md"}
      >
        <label htmlFor="name">Name</label>
        <input placeholder="Enter Name" maxLength="30" ref={name} />
        <label htmlFor="tag"> Tag</label>
        <input placeholder="Enter Tag" maxLength="16" ref={tag} />
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

const infotoast = (message) =>
  toast.info(message, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
