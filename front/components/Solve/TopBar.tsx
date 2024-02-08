import { solverStore } from "@/zustand/useStore";
import {
  BookOpenText,
  ClockCounterClockwise,
  FileText,
  Note,
} from "@phosphor-icons/react/dist/ssr";
import { Dispatch, SetStateAction } from "react";
const TopBar = () => {
  const { section, setSection } = solverStore();
  return (
    <header className="flex w-full px-2 py-1 overflow-x-auto text-sm bg-white border-b rounded-t-lg no-scrollbar">
      <button
        onClick={() => setSection("description")}
        className="px-2 py-1 rounded-md hover:bg-gray-100"
      >
        <div
          className={`flex gap-1 ${
            section == "description" && "font-semibold"
          }`}
        >
          <FileText size={18} color="#793fe4" />
          Description
        </div>
      </button>
      <button
        onClick={() => setSection("editorial")}
        className=" relative before:block before:top-[6px] before:bg-gray-400 before:absolute before:w-[0.6px] before:h-[15px] before:right-[2px] before:left-[-1px] hover:before:hidden before:transform before:-translate-x-1/2 px-2 py-1 rounded-md hover:bg-gray-100"
      >
        <div
          className={`flex gap-1 ${section == "editorial" && "font-semibold"}`}
        >
          <BookOpenText size={18} color="#a0e184" />
          Editorial
        </div>
      </button>
      <button
        onClick={() => setSection("submissions")}
        className=" relative before:block before:top-[6px] before:bg-gray-400 before:absolute before:w-[1px] before:h-[15px] before:right-[2px] before:left-[-1px] hover:before:hidden before:transform before:-translate-x-1/2 px-2 py-1 rounded-md hover:bg-gray-100"
      >
        <div
          className={`flex gap-1 ${
            section == "submissions" && "font-semibold"
          }`}
        >
          <ClockCounterClockwise size={18} color="#793fe4" />
          Submissions
        </div>
      </button>
      <button
        onClick={() => setSection("notes")}
        className=" relative before:block before:top-[6px] before:bg-gray-400 before:absolute before:w-[0.6px] before:h-[15px] before:right-[2px] before:left-[-1px] hover:before:hidden before:transform before:-translate-x-1/2 px-2 py-1 rounded-md hover:bg-gray-100"
      >
        <div className={`flex gap-1 ${section == "notes" && "font-semibold"}`}>
          <Note size={18} color="#a0e184" />
          Notes
        </div>
      </button>
    </header>
  );
};

export default TopBar;
