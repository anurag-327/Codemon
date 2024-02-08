"use client";
import React, { FormEvent, useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import { Editor as RichEditor } from "@tinymce/tinymce-react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from "@monaco-editor/react";
import { EditorOptions } from "@/helper/Editor";
import { getToken } from "@/helper/tokenhandler";
import { API_URL } from "@/credentials";
import { useRouter } from "next/navigation";
type sampleCase = {
  input: string;
  expectedOutput: string;
  description: string;
};

type questionData = {
  question: string;
  name: string;
  description: string;
  sampleCases: sampleCase[];
  points: number;
  difficultyLevel: number;
  defaultCode: string;
  userCode: string;
};
const QuestionForm = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [questionData, setQuestionData] = useState<questionData>({
    question: "",
    name: "",
    description: "",
    sampleCases: [
      { input: "", expectedOutput: "", description: "" },
      { input: "", expectedOutput: "", description: "" },
    ],
    points: 50,
    difficultyLevel: 2,
    defaultCode: "",
    userCode: "",
  });

  const handleRichTextChange = (content: string, editor: any) => {
    console.log(content);
    setQuestionData((prevData) => ({
      ...prevData,
      description: content,
    }));
    console.log(questionData);
  };
  const handleQuillRichTextChange = (value: string) => {
    // console.log(content);
    setQuestionData((prevData) => ({
      ...prevData,
      description: value,
    }));
    console.log(questionData);
  };
  const handleCK5TextChange = (event: any, editor: any) => {
    const data = editor.getData();
    setQuestionData((prevData) => ({
      ...prevData,
      description: data,
    }));
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "question" && /\s/.test(value)) {
      // If the "question" field contains spaces, prevent updating the state
      return;
    }

    setQuestionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddSampleCase = () => {
    setQuestionData((prevData) => ({
      ...prevData,
      sampleCases: [
        ...prevData.sampleCases,
        { input: "", expectedOutput: "", description: "" },
      ],
    }));
  };
  const handleSampleCaseChange = (
    index: number,
    field: keyof sampleCase,
    value: string
  ) => {
    setQuestionData((prevData) => {
      const updatedSampleCases = [...prevData.sampleCases];
      if (index >= 0 && index < updatedSampleCases.length) {
        updatedSampleCases[index][field] = value;
      }

      return {
        ...prevData,
        sampleCases: updatedSampleCases,
      };
    });
  };

  const handleRemoveSampleCase = (index: number) => {
    // Ensure there are at least 2 sample cases before removing
    if (questionData.sampleCases.length > 2) {
      setQuestionData((prevData) => {
        const updatedSampleCases = [...prevData.sampleCases];
        updatedSampleCases.splice(index, 1);
        return {
          ...prevData,
          sampleCases: updatedSampleCases,
        };
      });
    }
  };

  const handleIncreaseSampleCases = (count: number) => {
    setQuestionData((prevData) => ({
      ...prevData,
      sampleCases: [
        ...prevData.sampleCases,
        ...Array(count).fill({
          input: "",
          expectedOutput: "",
          description: "",
        }),
      ],
    }));
  };
  const handleCodeChange = (field: string, value: string | undefined) => {
    setQuestionData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const editorOptions = {
    selectOnLineNumbers: true,
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    const options = {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(questionData),
    };
    const response = await fetch(
      API_URL + `/api/questions/add-question`,
      options
    );
    const data = await response.json();
    if (data.status == 201) {
      //success

      router.push(`/solve/${data.question.question}`);
    } else {
      setLoading(false);
      setError(data.message);
    }
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

  return (
    <div className=" w-full md:w-[45%] md:h-screen md:overflow-auto p-6 mx-auto bg-white rounded ">
      <h1 className="mb-4 text-2xl font-bold">Create a New Question</h1>
      <form onSubmit={handleSubmit} className="w-full mx-auto">
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">
            Question:
            <input
              type="text"
              name="question"
              value={questionData.question}
              onChange={handleInputChange}
              className="block w-full p-2 mt-1 text-sm font-normal border outline-none resize-none bg-gray-50 form-input"
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">
            Name:
            <input
              type="text"
              name="name"
              value={questionData.name}
              onChange={handleInputChange}
              className="block w-full p-2 mt-1 text-sm font-normal border outline-none resize-none bg-gray-50 form-input"
              required
            />
          </label>
        </div>
        <div className="mb-4 h-[400px]">
          <label className="block mb-2 font-bold text-gray-700">
            Description:
          </label>
          {/* <ReactQuill
            className="h-[300px]"
            theme="snow"
            value={questionData.description}
            onChange={handleQuillRichTextChange}
            modules={modules}
            formats={formats}
            placeholder="Type your description here..."
          /> */}
          <RichEditor
            value={questionData.description}
            apiKey="3fkrtxht99dvdvnojbb1e5t8aclknuc1qtrbpeomq1zhmzns"
            init={{
              height: "90%",
              menubar: true,
              plugins: [
                "advlist lists autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",
              advlist_bullet_styles: "square",
              advlist_number_styles:
                "lower-alpha,lower-roman,upper-alpha,upper-roman",
            }}
            onEditorChange={handleRichTextChange}
          />
          {/* <Quill
            value={questionData.description}
            changeHandler={handleQuillRichTextChange}
          /> */}
          {/* <CKEditor
            editor={ClassicEditor}
            data="<p>Hello, CKEditor 5!</p>"
            onChange={handleCK5TextChange}
            config={{
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "|",
                "bulletedList",
                "numberedList",
                "|",
                "outdent", // Add outdent button
                "indent",
                "|",
                "undo",
                "redo",
              ],
            }}
          /> */}
        </div>
        <div className="mt-10 mb-4">
          <label className="block mb-8 text-gray-700">
            <span className="text-lg font-bold">Sample Test Cases:</span>
            {questionData.sampleCases.map((sampleCase, index) => (
              <div key={index} className="my-2">
                <div className="mb-1 font-semibold">
                  Sample Test Case {index + 1}
                </div>
                <label className="block mb-1 text-sm text-gray-700">
                  Input:
                  <textarea
                    required
                    value={sampleCase.input}
                    onChange={(e) =>
                      handleSampleCaseChange(index, "input", e.target.value)
                    }
                    className="block w-full p-1 mt-1 border outline-none min-h-[100px] bg-gray-50 form-input"
                  />
                </label>
                <label className="block mb-1 text-sm text-gray-700">
                  Expected Output:
                  <textarea
                    required
                    value={sampleCase.expectedOutput}
                    onChange={(e) =>
                      handleSampleCaseChange(
                        index,
                        "expectedOutput",
                        e.target.value
                      )
                    }
                    className="block w-full p-1 mt-1 border outline-none min-h-[100px] bg-gray-50 form-input"
                  />
                </label>
                <label className="block mb-1 text-sm text-gray-700">
                  Description:
                  <textarea
                    value={sampleCase.description}
                    onChange={(e) =>
                      handleSampleCaseChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    className="block w-full p-1 mt-1 border outline-none min-h-[100px] bg-gray-50 form-input"
                  ></textarea>
                </label>
                {/* Remove button for sample cases */}
                {questionData.sampleCases.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSampleCase(index)}
                    className="px-4 py-2 mt-2 text-white bg-red-500 rounded"
                  >
                    Remove Sample Case
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSampleCase}
              className="px-4 py-2 mt-2 text-white bg-blue-500 rounded"
            >
              Add New Sample Case
            </button>
          </label>
        </div>
        {/* Increase the number of sample cases dynamically */}

        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">
            Points:
            <input
              type="number"
              name="points"
              value={questionData.points}
              onChange={handleInputChange}
              className="block w-full p-2 mt-1 text-sm font-normal border outline-none resize-none bg-gray-50 form-input"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">
            Difficulty Level:
            <select
              name="difficultyLevel"
              value={questionData.difficultyLevel}
              onChange={handleInputChange}
              className="block w-full p-2 mt-1 text-sm font-normal border outline-none resize-none bg-gray-50 form-input"
            >
              <option value={1}>Easy</option>
              <option value={2}>Medium</option>
              <option value={3}>Hard</option>
            </select>
          </label>
        </div>
        <div className="mb-4 h-[400px] border border-gray-300 rounded-md p-2">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            User Code:
          </label>
          <Editor
            height="90%"
            language="c"
            theme="light"
            value={questionData.userCode}
            options={EditorOptions}
            onChange={(value) => handleCodeChange("userCode", value)}
          />
        </div>
        <div className="mb-4 h-[400px] border border-gray-300 rounded-md p-2">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Default Code:
          </label>
          <Editor
            height="90%"
            language="c"
            theme="light"
            value={questionData.defaultCode}
            options={EditorOptions}
            onChange={(value: string | undefined) =>
              handleCodeChange("defaultCode", value)
            }
          />
        </div>
        <div className="mb-4">
          {loading ? (
            <span className="px-4 py-2 text-white bg-blue-500 rounded">
              Adding
            </span>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded"
            >
              Submit
            </button>
          )}
        </div>
        {error && <div className="p-2 bg-red-300 rounded-md">{error}</div>}
      </form>
    </div>
  );
};

export default QuestionForm;
