import { API_URL } from "@/credentials";
import { EditorOptions } from "@/helper/Editor";
import { getToken } from "@/helper/tokenhandler";
import { solverStore, useStore } from "@/zustand/useStore";
import Editor from "@monaco-editor/react";
import {
  ArrowCounterClockwise,
  Bookmark,
  CaretDown,
  CloudArrowUp,
  Code,
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
import { useRef, useState } from "react";
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
  function renderSection() {
    return (
      <div className="w-full h-full min-h-[200px] ">
        {testState.loading && <Loader />}
        {testState.messageBox && (
          <div className="px-2 py-1 mt-1 rounded-md">
            <span
              className={` ${
                !testState.passed && "text-red-500"
              } text-xl font-[600] ${testState.passed && "text-green-600"}`}
            >
              {testState.message}
            </span>
          </div>
        )}
        {/* {showTestCase && <SampleCases sampleCases={question.sampleCases} />} */}
        {testState.brkptBox && (
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
        )}
        {testState.hasError && (
          <div className="p-2 mt-2 bg-red-100 min-h-[100px] rounded-md">
            <span className="text-sm text-red-600">{testState.error}</span>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="w-full mt-12 md:flex flex-col hidden gap-2  md:w-[55%] h-[92vh]">
      <div className="md:h-[70%] bg-white overflow-hidden h-[60%] border border-gray-300 rounded-lg">
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
        <Editor
          height="78%"
          defaultLanguage="c"
          theme="light"
          options={EditorOptions}
          value={userCode}
          onMount={handleEditorDidMount}
          className="mt-1 "
        />
        <div className="px-2">
          <span className="text-[0.6rem] text-gray-600">
            Submit to save to cloud
          </span>
        </div>
      </div>
      <div className="relative p-2 bg-white border border-gray-300 rounded-lg">
        <div className="top-0 z-10 flex justify-end w-full gap-2 py-2 pr-8 bg-white border-b ">
          <button
            className="flex items-center justify-center gap-1 px-2 py-1 bg-gray-100 rounded-sm hover:bg-gray-200"
            onClick={runBtn}
          >
            <Play size={18} color="#94515f" weight="fill" />
            <span className="text-sm font-semibold">Run</span>
          </button>
          <button
            className="flex items-center justify-center gap-1 px-2 py-1 text-green-700 bg-gray-100 rounded-sm hover:bg-gray-200"
            onClick={submitBtn}
          >
            <CloudArrowUp size={20} color="#94515f" />
            <span className="text-sm font-semibold">Submit</span>
          </button>
        </div>
        <div className="h-full overflow-auto no-scrollbar">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default Solve_EditorSection;

function Loader() {
  return (
    <div className="w-full p-4 mx-auto mt-4 bg-white border rounded-md loader">
      <div className="flex space-x-4 animate-pulse">
        <div className="flex-1 py-1 space-y-6">
          <div className="h-2 rounded bg-slate-300"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 col-span-2 rounded bg-slate-300"></div>
              <div className="h-2 col-span-1 rounded bg-slate-300"></div>
            </div>
            <div className="h-2 rounded bg-slate-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SampleCases({ sampleCases }: { sampleCases: any }) {
  return <div>{JSON.stringify(sampleCases)}</div>;
}
