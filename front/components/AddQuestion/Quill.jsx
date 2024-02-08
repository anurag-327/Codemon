import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Quill = (value, handleRichTextChange) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // Header options
      ["bold", "italic", "underline", "strike"], // Text styling options
      ["blockquote", "code-block"], // Block options
      [{ list: "ordered" }, { list: "bullet" }], // List options
      [{ indent: "-1" }, { indent: "+1" }], // Indent options
      ["link", "image"], // Link, image, and video options
      ["clean"], // Clean formatting
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  return (
    <ReactQuill
      className="h-[300px]"
      theme="snow"
      value={value}
      onChange={handleRichTextChange}
      modules={modules}
      formats={formats}
      placeholder="Type your description here..."
    />
  );
};

export default Quill;
