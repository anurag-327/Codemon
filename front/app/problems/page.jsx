"use client";
import Navbar from "@/components/Navbar";
import Questions from "@/components/questions";

export default function () {
  return (
    <main className="flex flex-col min-h-screen p-0">
      <Navbar />
      {/* <Description /> */}
      <Questions />
    </main>
  );
}
function Description() {
  return (
    <div className="p-4 mt-11">
      <div>
        <span className="font-sans text-5xl font-semibold md:text-6xl">
          Unlock the Power of Problem-Solving
        </span>
      </div>
    </div>
  );
}
