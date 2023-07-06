import React from "react";
import sty from "./CustomHeader.module.css";
import { MdSearch, MdArrowDropDown } from "react-icons/md";

import pp from "../assets/FocusContact.webp";

const CustomHeader = () => {
  return (
    <div className={sty.container + " shadow-lg"}>
      <div className={sty.logo}>
        <h3>JustNote</h3>
      </div>
      <div className={sty.center}>
        <div className={sty.center__inputContainer}>
          <MdSearch size={24} />
          <input placeholder="Search" />
        </div>
      </div>
      <div className={sty.profile}>
        <img src={pp} />
        <p>Ritul Daryan</p>
        <MdArrowDropDown size={36} />
      </div>
    </div>
  );
};

export default CustomHeader;
