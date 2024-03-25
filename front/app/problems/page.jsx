"use client";
import Navbar from "@/components/Navbar";
import Questions from "@/components/questions";

export default function () {
  return (
    <main className="flex flex-col min-h-screen p-0">
      <Navbar />
      <Questions />
    </main>
  );
}
