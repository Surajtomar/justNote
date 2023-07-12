import {
  SIGNOUT_USER,
  SET_USER,
  UPDATE_USER_PROFILE,
  SET_NOTES,
  ADD_NEW_NOTE,
  UPDATE_NOTE_NAME,
  UPDATE_NOTE_TAG,
  DELETE_NOTE,
  UPDATE_NOTE_BODY,
  SET_ACTIVE_NOTE,
} from "./action.type";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      const payload = action.payload;
      return {
        ...state,
        user: {
          name: payload.displayName,
          email: payload.email,
          profilePic: payload.profilePic,
        },
        isEmailVerified: payload.emailVerified,
        isSignedIn: payload.isSignedIn,
        uid: payload.uid,
        isLoading: false,
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.name,
          profilePic: action.payload.profilePic,
        },
      };
    case SIGNOUT_USER:
      return {
        ...state,
        user: { name: "", email: "", profilePic: "" },
        isEmailVerified: false,
        isSignedIn: false,
        uid: null,
        isLoading: false,
      };
    case SET_NOTES:
      return {
        ...state,
        notes: action.payload,
        activeNote: { isEmpty: true, body: "Please Select A note." },
      };

    case ADD_NEW_NOTE: {
      const newNote = {};
      newNote[action.payload.id] = action.payload.value;
      return { ...state, notes: { ...newNote, ...state.notes } };
    }
    case UPDATE_NOTE_NAME: {
      const notes = state.notes;
      notes[action.payload.id].name = action.payload.newName;
      return { ...state, notes: notes };
    }
    case UPDATE_NOTE_TAG: {
      const notes = state.notes;
      notes[action.payload.id].tag = action.payload.newTag;
      return { ...state, notes: notes };
    }
    case UPDATE_NOTE_BODY: {
      const notes = state.notes;
      const activeNote = state.activeNote;
      notes[action.payload.id].body = action.payload.newBody;
      return { ...state, notes: notes, activeNote: activeNote };
    }
    case DELETE_NOTE: {
      const notes = state.notes;
      let activeNote = state.activeNote;

      if (action.payload.id === activeNote.id)
        activeNote = { isEmpty: true, body: "Please Select A note." };
      delete notes[action.payload.id];
      return { ...state, notes, activeNote };
    }

    case SET_ACTIVE_NOTE: {
      return { ...state, activeNote: { ...action.payload, isEmpty: false } };
    }
    default:
      return state;
  }
};
export default reducer;
