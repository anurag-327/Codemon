"use client";
import DisplayTestCases from "@/components/AddQuestion/DisplayTestCases";
import QuestionDescription from "@/components/AddTestcase/QuestionDescription";
import SingleTestcase from "@/components/AddTestcase/SingleTestcase";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { API_URL } from "@/credentials";
import { getToken } from "@/helper/tokenhandler";
import { useStore } from "@/zustand/useStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface params {
  slug: string[];
}
interface TestCase {
  questionId: string;
  input: string;
  expectedOutput: string;
}
const page = ({ params }: { params: params }) => {
  const router = useRouter();
  const { user, setUser } = useStore();
  const [question, setQuestion] = useState(null);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [error, setError] = useState(true);
  async function getQuestion() {
    const options = {
      method: "get",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    };
    const response = await fetch(
      API_URL + `/api/questions/questionById/${params.slug[0]}`,
      options
    );
    const data = await response.json();
    if (data.status === 200) {
      setQuestion(data.question);
      setTestCases(data.testCases);
    } else if (data.status == 404 || data.status == 400) {
      setError(true);
    } else {
      router.push("/error");
    }
  }
  useEffect(() => {
    if (user) {
      if (user.role != "admin") router.push("/error");
      getQuestion();
    } else {
      router.push("/login");
    }
  }, []);
  return (
    <main className="w-full bg-gray-100 md:h-screen no-scrollbar">
      <Navbar />
      <div className="flex flex-col items-center w-full h-full gap-4 px-4 py-2 mt-12 no-scrollbar md:flex-row">
        <div className="flex flex-col pb-20 no-scrollbar items-center gap-4 w-full md:w-[55%] overflow-auto md:h-screen mt-6 bg-white  ">
          {question ? (
            <>
              <QuestionDescription question={question} />
              <DisplayTestCases testCases={testCases} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Loader />
              <span>Fetching data...</span>
            </div>
          )}
        </div>
        <SingleTestcase
          questionId={params.slug[0]}
          testCases={testCases}
          setTestCases={setTestCases}
        />
      </div>
    </main>
  );
};

export default page;
