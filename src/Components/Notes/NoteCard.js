import React, { useContext, useState } from "react";
import sty from "./NoteCard.module.css";
import { AiFillFileText, AiOutlineMore } from "react-icons/ai";
import {
  MdDriveFileRenameOutline,
  MdDeleteForever,
  MdClose,
} from "react-icons/md";
import OutsideClickHandler from "react-outside-click-handler";
import {
  fireDeleteNote,
  fireUpdateNoteName,
  fireUpdateNoteTag,
} from "../../firebase/notes";
import { userContext } from "../../context/store";
import { SET_ACTIVE_NOTE } from "../../context/action.type";
import { useRef } from "react";

const NoteCard = ({ value }) => {
  const { name, tag, id } = value;
  const { state, dispatch } = useContext(userContext);
  const [isOptionClick, setIsOptionClick] = useState(false);
  const [isRenameClick, setIsRenameClick] = useState(false);
  const [isEdittagClick, setIsEdittagClick] = useState(false);

  const newName = useRef(null);
  const newTag = useRef(null);

  const handleRenameKeyDown = (e) => {
    if (e.key === "Enter") {
      fireUpdateNoteName({ newName: newName.current.value, id, dispatch, tag });
      setIsRenameClick(false);
      setIsOptionClick(false);
    }
  };
  const handleTagEditKeyDown = (e) => {
    if (e.key === "Enter") {
      fireUpdateNoteTag({
        newTag: newTag.current.value,
        id,
        dispatch,
        newName: name,
      });
      setIsOptionClick(false);
      setIsEdittagClick(false);
    }
  };

  const handleDelete = () => {
    fireDeleteNote({ id, dispatch });
  };

  const handleOutSideClick = () => {
    setIsRenameClick(false);
    setIsEdittagClick(false);
    setIsOptionClick(false);
  };

  const handleNoteClick = () => {
    dispatch({ type: SET_ACTIVE_NOTE, payload: value });
  };

  return (
    <div
      className={`${sty.container} ${
        state.activeNote.id === value.id
          ? `${sty.selectedContainer} shadow-md`
          : null
      } border-primary`}
      onClick={handleNoteClick}
    >
      <AiFillFileText className={sty.fileIcon} />
      <div className={sty.textContainer}>
        <p className={sty.titleText}>{name} </p>
        <p>Tag: {tag}</p>
      </div>
      <AiOutlineMore
        size={36}
        onClick={() => setIsOptionClick(!isOptionClick)}
      />
      {isOptionClick ? (
        <OutsideClickHandler onOutsideClick={handleOutSideClick}>
          <div className={sty.optionMenu + " border-primary shadow-md"}>
            <span className={sty.closeButton}>
              <MdClose size={24} onClick={() => setIsOptionClick(false)} />
            </span>
            {isRenameClick ? (
              <div className={sty.inputContainer}>
                <input
                  onKeyDown={handleRenameKeyDown}
                  maxLength="30"
                  ref={newName}
                />
              </div>
            ) : (
              <span
                className={sty.customButtonConatiner}
                onClick={() => setIsRenameClick(true)}
              >
                <MdDriveFileRenameOutline size={16} />
                <p className={sty.customButtonText}> Rename</p>
              </span>
            )}
            {isEdittagClick ? (
              <div className={sty.inputContainer}>
                <input
                  onKeyDown={handleTagEditKeyDown}
                  maxLength="16"
                  ref={newTag}
                />
              </div>
            ) : (
              <span
                className={sty.customButtonConatiner}
                onClick={() => setIsEdittagClick(true)}
              >
                <MdDriveFileRenameOutline size={16} />
                <p className={sty.customButtonText}>Edit Tag</p>
              </span>
            )}

            <span className={sty.customButtonConatiner} onClick={handleDelete}>
              <MdDeleteForever className={sty.deleteButton} size={16} />
              <p className={sty.customButtonText + " " + sty.deleteButton}>
                Delete
              </p>
            </span>
          </div>
        </OutsideClickHandler>
      ) : null}
    </div>
  );
};

export default NoteCard;
