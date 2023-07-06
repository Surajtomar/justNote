import React, { useState } from "react";
import { AiFillFileText, AiOutlineMore } from "react-icons/ai";
import {
  MdDriveFileRenameOutline,
  MdDeleteForever,
  MdClose,
} from "react-icons/md";
import sty from "./NoteCard.module.css";
const NoteCard = () => {
  const [isOptionClick, setIsOptionClick] = useState(false);
  const [isRenameClick, setIsRenameClick] = useState(false);
  const [isEdittagClick, setIsEdittagClick] = useState(false);

  const handleRenameKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsRenameClick(false);
      setIsOptionClick(false);
    }
  };
  const handleTagEditKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsOptionClick(false);
      setIsEdittagClick(false);
    }
  };

  return (
    <div className={sty.container + " border-primary "}>
      <AiFillFileText size={36} className={sty.fileIcon} />
      <p className={sty.titleText}>Computer Applications Notes </p>
      <AiOutlineMore
        size={36}
        onClick={() => setIsOptionClick(!isOptionClick)}
      />
      {isOptionClick ? (
        <div className={sty.optionMenu + " border-primary shadow-md"}>
          <span className={sty.closeButton}>
            <MdClose size={24} onClick={() => setIsOptionClick(false)} />
          </span>
          {isRenameClick ? (
            <div className={sty.inputContainer}>
              <input onKeyDown={handleRenameKeyDown} maxlength="30" />
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
              <input onKeyDown={handleTagEditKeyDown} maxlength="16" />
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

          <span className={sty.customButtonConatiner}>
            <MdDeleteForever className={sty.deleteButton} size={16} />
            <p className={sty.customButtonText + " " + sty.deleteButton}>
              Delete
            </p>
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NoteCard;
