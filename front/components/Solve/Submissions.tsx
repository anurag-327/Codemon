import { solverStore, useStore } from "@/zustand/useStore";
import { Editor } from "@monaco-editor/react";
import { CodeBlock, CopyBlock, github } from "react-code-blocks";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Dispatch, useState } from "react";
import { EditorOptions, ReadOnlyEditorOptions } from "@/helper/Editor";

const Submissions = () => {
  const { submissions } = solverStore();
  const [submission, setSubmission] = useState<any>(null);
  if (submission)
    return <Submission setSubmission={setSubmission} data={submission} />;
  return (
    <div className="flex flex-col px-2 py-2">
      <div className="text-gray-500 py-1 border-b flex gap-1 items-center font-[400]">
        <span>Recent submissions</span>{" "}
        <span>
          <ArrowRight size={16} />
        </span>
      </div>
      {submissions.length == 0 ? (
        <div className="w-full mt-2 text-center text-gray-600">No Data</div>
      ) : (
        <div className="flex flex-col items-start w-full mt-4 even:bg-gray-50">
          {submissions.map((data: any, index: number) => (
            <Card
              data={data}
              setSubmission={setSubmission}
              key={index}
              index={index + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

function Submission({
  data,
  setSubmission,
}: {
  data: any;
  setSubmission: Dispatch<any>;
}) {
  const { user } = useStore();
  return (
    <div className="px-2 py-2 ">
      <div className="text-gray-500 border-b py-1 flex gap-1 items-center font-[400]">
        <button className="flex gap-1" onClick={() => setSubmission(null)}>
          <span>
            <ArrowLeft size={16} />
          </span>
          <span>All Submissions</span>{" "}
        </button>
      </div>
      <div className="flex flex-col py-2 mt-4 border-b">
        <div className="">
          <span
            className={` ${
              !data.isAccepted && "text-red-600"
            } text-2xl font-[600] ${data.isAccepted && "text-green-600"}`}
          >
            {data.message}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-[0.8rem]  font-[600]">{user.name}</span>
            <span className="text-[0.8rem]  font-light text-gray-500">
              {formattedTime(data.createdAt)}
            </span>
          </div>
          <span className="text-[0.7rem] leading-tight font-light text-gray-500">
            submitted {timeAgo(data.createdAt)}
          </span>
        </div>
      </div>
      <div className="mt-6 ">
        <div className="flex items-center gap-3 text-gray-400">
          <div>
            <span className=" font-[500]">Code</span>
          </div>
          <div className="relative">
            <span className=" font-[500] before:top-[4px] before:bg-gray-400 before:absolute before:w-[0.6px] before:h-[15px] before:left-[-6px] before:transform before:-translate-x-1/2">
              {data.language}
            </span>
          </div>
        </div>
        <div className="mt-1 h-[300px] bg-gray-100 overflow-auto border rounded-md ">
          <Editor
            height="100%"
            width="100%"
            options={ReadOnlyEditorOptions}
            defaultLanguage="c"
            defaultValue={data.code}
          />
        </div>
      </div>
    </div>
  );
}

function Card({
  data,
  index,
  setSubmission,
}: {
  data: any;
  index: number;
  setSubmission: Dispatch<any>;
}) {
  return (
    <button
      onClick={() => setSubmission(data)}
      className={`${
        index % 2 == 0 ? "bg-gray-100" : "bg-white"
      } flex flex-row items-center w-full gap-4 px-2 py-1 overflow-auto`}
    >
      <div className="flex flex-col w-[150px] text-start">
        <span
          className={` ${!data.isAccepted && "text-red-600"} font-[600] ${
            data.isAccepted && "text-green-600"
          }`}
        >
          {data.message}
        </span>
        <span className="text-[0.8rem] text-gray-500">
          {timeAgo(data.createdAt)}
        </span>
      </div>
      <div className="flex flex-col px-3 bg-gray-200 rounded-full">
        <span className="text-[0.6rem] text-gray-500 text-start">
          {data.language}
        </span>
      </div>
    </button>
  );
}
export default Submissions;

function timeAgo(timestamp: any) {
  const currentDate: Date = new Date();
  const providedDate: Date = new Date(timestamp);
  const timeDifference: number = currentDate.getTime() - providedDate.getTime();
  const seconds: number = Math.floor(timeDifference / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);
  if (seconds < 60) {
    return seconds + (seconds === 1 ? " second ago" : " seconds ago");
  } else if (minutes < 60) {
    return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
  } else if (hours < 24) {
    return hours + (hours === 1 ? " hour ago" : " hours ago");
  } else {
    return days + (days === 1 ? " day ago" : " days ago");
  }
}

function formattedTime(timestamp: string) {
  const dateObject = new Date(timestamp);
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
