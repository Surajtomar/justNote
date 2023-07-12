import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import sty from "./Editor.module.css";
import { fireUpdateNoteBody } from "../firebase/notes";
import { userContext } from "../context/store";

const Editor = () => {
  const { state, dispatch } = useContext(userContext);
  const [value, setValue] = useState(state.activeNote.body);
  const handleBlur = () => {
    fireUpdateNoteBody({ id: state.activeNote.id, dispatch, newBody: value });
  };

  useEffect(() => {
    if (!state.activeNote.isEmpty) setValue(state.activeNote.body);
  }, [state.activeNote]);

  return (
    <div className={sty.container}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={{
          toolbar: toolbarOptions,
        }}
        readOnly={state.activeNote.isEmpty}
        scrollingContainer="#scrolling-container"
        onBlur={handleBlur}
      />
    </div>
  );
};

export default Editor;

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: [1, 2, 3, 4, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  // text direction

  [
    {
      color: [
        "#FF6263",
        "#E21717",
        "#EF5354",
        "#E6425E",
        "#B9345A",
        "#23C4ED",
        "#51E1ED",
        "#207398",
        "#5DA3FA",
        "#03203C",
        "#2827CC",
        "#50DBB4",
        "#4DD637",
        "#3DBE29",
        "#22CB5C",
        "#6EC72D",
        "#E5D68A",
        "#EDBF69",
        "#E8BD0D",
        "#DDD101",
        "#fff",
        "#CAD5E2",
        "#758283",
        "#242B2E",
        "#0D0D0D",
        "#FF6666",
        "#E07C24",
        "#E03B8B",
      ],
    },
    {
      background: [
        "#FF6263",
        "#E21717",
        "#EF5354",
        "#E6425E",
        "#B9345A",
        "#23C4ED",
        "#51E1ED",
        "#207398",
        "#5DA3FA",
        "#03203C",
        "#2827CC",
        "#50DBB4",
        "#4DD637",
        "#3DBE29",
        "#22CB5C",
        "#6EC72D",
        "#E5D68A",
        "#EDBF69",
        "#E8BD0D",
        "#DDD101",
        "#fff",
        "#CAD5E2",
        "#758283",
        "#242B2E",
        "#0D0D0D",
        "#FF6666",
        "#E07C24",
        "#E03B8B",
      ],
    },
  ], // dropdown with defaults from theme

  [{ align: [] }],
  ["link"],
  ["clean"], // remove formatting button
];
