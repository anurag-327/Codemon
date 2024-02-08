"use client";
import { useRouter } from "next/navigation";
import { solverStore, useStore } from "@/zustand/useStore";
import Solve_QuestionSection from "@/components/Solve/Solve_QuestionSection";
import Editorial from "@/components/Solve/Editorial";
import Submissions from "@/components/Solve/Submissions";
import Notes from "@/components/Solve/Notes";
import NewSubmission from "@/components/Solve/NewSubmission";

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

export default function Page({ params }: { params: slug }) {
  const router = useRouter();
  const { question: question, section } = solverStore();
  const page = params.slug[1] || "description";
  function render() {
    switch (section) {
      case "description":
        return <Solve_QuestionSection question={question} />;
      case "editorial":
        return <Editorial />;
      case "submissions":
        return <Submissions />;
      case "notes":
        return <Notes />;
      case "newSubmission":
        return <NewSubmission />;
      default:
        return <Solve_QuestionSection question={question} />;
    }
  }
  return <>{render()}</>;
}
