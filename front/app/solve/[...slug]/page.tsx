"use client"
import{useEffect,useState} from "react"
import { API_URL } from "@/credentials"
import { useRouter } from "next/navigation"
import { useStore } from "@/zustand/useStore"
import Solve_EditorSection from "@/components/Solve_EditorSection"
import Solve_QuestionSection from "@/components/Solve_QuestionSection"

interface slug{
    slug:string[]
}
interface testcase{
    input:string,
    output:string,
}
interface question{
    question:string,
    description:string,
    testCases:testcase[],
    sampleCases:testcase[],
    points:Number,
    difficultyLevel:Number,
    defaultCode: String,
}

export default function Page({ params }:{params:slug}) {
    const router=useRouter();
    const [error,setError]=useState<boolean>(false);
    const [question,setQuestion]=useState<any>(null);
    const user=useStore(state => state.user);
    useEffect(() => 
    {
        async function getData()
        {
            const response=await fetch(API_URL+`/api/v1/data/question/${params.slug[0]}`)
            const data= await response.json();
            if(data.status===200)
            {
                //   console.log(data)
                  setQuestion(data.question)
            }
            else if(data.status==404 || data.status==400)
            {
                setError(true)
            }
            else
            {
                router.push("/error")  
            }
        }

        if(user)
        {
            getData();
        }
        else
        {
            router.push("/login")
        }
    },[])
    
    return(
        <>
           {
             error?(<div className="flex flex-col items-center justify-center w-full min-h-screen gap-4">
                <span>Problem Not Found</span>
                <a className="p-1 border rounded-lg bg-zinc-200" href="/">Home</a>
             </div>)
             :(<div className="flex flex-col w-full gap-2  justify-center md:items-start items-center px-4 py-2 h-[100vh] md:flex-row">
                {
                    question&&<>
                    <Solve_QuestionSection question={question} />
                    <Solve_EditorSection question={question} />
               </>     
                }              
             </div>)
           }
        </>
       
    )
  }