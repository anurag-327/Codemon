"use client";
import QuestionForm from "@/components/AddQuestion/QuestionForm";
import Guide from "@/components/AddQuestion/Guide";
const page = () => {
  return (
    <main className="w-full h-screen bg-gray-100 no-scrollbar">
      <div className="flex flex-col w-full h-full gap-4 px-4 py-2 mt-12 no-scrollbar md:flex-row">
        <Guide />
        <QuestionForm />
      </div>
    </main>
  );
};

export default page;
