import { Fire } from "phosphor-react";
interface question {
  name: string;
  question: string;
  difficultyLevel: Number;
  points: number;
}
const QuestionContainer = ({ data }: { data: question }) => {
  return (
    <a
      href={`solve/${data.question}`}
      className="w-full   flex mx-auto justify-between items-center shadow-sm  border border-gray-200 hover:border-gray-300 rounded-md  px-2 py-3  md:w-[90%] md:min-w-[600px]"
    >
      <div className="text-sm overflow-hidden text-gray-600 w-[70%] sm:w-[45%]">
        {data.name}
      </div>
      <div
        className={`text-[0.6rem] px-3 py-2 w-[15%] text-center hidden  sm:flex justify-center rounded-full text-gray-600 ${
          data.difficultyLevel == 1 && "bg-orange-200"
        } ${data.difficultyLevel == 2 && "bg-gray-200"} ${
          data.difficultyLevel == 3 && "bg-red-300"
        }`}
      >
        {data.difficultyLevel == 1 && "Easy"}
        {data.difficultyLevel == 2 && "Medium"}
        {data.difficultyLevel == 3 && "Hard"}
      </div>

      <div className="text-[0.7rem]  flex  w-[30%] sm:w-[15%] justify-center items-center text-gray-600">
        <div className="w-[80%] px-2 py-1  bg-yellow-100 rounded-full flex justify-center items-center">
          <Fire size={20} color="#FFEB2A" weight="fill" />
          {data.points}
        </div>
      </div>
      <div className="text-[0.7rem] hidden  w-[20%] px-2 py-1  rounded-full md:inline-flex justify-center items-center text-gray-600">
        {data.difficultyLevel === 1 && "10 mins"}
        {data.difficultyLevel === 2 && "20 mins"}
        {data.difficultyLevel === 3 && "35 mins"}
      </div>
    </a>
  );
};

export default QuestionContainer;
