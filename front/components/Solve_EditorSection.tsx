import { API_URL } from '@/credentials';
import { getToken } from '@/helper/tokenhandler';
import Editor from '@monaco-editor/react';
import {useRef, useState} from "react"
const Solve_EditorSection = ({question}:{question:any}) => 
{
    const editorRef=useRef<number | any>(null);
    const [error,setError]=useState<any>()
    const [errorMsg,setErrorMsg]=useState<string>("")
    const [brkpt,setBrkpt]=useState<any>()
    const [brkptBox,setBrkptBox]=useState<boolean>()
    const [successBox,setSuccessBox]=useState<boolean>()
    const [successMsg,setSuccessMsg]=useState<string>("")
    const [acceptance,setAcceptance]=useState<boolean>(false)
    const [pointsObtained,setPointsObtained]=useState<number>(0)
    const [loading,setLoading]=useState<boolean>(false)
    function handleEditorDidMount(editor:number|any) {
        editorRef.current = editor;
    }
    const token=getToken();
    function reset()
    {
        setLoading(false)
        setBrkptBox(false)
        setError(false)
        setErrorMsg("");
        setBrkpt("");
        setSuccessBox(false)
        setSuccessMsg("")
    }
    async function runBtn()
    {
        reset();
        setLoading(true)
        const code=editorRef.current.getValue();
         let options:any={
            method:"POST",
            headers:
            {
                "Content-type":"application/json",
                "authorization":`Bearer ${token}`
            },
            body:JSON.stringify({code:code,name:question.question})
        }
         let res= await fetch(API_URL+"/api/v1/solve/test",options);
         let data= await res.json();
         if(data.status==200)
         {
            setLoading(false)
             setSuccessBox(true)
             setSuccessMsg(data.message)
        }
        else if(data.status==400)
        {
            setLoading(false)
            setError(true)
            if(data.result==false)
            {
                setErrorMsg(data.message)
            } 
            if(data.error)
            {
                setErrorMsg(data.error)
            }
            if(data.breakPoint)
            {
                setBrkptBox(true)
                setBrkpt(data.breakPoint)
            }
        }
        else
        {
            setLoading(false)
            setError(true)
            console.log(data.error)
        }
    }
    async function submitBtn()
    {
        reset();
        setLoading(true)
        const code=editorRef.current.getValue();
         let options:any={
            method:"POST",
            headers:
            {
                "Content-type":"application/json",
                "authorization":`Bearer ${token}`
            },
            body:JSON.stringify({code:code,name:question.question})
        }
         let res= await fetch(API_URL+"/api/v1/solve/submit",options);
         let data= await res.json();
         console.log(data)
         if(data.status==200)
         {
            setLoading(false)
             setSuccessBox(true)
             setSuccessMsg(data.message)
             setAcceptance(true)
             setPointsObtained(data.pointsobtained)
        }
        else if(data.status==400)
        {
            setLoading(false)
            setError(true)
            if(data.result==false)
            {
                setErrorMsg(data.message)
            } 
            if(data.error)
            {
                setErrorMsg(data.error)
            }
            if(data.breakPoint)
            {
                setBrkptBox(true)
                setBrkpt(data.breakPoint)
            }
        }
        else
        {
            setLoading(false)
            setError(true)
            console.log(data.error)
        }
    }
  return (
    <div className='w-full flex flex-col  md:w-[50%] h-full  mt-10'>
        <div className='md:h-[70%] h-[60%] border border-gray-300 rounded-2xl'>
            <Editor 
               height="100%"
               defaultLanguage="C++"
               theme="dark"
               defaultValue={question.defaultCode}
               onMount={handleEditorDidMount}
               className='p-2 border-r border-zinc-800'
              /> 
        </div>
        
        <div className='p-2 mt-4 border min-h-[250px] border-gray-300 rounded-2xl'>
            <div className='flex justify-end w-full gap-4 pr-8 rounded-2xl'>
               <button className='px-2 py-1 border rounded-md bg-zinc-300' onClick={runBtn}>Run</button>
               <button className='px-2 py-1 bg-blue-300 border rounded-md' onClick={submitBtn}>Submit</button>
            </div>
            {
                loading&&<Loader />
            }
            <div className='mt-4 ml-3'>
                {
                    successBox&&(
                        <div className='p-3 bg-blue-100 rounded-2xl flex flex-col gap-1  min-h-[140px] mt-1 '>
                            <span className='text-xl font-semibold'>{successMsg}🎆</span>
                            {
                            acceptance&&(<div className='flex flex-col mt-2'>
                                <span className='font-semibold'>Solution Accepted</span>
                                <span className='font-semibold'>Points Obtained : {pointsObtained} </span></div>)
                            }
                        </div>
                        
                    )
                }
                {
                    error&&(
                        <div>
                            <span className='text-lg font-semibold tracking-widest text-emerald-600'>Error</span>         
                            <div className='p-3 bg-red-200 rounded-2xl text-emerald-700 min-h-[100px] mt-1 '>
                                 <span className='font-semibold'>{errorMsg}</span>
                                 {
                                   brkptBox&&(
                                    <div>
                                      {
                                        <div className='flex flex-col gap-1 mt-1'>
                                        <div className='px-2 my-2 ml-4 border-l-2 border-gray-500'>
                                           <div className='flex gap-1'>
                                              <span className='font-semibold '>Input :</span>
                                              <p>{brkpt.input}</p>
                                           </div>
                                           <div className='flex gap-1'>
                                              <span className='font-semibold'>Output :</span>
                                              <p>{brkpt.output}</p>
                                           </div>
                                           <div className='flex gap-1'>
                                              <span className='font-semibold'>Expected Output :</span>
                                              <p>{brkpt.expectedOutput}</p>
                                           </div>
                                        </div>   
                                        
                                   </div>

                                      }
                                    </div>)   
                               }
                            </div>   
                           
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Solve_EditorSection

function Loader()
{
    return(
        <div className="w-full max-w-sm p-4 mx-auto mt-4 bg-white border border-blue-300 rounded-md shadow loader">
                        <div className="flex space-x-4 animate-pulse">
                          <div className="w-10 h-10 rounded-full bg-slate-700"></div>
                          <div className="flex-1 py-1 space-y-6">
                            <div className="h-2 rounded bg-slate-700"></div>
                            <div className="space-y-3">
                              <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 col-span-2 rounded bg-slate-700"></div>
                                <div className="h-2 col-span-1 rounded bg-slate-700"></div>
                              </div>
                              <div className="h-2 rounded bg-slate-700"></div>
                            </div>
                          </div>
                        </div>
                      </div>
    )
}