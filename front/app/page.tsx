"use client";
import Landing from "@/components/Home/Landing";
import Avatar from "@/components/avatar";
import { useStore } from "@/zustand/useStore";
import { ArrowCircleRight, CodeBlock } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-0 bg-gradient-to-r from-gray-100 via-orange-50 to-pink-200">
      <SmallNavbar />
      <Navbar />
      <Landing />
    </main>
  );
}

function Navbar() {
  const user = useStore((state) => state.user);
  return (
    <nav className="hidden grid-cols-5 text-sm bg-transparent sm:grid sm:text-base">
      <a
        href="/"
        className="flex items-center justify-center p-3 text-center border-b border-gray-400"
      >
        <span>
          <CodeBlock size={25} weight="fill" />
        </span>
        <span>Codemon</span>
      </a>
      <a
        href="https://github.com/anurag-327/Codemon"
        className="flex items-center justify-center p-3 text-center border-b border-l border-gray-400"
      >
        Github
      </a>
      <a
        href="/problems"
        className="flex items-center justify-center p-3 text-center border-b border-l border-gray-400"
      >
        Problems
      </a>
      <a
        href="compiler"
        className="flex items-center justify-center p-3 text-center border-b border-l border-gray-400"
      >
        Compiler
      </a>
      {user ? (
        <a
          href="https://github.com/anurag-327/Codemon"
          className="flex items-center justify-center gap-2 p-3 text-center border-b border-l border-gray-400"
        >
          <Avatar value={user.name} />
        </a>
      ) : (
        <a
          href="/login"
          className="flex items-center justify-center gap-2 p-3 text-center border-b border-l border-gray-400"
        >
          <span>
            <ArrowCircleRight size={40} weight="fill" />
          </span>
          <span>Sign in</span>
        </a>
      )}
    </nav>
  );
}
const SmallNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className=" sm:hidden">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 ">Logo</div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center ml-4 md:ml-6">
              <a
                href="#"
                className="px-3 py-2 text-sm font-medium text-gray-600 rounded-md "
              >
                Home
              </a>
              <a
                href="#"
                className="px-3 py-2 text-sm font-medium text-gray-600 rounded-md "
              >
                About
              </a>
              <a
                href="#"
                className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md "
              >
                Contact
              </a>
            </div>
          </div>
          <div className="flex -mr-2 md:hidden">
            <button
              onClick={toggleNavbar}
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-600 rounded-md "
            >
              Home
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-600 rounded-md "
            >
              About
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-600 rounded-md "
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
