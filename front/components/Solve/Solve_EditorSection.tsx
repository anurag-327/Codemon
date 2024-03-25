import { API_URL } from "@/credentials";
import { EditorOptions } from "@/helper/Editor";
import { getToken } from "@/helper/tokenhandler";
import { solverStore, useStore } from "@/zustand/useStore";
import Editor from "@monaco-editor/react";
import { useReducer, useRef, useState } from "react";
import {
  ArrowCounterClockwise,
  Bookmark,
  CaretDown,
  CheckSquare,
  Circle,
  CloudArrowUp,
  Code,
  CodeBlock,
  CodeSimple,
  Play,
} from "@phosphor-icons/react/dist/ssr";
interface testState {
  hasError: boolean;
  error: string | null;
  breakPoint: any | null;
  brkptBox: boolean;
  messageBox: boolean;
  message: string;
  passed: boolean;
  loading: boolean;
  result: string | null;
}
interface submitState {
  hasError: boolean;
  error: string | null;
  breakPoint: any | null;
  brkptBox: boolean;
  messageBox: boolean;
  message: string;
  passed: boolean;
  loading: boolean;
  result: string | null;
}
const Solve_EditorSection = ({
  question,
  submissions,
}: {
  question: any;
  submissions: any;
}) => {
  const [userCode, setUserCode] = useState<string>(
    submissions.length > 0 ? submissions[0].code : question.userCode
  );
  const {
    section,
    setSection,
    addNewSubmission,
    setNewSubmissionLoading,
    setNewSubmissionData,
  } = solverStore();
  const editorRef = useRef<number | any>(null);
  const [showTestCase, setSowTestCase] = useState<boolean>(true);
  const [testState, setTestState] = useState<testState>({
    hasError: false,
    error: null,
    breakPoint: {
      testCase: null,
      expectedOutput: null,
      actualOutput: null,
    },
    brkptBox: false,
    messageBox: false,
    message: "",
    passed: false,
    loading: false,
    result: null,
  });
  const [submitState, setSubmitState] = useState<testState>({
    hasError: false,
    error: null,
    breakPoint: {
      testCase: null,
      expectedOutput: null,
      actualOutput: null,
    },
    brkptBox: false,
    messageBox: false,
    message: "",
    passed: false,
    loading: false,
    result: null,
  });
  const token = getToken();
  function handleEditorDidMount(editor: number | any) {
    editorRef.current = editor;
  }
  const resetTest = () => {
    setTestState({
      hasError: false,
      error: null,
      breakPoint: null,
      brkptBox: false,
      messageBox: false,
      message: "",
      passed: false,
      loading: false,
      result: null,
    });
  };
  const resetSubmit = () => {
    setSubmitState({
      hasError: false,
      error: null,
      breakPoint: null,
      brkptBox: false,
      messageBox: false,
      message: "",
      passed: false,
      loading: false,
      result: null,
    });
  };
  async function runBtn() {
    const code = editorRef.current.getValue();
    if (!code) return;
    setSowTestCase(false);
    resetTest();
    setTestState({
      ...testState,
      hasError: false,
      loading: true,
      messageBox: false,
      brkptBox: false,
    });

    let options: any = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code: code, questionId: question._id }),
    };
    let res = await fetch(API_URL + "/api/v1/solve/test", options);
    let data = await res.json();
    if (data.status == 200) {
      // correct answer
      setSowTestCase(true);
      setTestState({
        ...testState,
        loading: false,
        passed: data.passed,
        messageBox: true,
        brkptBox: false,
        message: data.message,
        hasError: data.hasError,
        result: data.result,
      });
    } else if (data.status == 406) {
      // wrong answer
      console.log(data.breakPoint);
      setTestState({
        ...testState,
        loading: false,
        passed: data.passed,
        message: data.message,
        messageBox: true,
        hasError: false,
        breakPoint: data.breakPoint,
        brkptBox: true,
        result: data.result,
      });
    } else if (data.status == 400) {
      // error
      setTestState({
        ...testState,
        loading: false,
        passed: data.passed,
        message: data.message,
        messageBox: true,
        hasError: data.hasError,
        error: data.error,
        brkptBox: false,
        breakPoint: null,
        result: data.result,
      });
    }
  }
  async function submitBtn() {
    const code = editorRef.current.getValue();
    if (!code) return;
    resetSubmit();
    setSection("newSubmission");
    setNewSubmissionLoading(true);
    setSubmitState({
      ...submitState,
      hasError: false,
      loading: true,
      messageBox: false,
      brkptBox: false,
    });

    let options: any = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code: code, questionId: question._id }),
    };
    let res = await fetch(API_URL + "/api/v1/solve/submit", options);
    let data = await res.json();
    if (data.status == 200 || data.status == 406 || data.status == 400) {
      setNewSubmissionData({ ...data, code: code });
      addNewSubmission({
        code: code,
        message: "Accepted Solution",
        isAccepted: true,
        language: "C++",
        createdAt: new Date(Date.now()),
      });
      setNewSubmissionLoading(false);
    } else {
      console.log("Server Error");
      console.log(data);
      // setNewSubmissionLoading(false);
    }
  }
  function RenderSection() {
    if (testState.loading) return <Loader />;
    function MessageBox() {
      return (
        <div className="rounded-md ">
          <span
            className={` ${
              !testState.passed && "text-red-600"
            } text-lg font-[600] ${testState.passed && "text-green-600"}`}
          >
            {testState.message}
          </span>
        </div>
      );
    }
    function BreakpointBox() {
      return (
        <>
          <div className="mt-1 text-sm">
            <div className="flex flex-col gap-1 px-2 py-1 ">
              <span className="font-[500] text-gray-500">Input:</span>
              <div className="px-4 py-2 bg-gray-100 rounded-md">
                <span>{testState.breakPoint.testCase}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 px-2 py-1 ">
              <span className="font-[500] text-gray-500">Actual ouptut:</span>
              <div className="px-4 py-2 bg-gray-100 rounded-md">
                <span>{testState.breakPoint.actualOutput}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 px-2 py-1 ">
              <span className="font-[500] text-gray-500">Expected ouptut:</span>
              <div className="px-4 py-2 bg-gray-100 rounded-md">
                <span>{testState.breakPoint.expectedOutput}</span>
              </div>
            </div>
          </div>
        </>
      );
    }
    function ErrorBox() {
      return (
        <div className="p-2 mt-2 bg-red-100 min-h-[100px] rounded-md">
          <span className="text-sm text-red-600">{testState.error}</span>
        </div>
      );
    }
    return (
      <div className="w-full h-full">
        {testState.messageBox && <MessageBox />}
        {testState.brkptBox && <BreakpointBox />}
        {testState.hasError && <ErrorBox />}
      </div>
    );
  }
  function Header() {
    return (
      <header className="flex flex-col justify-center w-full h-16 gap-2 px-2 py-1 border-b shadow-sm">
        <div className="flex gap-1 text-sm font-semibold">
          <span>
            <Code size={20} color="#54a432" />
          </span>
          <span>Code</span>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center justify-center gap-1 px-2 py-1 text-xs font-light text-gray-800 border rounded-lg hover:bg-gray-100 w-fit">
            <span>C++</span>
            <span>
              <CaretDown size={14} />
            </span>
          </div>
          <div className="flex items-center justify-center gap-1 text-gray-600">
            <button
              onClick={() => {
                setUserCode(question.userCode);
              }}
              title="Reset Code"
            >
              <ArrowCounterClockwise size={16} />
            </button>
            <button title="bookmark">
              <Bookmark size={16} />
            </button>
          </div>
        </div>
      </header>
    );
  }
  function Footer() {
    return (
      <div className="px-2">
        <span className="text-[0.6rem] text-gray-600">
          Submit to save to cloud
        </span>
      </div>
    );
  }
  return (
    <div className="w-full md:flex flex-col hidden gap-2  md:w-[55%] h-[94vh]">
      <div className="md:h-[55%] bg-white overflow-hidden h-[70%] border border-gray-300 rounded-lg">
        <Header />
        <Editor
          height="76%"
          defaultLanguage="c"
          theme="light"
          options={EditorOptions}
          value={userCode}
          onMount={handleEditorDidMount}
          className="mt-1 "
        />
        <Footer />
      </div>
      <div className="relative flex flex-col md:h-[45%] gap-2 px-4 pt-2 pb-2 overflow-auto bg-white border border-gray-300 rounded-lg no-scrollbar">
        {/* Run/submit btn  */}
        <div className="top-0 z-10 flex justify-end w-full gap-1 pb-2 bg-white border-b ">
          <button
            className="flex items-center justify-center gap-1 px-2 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
            onClick={runBtn}
          >
            <Play size={18} color="#94515f" weight="fill" />
            <span className="text-sm font-semibold">Run</span>
          </button>
          <button
            className="flex items-center justify-center gap-1 px-2 py-2 text-green-500 bg-gray-100 rounded-md hover:bg-gray-200"
            onClick={submitBtn}
          >
            <CloudArrowUp size={20} className="text-green-500" />
            <span className="text-sm font-semibold">Submit</span>
          </button>
        </div>
        {/* Header */}
        <div className="flex gap-1">
          <button className="flex hover:bg-gray-100 hover:after:bg-gray-100 p-1 rounded-md after:content[''] after:w-[10px] after:h-[0.5px] after:rotate-90 after:bg-gray-400 items-center justify-center gap-1 text-xs w-fit">
            <CheckSquare className="text-orange-600" size={18} />
            <span className="font-semibold ">TestCase</span>
          </button>
          <button className="flex -ml-2 hover:bg-gray-100 hover:after:bg-gray-100 p-1 rounded-md after:content[''] after:w-[10px] after:h-[0.5px] after:rotate-90 after:bg-gray-400 items-center justify-center gap-1 text-xs w-fit">
            <CodeSimple className="text-gray-500" size={18} />
            <span className="text-gray-500">Test Result</span>
          </button>
        </div>

        {/* Result + Samplecases section*/}
        <div className="mt-2 overflow-auto ">
          <div className="">
            <RenderSection />
          </div>
          {!testState.brkptBox && showTestCase && (
            <SampleCases question={question} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Solve_EditorSection;

function Loader() {
  return (
    <div className="w-full max-h-[180px] py-2 mx-auto bg-white ">
      <div className="flex space-x-2 animate-pulse">
        <div className="flex-1 space-y-2">
          <div className="h-5 w-[20%] rounded bg-slate-200"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-5 col-span-1 bg-gray-200 rounded"></div>
              <div className="h-5 col-span-1 bg-gray-200 rounded"></div>
              <div className="h-5 col-span-1 bg-gray-200 rounded"></div>
            </div>
            <div className="h-5 w-[20%] bg-gray-300 rounded"></div>
            <div className="h-5 bg-gray-300 rounded"></div>
            <div className="h-5 w-[20%] bg-gray-300 rounded"></div>
            <div className="h-5 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SampleCases({ question }: { question: any }) {
  const [selectedCase, setSelectCase] = useState(0);
  console.log(selectedCase);
  return (
    <div className="flex flex-col gap-2 mt-4 overflow-auto no-scrollbar">
      <div className="flex gap-2 text-sm text-black ">
        {question.sampleCases.map((_, index) => (
          <button
            onClick={() => setSelectCase(index)}
            className={`${
              selectedCase == index ? "bg-gray-200" : "bg-gray-100"
            } px-2 py-1  rounded-lg hover:bg-gray-200`}
            key={index + 1}
          >
            <span
              className={`flex items-center gap-2 text-sm font-semibold ${
                selectedCase == index ? "text-green-600" : "text-gray-800"
              }`}
            >
              <Circle size={5} weight="fill" />
              Case {index + 1}
            </span>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <span className="text-sm text-gray-500">Input</span>
          <div className="p-2 bg-gray-100 rounded-md">
            <pre>{question.sampleCases[selectedCase].input}</pre>
          </div>
        </div>
        <div>
          <span className="text-sm text-gray-500">Output</span>
          <div className="p-2 bg-gray-100 rounded-md">
            <pre>{question.sampleCases[selectedCase].expectedOutput}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
