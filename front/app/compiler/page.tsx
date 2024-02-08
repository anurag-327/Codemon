"use client";
import React, { useRef, useState } from "react";
import { render } from "react-dom";
import { Play, Code } from "phosphor-react";
import Editor from "@monaco-editor/react";
import { API_URL } from "@/credentials";
import { saveCode } from "@/helper/codeDownloader";
import { CodeBlock } from "@phosphor-icons/react/dist/ssr";
import { EditorOptions } from "@/helper/Editor";
const compiler = () => {
  const editorRef = useRef<number | any>(null);
  const [theme, setTheme] = useState<string>("light");
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  // const defaultCode = `#include<bits/stdc++.h>\nusing namespace std;\nint main()\n{
  //   cout<<"Hello World";\n}`;
  const defaultCode = `void solve()\n{\n   // Do not create main function \n   // Write your code here \n   cout<<"Hello World"; \n}`;

  function handleEditorDidMount(editor: number | any) {
    editorRef.current = editor;
  }
  async function runCode() {
    setLoading(true);
    setOutput("");
    setError(false);
    try {
      const code = editorRef.current.getValue();
      const body = {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ code, input }),
      };
      const response = await fetch(API_URL + "/api/v1/compiler/compile", body);
      const data = await response.json();
      console.log(data);
      if (response.status === 200 && data.status == 200) {
        setError(false);
        setLoading(false);
        setOutput(data.output);
      } else {
        setError(true);
        setLoading(false);
        setOutput(data.error);
        if (data.message) {
          setOutput(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={`${
        theme === "light" ? "bg-gray-50" : "bg-zinc-900"
      } overflow-hidden md:h-screen p-2`}
    >
      <nav
        className={`${
          theme === "light" ? "bg-gray-50" : "bg-zinc-900"
        } flex justify-end rounded-md border border-gray-300 px-2 py-1 mb-2 header`}
      >
        <div className="flex flex-row justify-between w-full lg:ml-10">
          <a href="/" className="flex items-center ml-4 logo">
            <CodeBlock size={32} weight="fill" />
            <span>Codemon</span>
          </a>
          <div className="flex gap-2">
            <button
              disabled={loading}
              onClick={runCode}
              className={`px-3 py-1  rounded-md  ${
                loading ? "bg-blue-300" : "bg-gray-200 hover:bg-gray-300"
              } `}
            >
              <Play
                className="inline-block"
                size={18}
                color="#94515f"
                weight="fill"
              />
              <span className="ml-1 font-[500] text-gray-800">
                {loading ? "Running" : "Run"}
              </span>
            </button>
            <button
              onClick={() => saveCode(editorRef.current.getValue())}
              className="items-center px-2 py-1 font-[500] text-gray-800 bg-white border border-orange-500 rounded hover:bg-gray-300"
            >
              <svg
                className="inline-block w-4 h-4 mr-2 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span>Save Code</span>
            </button>
          </div>
        </div>
      </nav>
      <div className="flex flex-col w-full gap-2 lg:flex-row ">
        <div
          className={`${
            theme !== "light" && "bg-zinc-900"
          } w-[100%] border border-gray-300 rounded-t-lg  lg:w-[60%] h-[60vh] lg:h-[89.6vh]`}
        >
          <Editor
            height="100%"
            defaultLanguage="c"
            theme={theme}
            options={EditorOptions}
            defaultValue={defaultCode}
            onMount={handleEditorDidMount}
            className="py-2 overflow-hidden"
          />
        </div>
        <div className="w-[100%] gap-2 border-gray-300 px-1 flex flex-col lg:w-[40%]">
          <div className=" border overflow-hidden  border-gray-300 rounded-t-lg h-[47%]">
            <h2 className="w-full p-2 text-2xl font-semibold text-gray-700 bg-gray-200 ">
              Input
            </h2>
            <textarea
              placeholder="Enter input"
              onChange={(e) => setInput(e.target.value)}
              className={`w-full  p-1 outline-none mt-2 `}
              rows={12}
              defaultValue=""
            ></textarea>
          </div>
          <div className=" overflow-hidden border border-gray-300  rounded-t-lg h-[48%]">
            <h2
              className={`w-full p-2 text-2xl font-semibold text-gray-700  rounded-t-lg ${
                error ? "bg-red-200" : "bg-gray-200 "
              } rounded-t`}
            >
              Output
            </h2>
            <textarea
              defaultValue={output}
              className={` ${
                error && "text-red-500"
              } w-full p-1 outline-none mt-2}`}
              rows={12}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default compiler;
