import { Fire } from "phosphor-react";
interface question{
    question:string,
    difficultyLevel:Number;
    points:number
}
const QuestionContainer = ({data}:{data:question}) => {
  return (
    <a href={`solve/${data.question}`} className='w-full  hover:font-semibold flex mx-auto justify-between items-center shadow-sm  border border-gray-200 hover:border-gray-400 rounded-md  px-2 py-3  md:w-[90%] md:min-w-[600px]' >
                <div className='text-sm overflow-hidden text-gray-600  w-[45%]'>{data.question}</div>
                { 
                    data.difficultyLevel==1&&<div className='text-[0.6rem] px-3 py-2 w-[15%] text-center  bg-orange-200 rounded-full text-gray-600'>Easy</div>
                }
                {
                    data.difficultyLevel==2&&<div className='text-[0.6rem] px-3 text-center py-2 w-[15%] bg-gray-200 rounded-full text-gray-600'>Medium</div>
                }
                {
                    data.difficultyLevel==3&&<div className='text-[0.6rem] px-3 text-center py-2 w-[15%] bg-red-300 rounded-full text-gray-600'>Hard</div>
                }
                <div className='text-[0.7rem]  flex  w-[15%] justify-center items-center text-gray-600'>
                    <div className="w-[80%] px-2 py-1  bg-yellow-100 rounded-full flex justify-center items-center">
                        <Fire size={20} color="#FFEB2A" weight="fill" />{data.points}
                    </div>    
                </div>
                <div className='text-[0.7rem] hidden  w-[20%] px-2 py-1  rounded-full md:inline-flex justify-center items-center text-gray-600'>
                    {
                        data.difficultyLevel===1&& "10 mins"
                    }
                    {
                        data.difficultyLevel===2&& "20 mins"
                    }
                    {
                        data.difficultyLevel===3&& "35 mins"
                    }
                </div>
            </a>
  )
}

export default QuestionContainer