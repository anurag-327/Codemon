"use client"
import { useState,useEffect } from "react";
import { API_URL } from "@/credentials";
import { useStore } from "@/zustand/useStore";
interface slug{
    slug:string[]
}
const page = ({ params }:{params:slug}) => {
    const username=params.slug[0];
    const [section,setSection]=useState<string>("profile")
    const [error,setError]=useState<any>("")
    const [loading,setLoading]=useState<boolean>(false)
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);
    useEffect(()=>
    {
        (async function ()
        {
            setError("");
            setLoading(true);
           try {
              const res=await fetch(API_URL+`/api/user/${username}`);
              const userData=await res.json();
              if(userData.status==200)
              {
                console.log(userData)
                
                setLoading(false)
              }
              else
              {
                setLoading(false)
                setError(userData.message)
                console.log("Mini data fetch failed");
              }
           } catch (err:any) {
               setError(err)
              console.log(err)
           }
        }())
    },[])
  return (
    <>
       
        <div className="bg-[#333] w-full h-80 flex   ">
            <div className="box-border flex justify-center w-auto h-auto gap-12 mt-8 ml-52 ">
                <div className="w-40 h-40 border-2 border-white rounded-md ">
                  
                </div>
                <div className="w-auto h-20 mt-10 text-white">
                    <div>
                        <span className="font-bold">username 👨‍💻</span>
                    </div>
                    <div>
                        <span className="text-sm text-gray-300 font-extralight">Codemon Id: </span>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex justify-start w-[80%] profile sm:w-[90%] sm:flex-col m-auto">
            <div className="w-[30%] sm:w-[90%] ml-5 flex flex-col sm:flex-row gap-2 p-2">
                <div className="w-full p-3 text-center rounded-md cursor-pointer detailsbtn sm:p-1 bg-violet-400">
                    <span>Profile</span>
                </div>
                <div className="w-full p-3 text-center text-black rounded-md cursor-pointer problemssolvedbtn sm:p-1">
                    <span>Problems Solved</span>
                </div>
                <div className="w-full p-3 text-center text-black rounded-md cursor-pointer sm:p-1 pointsbtn">
                    <span>Points</span>
                </div>
               
            </div>
            <div className=" w-[60%] detailscontainer  -mt-20 sm:mt-4 sm:w-[100%] sm:p-1 rounded-md z-10 p-3  m-auto bg-white shadow-xl">

            </div>
        </div>
      
    </>
  )
}

export default page