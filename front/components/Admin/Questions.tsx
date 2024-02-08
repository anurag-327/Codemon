import { useState, useEffect } from "react";
import { API_URL } from "@/credentials";
import QuestionContainerSkeleton from "../skeleton/questionContainer";
import QuestionCard from "./QuestionCard";
interface question {
  name: string;
  question: string;
  points: number;
  difficultyLevel: Number;
  _id: string;
}

const Questions = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<question[]>([]);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [capacity, setCapacity] = useState<number>(20);
  function pagehandler(i: number) {
    if (i >= 1 && i <= Math.ceil(totalQuestions / capacity) && i != page)
      setPage(i);
  }
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        API_URL + `/api/questions/all?pageSize=${capacity}&pageNumber=${page}`
      );
      const data = await response.json();
      if (response.status === 200 && data.status === 200) {
        setQuestions(data.questions);
        setTotalQuestions(data.totalQuestions);
        setLoading(false);
      } else {
      }
    }
    getData();
  }, [page, capacity]);

  return (
    <div className="w-[100%] md:w-[80%] md:max-w-[800px] mx-auto py-5">
      <h2 className="font-sans text-2xl font-semibold text-gray-600">
        Available Questions
      </h2>
      <div className="flex flex-col items-center justify-center gap-4 mt-4">
        {loading ? (
          <QuestionContainerSkeleton />
        ) : (
          questions.map((data, index) => (
            <QuestionCard key={index} data={data} />
          ))
        )}
      </div>
      <div className="flex flex-col justify-between w-full gap-2 px-2 mt-8 md:flex-row ">
        <div className="flex flex-wrap justify-center w-full gap-2 ">
          <span
            onClick={() => pagehandler(page - 1)}
            className="px-3 py-1 text-xs border rounded-md cursor-pointer"
          >
            Prev
          </span>
          {[...Array(Math.ceil(totalQuestions / capacity))].map((_, i) => {
            return (
              <span
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`${
                  page == i + 1 && "bg-gray-200"
                } px-3 text-xs py-1 border cursor-pointer rounded-md`}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => pagehandler(page + 1)}
            className="px-3 py-1 text-xs border rounded-md cursor-pointer"
          >
            Next
          </span>
        </div>
        <select
          className="px-2 mx-auto text-xs border rounded-md outline-none resize-none w-fit"
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
        >
          <option value={20}>20 entries/page</option>
          <option value={30}>30 entries/page</option>
          <option value={50}>50 entries/page</option>
        </select>
      </div>
      {/* <QuestionTable questions={questions}/> */}
    </div>
  );
};

export default Questions;
