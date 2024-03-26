import Image from "next/image";

export default function () {
  return (
    <section className="min-h-screen p-4 ">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[45%] md:px-8 lg:px-12 px-4 min-h-[95vh] justify-center flex flex-col gap-8 w-full">
          <div className="flex items-center gap-2">
            <div className="w-[50px] h-[0.8px] bg-gray-500 rounded-full"></div>
            <span className="text-sm font-semibold text-gray-500">
              YOUR BEST CHOICE
            </span>
          </div>
          <div>
            <p className="font-sans text-5xl font-semibold sm:text-7xl ">
              Programming in simple words
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              Master Data Structures & Algorithms with Ease: Your One-Stop
              Solution for Problem-Solving in C++
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <a
              className="px-6 relative py-2 font-[450] text-white bg-black rounded-sm"
              href="/problems"
            >
              <div className="absolute border w-[120px] h-[40px] rounded-sm border-t-black border-l-black border-b-gray-500 border-r-gray-500 top-1 left-1"></div>
              Problems
            </a>
            <a
              className="px-6 mt-2 py-2 font-[450] text-sm border border-gray-400 rounded-sm"
              href="/compiler"
            >
              CPP Compiler
            </a>
          </div>
        </div>
        <div className="md:w-[50%] w-full hidden md:flex flex-col relative justify-center items-center">
          <Image
            alt="code"
            loading="lazy"
            width={380}
            height={500}
            className="rounded-md"
            src="/code.png"
          />
          <div className="absolute z-10 p-4 rounded-sm -top-6 right-10 bg-gradient-to-r from-orange-200 to-gray-300 md:right-20 md:top-28">
            <span>DSA Problems</span>
          </div>
          <div className="absolute z-10 p-4 bg-gray-200 border rounded-sm bg-gradient-to-l from-yellow-200 to-gray-300 md:left-20 left-10 -bottom-4 md:bottom-28">
            <span>CPP Compiler</span>
          </div>
        </div>
      </div>
    </section>
  );
}
