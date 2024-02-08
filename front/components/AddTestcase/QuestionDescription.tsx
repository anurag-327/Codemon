"use client";
import React from "react";
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

const QuestionDescription = ({ question }: { question: question }) => {
  return (
    <div className="flex flex-col px-4 py-2 mt-6 bg-white rounded-md">
      <h2 className="text-3xl font-[500]">{question.name}</h2>
      <div className="flex gap-2 mt-2">
        <div className="px-2 py-0.5 text-[0.6rem] text-center text-blue-600 bg-gray-100 rounded-full w-fit ">
          {question.difficultyLevel == 1 && "Easy"}
          {question.difficultyLevel == 2 && "Medium"}
          {question.difficultyLevel == 3 && "Hard"}
        </div>
        <div className="px-3 py-0.5 text-[0.6rem] text-center text-gray-800 bg-gray-100 rounded-full w-fit">
          <span> {question.points.toString()} Points</span>
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-4 ">
        <div
          className="text-gray-700 "
          dangerouslySetInnerHTML={{ __html: question.description }}
        />
      </div>
      <div className="mt-2">
        {question.sampleCases.map((data: any, index: number) => (
          <div
            key={index}
            className="flex flex-col w-full gap-1 mt-4 overflow-hidden text-gray-800"
          >
            <span className="font-semibold ">Example : {index + 1}</span>
            <div className="px-2 my-2 ml-4 border-l-2 border-gray-400">
              <div className="flex gap-1">
                <span className="font-semibold ">Input:</span>
                <div>
                  <pre>{data.input}</pre>
                </div>
              </div>
              <div className="flex gap-1">
                <span className="font-semibold">Output:</span>
                <div>
                  <pre>{data.expectedOutput}</pre>
                </div>
              </div>
              {data.description && (
                <div className="flex gap-1">
                  <span className="font-semibold">Explanation:</span>
                  <p>{data.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionDescription;
