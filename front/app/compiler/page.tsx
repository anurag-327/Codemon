"use client"
import React,{useRef,useState} from "react";
import { render } from "react-dom";
import {Play,Code} from "phosphor-react"
import Editor from '@monaco-editor/react';
import { API_URL } from "@/credentials";
import { saveCode } from "@/helper/codeDownloader";

const compiler = () => {
  const editorRef=useRef<React.MutableRefObject<null>>(null);
  const [theme,setTheme]=useState<string>("light");
  const [input,setInput]=useState<string>("");
  const [output,setOutput]=useState<string>("");
  const [loading,setLoading]=useState<boolean>(false);
  const [error,setError]=useState<boolean>(false);
  const defaultCode=`#include<bits/stdc++.h>\nusing namespace std;\nint main(){
    cout<<"Hello World";\n}`
  function handleEditorDidMount(editor, monaco) {
      editorRef.current = editor;
  }
  async function runCode()
  {
    setLoading(true);
    try {
      const code=editorRef.current.getValue();
      const body={
        method:"post",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({code,input})
      }
        const response=await fetch(API_URL+"/api/v1/compiler/compile",body)
        const data=await response.json();
        if(response.status===200 && data.status==200)
        {
          setError(false);
          setLoading(false)
          setOutput(data.output);
        }
        else
        {
          setError(true);
          setLoading(false);
          setOutput(data.error)
        }
    } catch (error) {
       console.log(error)
    }
    
  }
  

  return (
    <div className={`${theme==="light"?"bg-gray-50":"bg-zinc-900"}`}>
      <div className={`${theme==="light"?"bg-gray-300":"bg-zinc-900"} flex justify-between p-2 mb-2 shadow-md header`}>
        <div className="flex gap-4 lg:ml-10">
              <button onClick={()=> saveCode(editorRef.current.getValue())} className="items-center px-4 py-1.5 font-bold text-gray-800 border bg-white border-orange-500 rounded hover:bg-gray-400">
                <svg className="inline-block w-4 h-4 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                <span>Save Code</span>
              </button>
             <button disabled={loading} onClick={runCode} className={`px-3 py-1.5  rounded-full  ${loading?"bg-blue-300":"bg-blue-600 hover:bg-blue-700"} `}><Play className="inline-block" size={22} color="#ffffff" weight="bold" /><span className="ml-1 font-bold text-white">{loading?"Running":"Run"}</span></button>
        </div>
        <div>
            <a href="https://www.github.com/anurag-327" className="flex flex-col items-center justify-center px-3 bg-white border rounded-md border-t-blue-500 border-b-red-500 border-r-gray-500 border-l-orange-400 "><span className="ml-2 text-[0.8rem] font-bold text-gray-800">Codemon IDE<Code className="inline-block ml-2" size={18} color="#541db9" weight="bold" /></span><span className="block text-[0.7rem] font-bold ">by <span className="text-blue-600 underline">@anurag-327</span></span></a>
        </div>
        <div>
        <button className="p-1 px-1 bg-blue-400 rounded-full" onClick={() => setTheme(theme==="light"?"vs-dark":"light")}>
          {theme==="light" ? (
            <svg className="w-6 h-6 md:w-8 md:h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          ) : (
            <svg className="w-6 h-6 md:w-8 md:h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )}
        </button>
        </div>
            
      </div>
    <div className="flex flex-col w-full lg:flex-row ">
      <div>
          
      </div>
      <div className={`${theme!=="light"&&"bg-zinc-900"} w-[100%]  lg:w-[60%] h-[60vh] lg:h-[90vh]`}>
         <Editor 
           height="100%"
           defaultLanguage="C++"
           theme={theme}
           defaultValue={defaultCode}
           onMount={handleEditorDidMount}
          /> 
      </div> 
        <div className="w-[100%] border-l-4 border-gray-400 px-1 lg:min-h-[90vh] lg:w-[40%]">
          <div className="h-1/2">
            <h2 className="w-full p-2 text-2xl font-bold text-white bg-blue-500 rounded-t-lg">Input</h2>
            <textarea placeholder="Enter input" onChange={(e) => setInput(e.target.value)}  className={`w-full  p-1 outline-none ${theme==="light"?"bg-gray-50 text-gray-800":"bg-zinc-900 text-white"} `} rows={13} defaultValue=""></textarea>
          </div>
          <div className="h-1/2">
            <h2 className={`w-full p-2 text-2xl font-bold text-white bg-gray-500 ${error?"bg-red-500":"bg-green-600 "} rounded-t-lg`}>Output</h2>
            <textarea defaultValue={output}  className={`w-full p-1 outline-none ${theme==="light"?"bg-gray-50 text-gray-800":"bg-zinc-900 text-white"}`} rows={13} ></textarea>
          </div> 
        </div>
    </div>
    </div>
    
  )
}

export default compiler