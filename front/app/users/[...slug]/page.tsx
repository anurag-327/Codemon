"use client"
import { useState,useEffect } from "react";
import { API_URL } from "@/credentials";
import { useStore } from "@/zustand/useStore";
import { CodeBlock } from "@phosphor-icons/react/dist/ssr";
import Navbar from "@/components/navbar";
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
                console.log(userData)
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
      <nav className="z-10 flex items-center justify-between w-full py-3 bg-white shadow-md p">
        <div className="firstpanel">
             <a href="https://github.com/anurag-327/Codemon" className="flex items-center ml-4 logo">
                <CodeBlock size={32} weight="fill" />
                <span>Codemon</span>
             </a>
        </div>
        <div className="flex items-center gap-2 mr-3 secondpanel">
             <a className="px-2 py-1 underline" href="/">Home</a>
             <a className="px-2 py-1 underline" href="/compiler">Compiler</a>
        </div>
    </nav>
    <main>

	<div className="flex items-center mt-10 ">
		<div className="flex items-center justify-center w-full gap-2">
			<nav className="flex gap-2 ">
				<a href="#" className="text-blue-700 underline hover:underline hover:text-blue-600"> Profile </a>
				<a href="#" className="hover:underline hover:text-blue-700"> Solved-Questions </a>
				{/* <a href="#" className="hover:underline hover:text-blue-700"> Edit </a> */}
			</nav>
		</div>
	</div>
    </main>
    </>
  )
}

export default page