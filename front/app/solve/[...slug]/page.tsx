"use client"
import{useEffect} from "react"
import { API_URL } from "@/credentials"
import { useRouter } from "next/navigation"
interface slug{
    slug:string[]
}
export default function Page({ params }:{params:slug}) {
    const router=useRouter();
    useEffect(() => {
        async function getData()
        {
            const response=await fetch(API_URL+`/api/v1/data/question/${params.slug[0]}`)
            const data= await response.json();
            if(response.status===200 && data.status===200)
            {
                  console.log(data)
            }
            else
            {
                router.push("/error")  
            }
        }
    getData();
    },[])
    
    return(
        <div>hii</div>
    )
  }