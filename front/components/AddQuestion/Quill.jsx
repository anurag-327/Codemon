import dynamic from "next/dynamic";
import { useRef } from "react";
import { useEffect, useState } from "react";

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  }
);

// const modules = {
//   toolbar: [
//     [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
//     [{ size: [] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [
//       { list: "ordered" },
//       { list: "bullet" },
//       { indent: "-1" },
//       { indent: "+1" },
//     ],
//     ["link", "image", "video"],
//     ["clean"],
//   ],
//   clipboard: {
//     // toggle to add extra line breaks when pasting HTML:
//     matchVisual: false,
//   },
// };

export default function Quill(value: string, changeHandler) {
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
  return typeof window !== "undefined" ? (
    <QuillNoSSRWrapper
      className="h-[80%]"
      value={value}
      onChange={changeHandler}
      modules={modules}
      formats={formats}
      placeholder="Type your description here..."
      theme="snow"
    />
  ) : null;
}
