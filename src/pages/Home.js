import React, { useState } from "react";
import Notes from "../Components/Notes/Notes";
import Editor from "../Components/Editor";
import sty from "./Home.module.css";
import { MdOutlineCloseFullscreen, MdOpenInFull } from "react-icons/md";
const Home = () => {
  const [notesWidth, setNotesWidth] = useState(1);

  const handleNotesClose = () => {
    if (notesWidth > 1) setNotesWidth(notesWidth - 1);
  };
  const handleNotesExpand = () => {
    if (notesWidth < 3) setNotesWidth(notesWidth + 1);
  };

  console.log("notesWidth", notesWidth);
  return (
    <div className={sty.container}>
      <div
        className={`${sty.notes} ${
          notesWidth === 1
            ? sty.width1
            : notesWidth === 2
            ? sty.width2
            : sty.width3
        }`}
      >
        <div className={sty.topBar}>
          <MdOutlineCloseFullscreen
            size={20}
            className={sty.icon}
            onClick={handleNotesClose}
          />
          <MdOpenInFull
            size={20}
            className={sty.icon}
            onClick={handleNotesExpand}
          />
        </div>
        <Notes />
      </div>
      <div
        className={`${sty.editor} ${
          notesWidth === 1
            ? sty.width3
            : notesWidth === 2
            ? sty.width2
            : sty.width1
        }`}
      >
        <div className={sty.topBar}>
          <MdOutlineCloseFullscreen
            size={20}
            className={sty.icon}
            onClick={handleNotesExpand}
          />
          <MdOpenInFull
            size={20}
            className={sty.icon}
            onClick={handleNotesClose}
          />
        </div>
        <Editor />
      </div>
    </div>
  );
};

export default Home;
