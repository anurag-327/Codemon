import { Fire ,Timer} from "phosphor-react";
import {useState,useEffect} from "react"
import QuestionContainer from "./questionContainer";
import QuestionTable from "./questionTable";
import QuestionContainerSkeleton from "./skeleton/questionContainer";
import { API_URL } from "@/credentials";
interface question{
    question:string;
    points:number;
    difficultyLevel:Number;
    _id:string;
}

const Questions = () => { 
    const [loading, setLoading] = useState<boolean>(true)
    const [questions,setQuestions]=useState<question[]>([])
    useEffect(() => {
        async function getData()
        {
            const response=await fetch(API_URL+"/api/v1/data/questions")
            const data= await response.json();
            if(response.status===200 && data.status===200)
            {
                  console.log(data)
                  setQuestions(data.questions);
                  setLoading(false)
            }
            else
            {
                  
            }
        }
    getData();
    },[])
    
  return (
    <div className='w-[100%] mt-20 md:w-[80%] md:max-w-[800px] mx-auto p-5'>
        <h2 className='font-sans text-2xl font-semibold text-gray-600'>Solve Coding Questions</h2>
        <div className='flex flex-col items-center justify-center gap-4 mt-8'>
            <div className='w-full flex justify-between items-center shadow-md   border-gray-400 hover:border-gray-400 rounded-md transform translate duration-0 px-2 py-3  md:w-[90%] md:min-w-[600px]'>
                <div className='text-sm overflow-hidden text-gray-600 w-[45%]'>Question</div>
                <div className='text-[0.7rem] px-3 py-2  text-gray-600 w-[15%]'>Difficulty</div>
                <div className='text-[0.8rem] px-2 py-1  flex justify-center items-center text-gray-600 w-[15%]'><Fire size={20} color="#FFEB2A" weight="fill" />Points</div>
                <div className='text-[0.8rem] px-2 py-1  flex justify-center items-center text-gray-600 w-[20%]'>
                    <Timer size={20} color="#e3c116" weight="fill" />Avg time
                </div>
            </div>
            {
                loading?<QuestionContainerSkeleton />:(
                    questions.map((data,index) => <QuestionContainer key={index} data={data}/>)
                )
            }
        </div>
        {/* <QuestionTable questions={questions}/> */}
    </div>
  )
}

export default Questions