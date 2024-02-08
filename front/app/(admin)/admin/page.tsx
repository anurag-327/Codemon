"use client";
import Questions from "@/components/Admin/Questions";
import React from "react";

const page = () => {
  return (
    <div className="w-full min-h-screen p-4 mt-12">
      <div>
        <a
          className="p-2 bg-gray-100 border rounded-md hover:bg-gray-200"
          href="/admin/add-question"
        >
          Add new Question
        </a>
      </div>
      <Questions />
    </div>
  );
};

export default page;
