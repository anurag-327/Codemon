import { Fire, Timer } from "phosphor-react";
import { useState, useEffect } from "react";
import QuestionContainer from "./questionContainer";
import QuestionTable from "./questionTable";
import QuestionContainerSkeleton from "./skeleton/questionContainer";
import { API_URL } from "@/credentials";
import Table from "./Ui/Table";
import Pagination from "./Ui/Pagination";
interface question {
  name: string;
  question: string;
  points: number;
  difficultyLevel: number;
  _id: string;
}
interface columns {
  header: String;
  key: String;
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
  const columns = [
    {
      header: "name",
      key: "name",
    },
    {
      header: "Difficulty",
      key: "difficulty",
    },
    {
      header: "Points",
      key: "points",
    },
  ];
  useEffect(() => {
    async function getData() {
      setLoading(true);
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
    <div className="w-[100%] mt-20 md:w-[80%] md:max-w-[800px] mx-auto p-5">
      <div className="flex flex-col items-center justify-center w-full gap-4 mt-8">
        {loading ? (
          <QuestionContainerSkeleton />
        ) : (
          <Table title="Problems" data={questions} columns={columns} />
        )}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        capacity={capacity}
        setCapacity={setCapacity}
        total={totalQuestions}
        display={false}
      />
    </div>
  );
};

export default Questions;
