"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/credentials";
import { useRouter } from "next/navigation";
import { solverStore, useStore } from "@/zustand/useStore";
import Solve_EditorSection from "@/components/Solve/Solve_EditorSection";
import TopBar from "@/components/Solve/TopBar";
import { getToken } from "@/helper/tokenhandler";
import Navbar from "@/components/Navbar";

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
  const { question, setQuestion, submissions, setSubmissions, note, setNote } =
    solverStore();
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
    <>
      <div className="flex flex-col items-center justify-center w-full gap-2 px-2 py-2 bg-gray-100 h-fit md:h-screen md:items-start md:flex-row">
        {question && (
          <>
            <Navbar />
            <div className="w-full mt-12 text-sm h-[92vh] overflow-hidden no-scrollbar bg-white border border-gray-300 rounded-lg flex flex-col text-black  md:w-[50%] ">
              <TopBar />
              <div className="h-full overflow-y-auto text-sm no-scrollbar ">
                {children}
              </div>
            </div>
            <Solve_EditorSection
              question={question}
              submissions={submissions}
            />
          </>
        )}
      </div>
    </>
  );
}
