import { Fire } from "phosphor-react";
interface question {
  _id: string;
  name: string;
  question: string;
  difficultyLevel: Number;
  points: number;
}
const QuestionCard = ({ data }: { data: question }) => {
  return (
    <a
      href={`/admin/question/${data._id}`}
      className="w-full   flex mx-auto justify-between items-center shadow-sm  border border-gray-200 hover:border-gray-300 rounded-md  px-2 py-3  md:w-[90%] md:min-w-[600px]"
    >
      <div className="text-sm overflow-hidden text-gray-600 w-[70%] sm:w-[45%]">
        {data.name}
      </div>
    </a>
  );
};

export default QuestionCard;
