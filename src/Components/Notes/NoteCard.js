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

const NoteCard = ({ value }) => {
  const { name, tag, id } = value;
  const { dispatch } = useContext(userContext);
  const [isOptionClick, setIsOptionClick] = useState(false);
  const [isRenameClick, setIsRenameClick] = useState(false);
  const [isEdittagClick, setIsEdittagClick] = useState(false);
  const [newName, setNewName] = useState(value.name);
  const [newTag, setNewTag] = useState(value.tag);

  const handleRenameKeyDown = (e) => {
    if (e.key === "Enter") {
      fireUpdateNoteName({ newName, id, dispatch });
      setIsRenameClick(false);
      setIsOptionClick(false);
    }
  };
  const handleTagEditKeyDown = (e) => {
    if (e.key === "Enter") {
      fireUpdateNoteTag({ newTag, id, dispatch });
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

  return (
    <div className={sty.container + " border-primary "}>
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
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
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
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
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
