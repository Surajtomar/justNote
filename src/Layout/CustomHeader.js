import React, { useContext, useState } from "react";
import sty from "./CustomHeader.module.css";
import { MdSearch, MdArrowDropDown } from "react-icons/md";
import { userContext } from "../context/store";
import { fireSignOut, fireUpdateUserProfile } from "../firebase/auth";
import OutsideClickHandler from "react-outside-click-handler";
import { fireUploadProfilePic } from "../firebase/storage";
import { fireGetNotes, fireGetNoteSearch } from "../firebase/notes";

const CustomHeader = () => {
  const { state, dispatch } = useContext(userContext);
  const [isShowOption, setIsShowOption] = useState(false);
  const [isShowEditProfileForm, setIsShowEditProfileForm] = useState(false);
  const [editNameVal, setEditNameVal] = useState(state.user.name);
  const [editProfilePicVal, setEditProfilePicVal] = useState("");
  const [uploadStatus, setUploadStatus] = useState({ status: "notBegined" });
  const [search, setSearch] = useState("");

  const profileUpdated = () => {
    setEditProfilePicVal("");
    setIsShowEditProfileForm(false);
    setIsShowOption(false);
    setUploadStatus("notBegined");
  };

  const handleOutSideClick = () => {
    setIsShowOption(false);
    setIsShowEditProfileForm(false);
  };

  const uploadStatusFun = (val) => {
    setUploadStatus(val);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (search === "")
        fireGetNotes({ uid: state.uid, dispatch, sortBy: "name" });
      else fireGetNoteSearch({ uid: state.uid, dispatch, search });
      setSearch("");
    }
  };

  const handleFormSubbmit = (event) => {
    event.preventDefault();
    fireUploadProfilePic({
      uid: state.uid,
      picture: editProfilePicVal,
      uploadStatus: uploadStatusFun,
    });

    if (uploadStatus.status === "completed") {
      fireUpdateUserProfile({
        name: editNameVal,
        profilePic: uploadStatus.url,
        dispatch,
        profileUpdated: profileUpdated,
      });
    }
  };

  return (
    <div className={sty.container + " shadow-lg"}>
      <div className={sty.logo}>
        <h3>JustNote</h3>
      </div>
      <div className={sty.center}>
        <div className={sty.center__inputContainer}>
          <MdSearch size={24} />
          <input
            placeholder="Search"
            value={search}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className={sty.profile}>
        <img src={state.user.profilePic} alt="Profile pic" />
        <p>{state.user.name}</p>
        <MdArrowDropDown
          size={36}
          onClick={() => setIsShowOption(!isShowOption)}
        />
      </div>

      {isShowOption ? (
        <OutsideClickHandler onOutsideClick={handleOutSideClick}>
          <div className={sty.profileDropdown + " border-primary-md"}>
            {isShowEditProfileForm ? (
              <form
                className={sty.editProfileform}
                onSubmit={handleFormSubbmit}
              >
                {uploadStatus.status === "started" ? (
                  <p>Image Uploading</p>
                ) : uploadStatus.status === "error" ? (
                  <p>{uploadStatus.error}</p>
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditProfilePicVal(e.target.files[0])}
                  />
                )}

                <label htmlFor="name">Name</label>
                <input
                  placeholder="Enter name"
                  name="name"
                  type="text"
                  value={editNameVal}
                  onChange={(e) => setEditNameVal(e.target.value)}
                />

                <button type="submit" className={sty.submitButton}>
                  Update Profile
                </button>
                <button
                  type="submit"
                  className={sty.cancleButton}
                  onClick={() => setIsShowOption(false)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <button
                  type="button"
                  className={sty.editProfileButton}
                  onClick={() => setIsShowEditProfileForm(true)}
                >
                  Edit Profile
                </button>
                <button
                  type="button"
                  className={sty.logOutButton}
                  onClick={() => fireSignOut()}
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </OutsideClickHandler>
      ) : null}
    </div>
  );
};

export default CustomHeader;
