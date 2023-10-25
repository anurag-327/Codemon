import { useStore } from "@/zustand/useStore";
import Avatar from "./avatar";
const Navbar = () => {  
  const user = useStore((state) => state.user);
  console.log("nav",user)
  return (
    <nav className="fixed top-0 z-10 flex items-center justify-between w-full py-3 bg-white shadow-md p">
        <div className="firstpanel">
             <div className="logo">
                  <img src="https://files.codingninjas.com/cn-studio-new-logo-27719.svg" alt="logo"></img>
             </div>
        </div>
        <div className="flex gap-3 secondpanel">
             {
                  user?<a className="" href={`/users/${user.username}`}><Avatar value="Anurag Srivastav" />
                    </a>:<a className="px-6 py-1 text-white bg-red-500 rounded-md" href="/login">Login</a>
             }
             <a className="px-3 py-1 bg-gray-100 border-2 border-blue-500 rounded-md" href="/compiler">Compiler</a>
             
        </div>
    </nav>
  )
}

export default Navbar