"use client";
import React, { useEffect, useRef, useState } from "react";
import { API_URL } from "@/credentials";
import { useRouter } from "next/navigation";
import { solverStore, useStore } from "@/zustand/useStore";
import Solve_EditorSection from "@/components/Solve/Solve_EditorSection";
import TopBar from "@/components/Solve/TopBar";
import { getToken, removeToken } from "@/helper/tokenhandler";
import Editor from "@monaco-editor/react";
import {
  ArrowsClockwise,
  CaretLeft,
  CaretUp,
  CloudArrowUp,
  CodeBlock,
  Note,
  PauseCircle,
  Play,
  PlayCircle,
  SignOut,
  Timer,
  User,
} from "@phosphor-icons/react/dist/ssr";
import Avatar from "@/components/avatar";
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
  points: number;
  difficultyLevel: number;
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
  const { question, setQuestion, submissions, setSubmissions, setNote } =
    solverStore();
  const user = useStore((state) => state.user);
  const [error, setError] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  function onEditorChangeHandler(value: string, event: any) {
    setCode(value);
  }
  const page = params.slug[1] || "description";
  async function runCode() {
    const node =
      (document.querySelector("#runCodeButton") as HTMLElement) || null;
    if (node) node.click();
  }
  async function submitCode() {
    const node =
      (document.querySelector("#submitCodeButton") as HTMLElement) || null;
    if (node) node.click();
  }
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
        if (data.submissions.length > 0) setCode(data.submissions[0].code);
        else setCode(data.userCode);
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
      <Navbar
        runCode={runCode}
        submitCode={submitCode}
        Editor={Editor}
        code={code}
      />
      {question && (
        <div className="flex h-[92vh] flex-col items-center justify-center w-full gap-2 md:px-2 bg-gray-100 md:items-start md:flex-row">
          <div className="w-full mt-1 h-[94vh] text-sm overflow-hidden no-scrollbar bg-white md:border border-gray-300 md:rounded-lg flex flex-col text-black  md:w-[45%] ">
            <TopBar />
            <div className="h-full overflow-y-auto text-sm ">{children}</div>
          </div>
          <Solve_EditorSection
            code={code}
            setCode={setCode}
            Editor={Editor}
            question={question}
            submissions={submissions}
            onEditorChangeHandler={onEditorChangeHandler}
          />
        </div>
      )}
    </main>
  );
}
function Navbar({
  Editor,
  code,
  runCode,
  submitCode,
}: {
  Editor: any;
  code: string;
  runCode: any;
  submitCode: any;
}) {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const { section, setSection } = solverStore();
  const [dropDown, setDropDown] = useState(false);

  return (
    <nav className="top-0 z-10 flex items-center justify-between w-full py-1 text-sm bg-[#f0f0f0]">
      <div className="firstpanel">
        <a href="/" className="flex items-center ml-4 text-gray-800 logo">
          <CodeBlock size={25} weight="fill" />
          <span>Codemon</span>
        </a>
      </div>
      <div className="md:flex hidden gap-0.5">
        <button
          className="flex items-center group justify-center gap-1 px-2 py-1.5 bg-gray-200 hover:bg-gray-300"
          onClick={runCode}
        >
          <div className="absolute z-10 items-center hidden gap-2 px-2 py-1 text-xs text-black bg-white border rounded-md shadow-md group-hover:flex top-12">
            <span>Run</span>
            <span className="px-1 py-0.5  border rounded-md">Ctrl</span>
            <span className="px-2 py-0.5 border rounded-md">'</span>
          </div>
          <div>
            <Play size={18} color="#94515f" weight="fill" />
          </div>
          <span className="text-sm font-semibold">Run</span>
        </button>
        <button
          className="relative flex items-center justify-center gap-1 px-2 py-1 text-green-500 bg-gray-200 group hover:bg-gray-300"
          onClick={submitCode}
        >
          <div className="absolute z-10 items-center hidden gap-2 px-2 py-1 text-xs text-black bg-white border rounded-md shadow-md group-hover:flex top-12">
            <span>Submit</span>
            <span className="px-1 py-0.5  border rounded-md">Ctrl</span>
            <span className="px-1 py-0.5 border rounded-md">Enter</span>
          </div>
          <div>
            <CloudArrowUp size={20} className="text-green-500" />
          </div>
          <span className="text-sm font-semibold">Submit</span>
        </button>
        <TimerSection />
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
      <div className="flex items-center gap-2 md:mr-3 md:gap-2 secondpanel">
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
                  <a
                    href={`/user/${user.username}`}
                    className="flex items-center gap-1"
                  >
                    <User size={18} weight="regular" />
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

function TimerSection() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    let intervalId: any;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startPauseTimer = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const restartTimer = () => {
    setTimer(0);
    setIsRunning(false);
  };

  const formatTime = (time: any) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const displayHours = hours < 10 ? `0${hours}` : hours;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${displayHours}:${displayMinutes}:${displaySeconds}`;
  };
  if (!show)
    return (
      <button
        onClick={() => setShow(!show)}
        className="relative text-gray-600 ml-2 px-2 py-0.5 bg-gray-200 rounded-md hover:bg-gray-200"
      >
        <div className={`flex gap-1 font-semibold}`}>
          <Timer size={20} weight="bold" />
        </div>
      </button>
    );
  return (
    <div className="flex gap-0.5 text-gray-600 ">
      <div className="flex items-center justify-center gap-1 px-2 bg-gray-200">
        <button onClick={() => setShow(!show)}>
          <CaretLeft size={16} />
        </button>
        <button className="ml-1" onClick={startPauseTimer}>
          {isRunning ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
        </button>
        <div>
          <span className="text-sm">{formatTime(timer)}</span>
        </div>
      </div>
      <div className="flex ml-0.5 items-center justify-center px-2 py-1.5 bg-gray-200 rounded-md hover:bg-gray-200">
        <button onClick={restartTimer}>
          <ArrowsClockwise size={20} />
        </button>
      </div>
    </div>
  );
}
