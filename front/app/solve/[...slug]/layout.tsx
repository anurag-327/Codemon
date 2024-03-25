"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/credentials";
import { useRouter } from "next/navigation";
import { solverStore, useStore } from "@/zustand/useStore";
import Solve_EditorSection from "@/components/Solve/Solve_EditorSection";
import TopBar from "@/components/Solve/TopBar";
import { getToken, removeToken } from "@/helper/tokenhandler";
import {
  CaretUp,
  CloudArrowUp,
  CodeBlock,
  Gear,
  Note,
  Play,
  SignOut,
  Timer,
} from "@phosphor-icons/react/dist/ssr";
import Avatar from "@/components/avatar";
// import Navbar from "@/components/Navbar";

interface slug {
  slug: string[];
}
interface testcase {
  input: string;
  output: string;
  description: string;
}
interface question {
  _id: string;
  question: string;
  name: string;
  description: string;
  sampleCases: testcase[];
  points: Number;
  difficultyLevel: Number;
  userCode: String;
  addedBy: String;
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: slug;
}) {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const user = useStore((state) => state.user);
  const {
    question,
    setQuestion,
    submissions,
    setSubmissions,
    note,
    setNote,
    section,
    setSection,
  } = solverStore();
  const page = params.slug[1] || "description";
  useEffect(() => {
    async function getQuestion() {
      const options = {
        method: "get",
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      };
      const response = await fetch(
        API_URL + `/api/questions/question/${params.slug[0]}`,
        options
      );
      const data = await response.json();
      if (data.status === 200) {
        setQuestion(data.question);
        setSubmissions(data.submissions);
        setNote(data.note);
      } else if (data.status == 404 || data.status == 400) {
        if (data.status == 404) router.push("/not-found");
        setError(true);
      } else {
        router.push("/error");
      }
    }
    async function getSubmissions() {}
    if (user) {
      getQuestion();
      getSubmissions();
    } else router.push(`/login?callback_url=solve/${params.slug[0]}`);
  }, []);

  return (
    <main className="h-[95vh] bg-gray-100">
      <Navbar />
      <div className="flex h-[92vh] flex-col items-center justify-center w-full gap-2 px-2 bg-gray-100 md:items-start md:flex-row">
        {question && (
          <>
            <div className="w-full h-[94vh] text-sm overflow-hidden no-scrollbar bg-white border border-gray-300 rounded-lg flex flex-col text-black  md:w-[45%] ">
              <TopBar />
              <div className="h-full overflow-y-auto text-sm ">{children}</div>
            </div>
            <Solve_EditorSection
              question={question}
              submissions={submissions}
            />
          </>
        )}
      </div>
    </main>
  );
}
function Navbar() {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const { section, setSection } = solverStore();
  const [dropDown, setDropDown] = useState(false);
  return (
    <nav className="top-0 z-10 flex items-center justify-between w-full py-1 text-sm bg-gray-100 p">
      <div className="firstpanel">
        <a
          href="https://github.com/anurag-327/Codemon"
          className="flex items-center ml-4 text-gray-600 logo"
        >
          <CodeBlock size={25} weight="fill" />
          <span>Codemon</span>
        </a>
      </div>
      <div className="flex gap-0.5">
        <button
          className="flex items-center justify-center gap-1 px-2 py-1.5 bg-gray-200 hover:bg-gray-200"
          // onClick={runBtn}
        >
          <Play size={18} color="#94515f" weight="fill" />
          <span className="text-sm font-semibold">Run</span>
        </button>
        <button
          className="flex items-center justify-center gap-1 px-2 py-1 text-green-500 bg-gray-200 hover:bg-gray-200"
          // onClick={submitBtn}
        >
          <div>
            <CloudArrowUp size={20} className="text-green-500" />
          </div>
          <span className="text-sm font-semibold">Submit</span>
        </button>
        <button className="relative ml-2 px-2 py-0.5 bg-gray-200 rounded-md hover:bg-gray-200">
          <div
            className={`flex gap-1 ${section == "notes" && "font-semibold"}`}
          >
            <Timer size={20} className="text-gray-600" weight="bold" />
          </div>
        </button>
        <button
          onClick={() => setSection("notes")}
          className="relative px-2 py-0.5 bg-gray-200 rounded-md hover:bg-gray-200"
        >
          <div
            className={`flex gap-1 ${section == "notes" && "font-semibold"}`}
          >
            <Note size={20} className="text-gray-600" weight="bold" />
          </div>
        </button>
      </div>
      <div className="flex items-center gap-4 md:mr-3 md:gap-4 secondpanel">
        <a
          href="/problems"
          className="py-1 text-gray-600 md:px-2 hover:text-gray-700"
        >
          Problems
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
                  <span className="overflow-hidden text-xs text-gray-600 ">
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
            className="py-1 mr-2 text-gray-500 md:rounded-md md:px-6 md:text-white md:bg-red-500"
            href="/login"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
}
