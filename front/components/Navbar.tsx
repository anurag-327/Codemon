import { useStore } from "@/zustand/useStore";
import Avatar from "./avatar";
import {
  CaretUp,
  CodeBlock,
  Gear,
  House,
  SignOut,
} from "@phosphor-icons/react/dist/ssr";
import { removeToken } from "@/helper/tokenhandler";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
const Navbar = () => {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const [dropDown, setDropDown] = useState(false);
  return (
    <nav className="fixed top-0 z-10 flex items-center justify-between w-full py-2 text-sm bg-white shadow-md p">
      <div className="firstpanel">
        <a
          href="https://github.com/anurag-327/Codemon"
          className="flex items-center ml-4 logo"
        >
          <CodeBlock size={25} weight="fill" />
          <span>Codemon</span>
        </a>
      </div>
      <div className="flex items-center gap-2 md:mr-3 md:gap-2 secondpanel">
        <a className="py-1 text-gray-500 md:px-2 hover:text-gray-700" href="/">
          Problems
        </a>
        <a
          className="py-1 text-gray-500 md:px-2 hover:text-gray-700"
          href="/compiler"
        >
          Compiler
        </a>
        {user ? (
          <div className="relative flex items-center gap-2">
            <button
              onClick={() => setDropDown(!dropDown)}
              className="px-1 mr-2"
            >
              <Avatar value={user.name} />
            </button>
            {dropDown && (
              <div className="absolute z-[200]  border flex flex-col top-10 w-[250px] min-h-[100px] right-2 bg-white px-4 py-6 rounded-md">
                <CaretUp
                  className="absolute z-[200] -right-1 -top-4 "
                  size={30}
                  color="#ffffff"
                  weight="fill"
                />

                <div className="flex flex-col ">
                  <span className="text-sm font-[400] text-gray-800 ">
                    {user.name}
                  </span>
                  <span className="overflow-hidden text-xs text-gray-400 ">
                    {user.email}
                  </span>
                </div>
                <hr className="w-full h-[0.5px] mt-2 bg-gray-200 rounded-full "></hr>
                <div className="flex flex-col gap-3 mt-4">
                  {/* <a href="/" className="flex items-center gap-1 mt-4">
                    <House size={18} weight="regular" />
                    Home
                  </a> */}
                  <a
                    href={`/user/${user.username}`}
                    className="flex items-center gap-1"
                  >
                    <Gear size={18} weight="regular" />
                    Profile
                  </a>
                  <button
                    onClick={() => {
                      removeToken();
                      setUser(null);
                      router.push("/");
                    }}
                    className="flex items-center gap-1"
                  >
                    <SignOut size={18} weight="regular" />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <a
            className="px-6 py-1 text-white bg-red-500 rounded-md"
            href="/login"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
