import { useStore } from "@/zustand/useStore";
import Avatar from "./avatar";
import { CodeBlock } from "@phosphor-icons/react/dist/ssr";
import { removeToken } from "@/helper/tokenhandler";
import { useRouter,useSearchParams } from "next/navigation";
const Navbar = () => {  
  const router=useRouter();
  const user = useStore((state) => state.user);
  return (
    <nav className="fixed top-0 z-10 flex items-center justify-between w-full py-3 bg-white shadow-md p">
        <div className="firstpanel">
             <a href="https://github.com/anurag-327/Codemon" className="flex items-center ml-4 logo">
                <CodeBlock size={32} weight="fill" />
                <span>Codemon</span>
             </a>
        </div>
        <div className="flex items-center gap-2 mr-3 secondpanel">
             <a className="px-2 py-1 underline" href="/">Home</a>
             <a className="px-2 py-1 underline" href="/compiler">Compiler</a>
             {
                  user?<div className="flex items-center gap-2"><span onClick={() =>{ removeToken(); router.push("/</>")}}>Logout</span><a className="px-3 mr-2" href={`/users/${user.username}`}><Avatar value="Anurag Srivastav" />
                  </a></div>:<a className="px-6 py-1 text-white bg-red-500 rounded-md" href="/login">Login</a>
             }
             
             
        </div>
    </nav>
  )
}

export default Navbar