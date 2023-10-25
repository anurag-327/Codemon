import React from 'react'

const Solve_QuestionSection = ({question}:{question:any}) => {
  return (
    <div className='w-full bg-emerald-50 border border-gray-300 rounded-2xl flex flex-col gap-4 text-black  md:w-[48%] h-full mt-10'>
        <div className='w-full p-1 px-4 text-sm font-semibold text-gray-600 bg-gray-300 rounded-t-2xl'>
            Description
        </div>

        <div className='flex flex-col gap-2 px-4 py-2 mt-4'>
            <h2 className='text-2xl font-semibold '>{question.question}</h2>
            <div className='flex gap-2'>
                { 
                    question.difficultyLevel==1&&<div className='text-[0.6rem] px-3 py-1 w-fit text-center  bg-orange-200 rounded-full text-gray-600'>Easy</div>
                }
                {
                    question.difficultyLevel==2&&<div className='text-[0.6rem] px-3 text-center py-1 w-fit bg-gray-200 rounded-full text-gray-600'>Medium</div>
                }
                {
                    question.difficultyLevel==3&&<div className='text-[0.6rem] px-3 text-center py-1 w-fit bg-red-300 rounded-full text-gray-600'>Hard</div>
                }
                <div className='text-[0.6rem] px-3 py-1 w-fit text-center  bg-orange-200 rounded-full text-gray-600'>{question.points} Points</div>
            </div>
            <div className='flex flex-col gap-1 mt-4 '>
               <span className='font-semibold'>Description : </span>
               <p className='text-sm text-gray-600'>{question.description}</p>
            </div>
            <div>
            <div className='mt-10'>
            {
                question.sampleCases.map((data:any,index:Number) =>
                 <div className='flex flex-col gap-1 mt-4'>
                     <span className='font-semibold text-gray-700 '>Example : {index+1}</span>
                     <div className='px-2 my-2 ml-4 border-l-2 border-gray-500'>
                        <div className='flex gap-1'>
                           <span className='font-semibold '>Input :</span>
                           <p>{data.input}</p>
                        </div>
                        <div className='flex gap-1'>
                           <span className='font-semibold'>Output :</span>
                           <p>{data.output}</p>
                        </div>
                     </div>   
                     
                </div>
                )
            }
            </div>    
            
            </div>
        </div>
    </div>
  )
}

export default Solve_QuestionSection