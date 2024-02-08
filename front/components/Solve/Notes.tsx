"use client";
import { API_URL } from "@/credentials";
import { getToken } from "@/helper/tokenhandler";
import { solverStore } from "@/zustand/useStore";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Notes = () => {
  const { note, setNote, question } = solverStore();
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handleRichTextChange = (value: string) => {
    setSaving(true);
    setNote(value);
  };
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

  useEffect(() => {
    const saveNote = async () => {
      setError("");
      const options = {
        method: "post",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ questionId: question._id, note: note }),
      };
      const response = await fetch(API_URL + "/api/notes/add-note", options);
      const data = await response.json();
      if (data.status == 201) {
        setSaving(false);
      } else {
        setError("Failed saving note");
      }
    };
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault(); // Prevent the default browser save action
        saveNote();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [note]);

  return (
    <div className="flex flex-col px-4 py-2">
      <div>
        <span className="">Notes</span>
      </div>
      <div className="mt-4 h-[300px]">
        <ReactQuill
          className="h-[90%]"
          theme="snow"
          value={note}
          onChange={handleRichTextChange}
          modules={modules}
          formats={formats}
          placeholder="Type your Notes here..."
        />
      </div>
      <div className="mt-4 text-end">
        <span className="text-xs font-light text-gray-500">
          {saving ? "Unsaved changes" : "saved changes"}
        </span>
      </div>
      {error && (
        <div className="mt-0 text-end">
          <span className="text-xs font-light text-gray-500">{error}</span>
        </div>
      )}
    </div>
  );
};

export default Notes;
