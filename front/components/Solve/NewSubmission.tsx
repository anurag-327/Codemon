import { ReadOnlyEditorOptions } from "@/helper/Editor";
import { solverStore, useStore } from "@/zustand/useStore";
import { Editor } from "@monaco-editor/react";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

const NewSubmission = () => {
  const {
    question,
    section,
    setSection,
    submissions,
    setSubmissions,
    addNewSubmission,
    newSubmissionLoading,
    setNewSubmissionLoading,
    newSubmissionData,
    setNewSubmissionData,
  } = solverStore();

  const { user } = useStore();
  return (
    <div className="px-2 py-2 ">
      <div className="text-gray-500 border-b py-1 flex gap-1 items-center font-[400]">
        <button
          className="flex gap-1"
          onClick={() => {
            setSection("submissions");
            setNewSubmissionData(null);
          }}
        >
          <span>
            <ArrowLeft size={16} />
          </span>
          <span>All Submissions</span>{" "}
        </button>
      </div>
      {newSubmissionLoading ? (
        <div className="w-full p-2">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="flex flex-col py-2 mt-4 border-b">
            <div className="">
              <div className="flex gap-2">
                <span
                  className={` ${
                    !newSubmissionData.passed && "text-red-600"
                  } text-2xl font-[600] ${
                    newSubmissionData.passed && "text-green-600"
                  }`}
                >
                  {newSubmissionData.message}
                </span>
                {!newSubmissionData.hasError && (
                  <div className="mt-2 text-xs text-gray-400">
                    {newSubmissionData.successfullyPassed}/
                    {newSubmissionData.totalTestcases} Test cases passed
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[0.8rem]  font-[600]">{user.name}</span>
                <span className="text-[0.8rem]  font-light text-gray-500">
                  {formattedTime()}
                </span>
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <span className="text-[0.7rem] leading-tight font-light text-gray-500">
                  submitted a sec ago
                </span>
                <span className="text-[0.7rem] leading-tight  font-[500] text-blue-500">
                  {newSubmissionData.points}/{question.points} Points Obtained
                </span>
              </div>
            </div>
          </div>
          {newSubmissionData.status == 406 && (
            <div className="mt-1 text-sm">
              <div className="flex flex-col gap-1 px-2 py-1 ">
                <span className="font-[500] text-gray-500">Input:</span>
                <div className="px-4 py-2 bg-gray-100 rounded-md">
                  <span>{newSubmissionData.breakPoint.testCase}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 px-2 py-1 ">
                <span className="font-[500] text-gray-500">Actual ouptut:</span>
                <div className="px-4 py-2 bg-gray-100 rounded-md">
                  <span>{newSubmissionData.breakPoint.actualOutput}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 px-2 py-1 ">
                <span className="font-[500] text-gray-500">
                  Expected ouptut:
                </span>
                <div className="px-4 py-2 bg-gray-100 rounded-md">
                  <span>{newSubmissionData.breakPoint.expectedOutput}</span>
                </div>
              </div>
            </div>
          )}
          {newSubmissionData.hasError && (
            <div className="p-2 mt-2 bg-red-100 min-h-[100px] rounded-md">
              <span className="text-sm text-red-600">
                {newSubmissionData.error}
              </span>
            </div>
          )}
          <div className="mt-6 ">
            <div className="flex items-center gap-3 text-gray-400">
              <div>
                <span className=" font-[500]">Code</span>
              </div>
              <div className="relative">
                <span className=" font-[500] before:top-[4px] before:bg-gray-400 before:absolute before:w-[0.6px] before:h-[15px] before:left-[-6px] before:transform before:-translate-x-1/2">
                  C++
                </span>
              </div>
            </div>
            <div className="mt-1 h-[200px] bg-gray-100 overflow-auto border rounded-md ">
              <Editor
                height="100%"
                width="100%"
                options={ReadOnlyEditorOptions}
                defaultLanguage="c"
                defaultValue={newSubmissionData.code}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewSubmission;

function Loader() {
  return (
    <div className="flex flex-col gap-2 mt-1 animate-pulse">
      <div className="flex gap-2 ">
        <div className="w-8/12 h-6 bg-gray-200 rounded-md"></div>
        <div className="w-1/3 h-6 bg-gray-200 rounded-md"></div>
      </div>
      <div className="flex gap-2 ">
        <div className="w-1/3 h-6 bg-gray-200 rounded-md"></div>
        <div className="w-8/12 h-6 bg-gray-200 rounded-md"></div>
      </div>
      <div className="w-full h-6 bg-gray-200 rounded-md"></div>
    </div>
  );
}

function formattedTime() {
  const dateObject = new Date(Date.now());
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = dateObject.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  return `submitted at ${formattedDate} ${formattedTime}`;
}
