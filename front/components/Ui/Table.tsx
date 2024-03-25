import { useRouter } from "next/navigation";
import Loader from "../Loader";
interface question {
  name: string;
  question: string;
  points: number;
  difficultyLevel: number;
  _id: string;
}
interface columns {
  header: String;
  key: String;
}
export default function ({
  title,
  data,
  columns,
}: {
  title: String;
  data: question[];
  columns: columns[];
}) {
  const label = [null, "Easy", "Medium", "Hard"];
  const router = useRouter();
  return (
    <>
      {/* Table Section */}
      <div className="w-full mx-auto">
        {/* Card */}
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700">
                {/* Header */}
                <div className="grid gap-3 px-6 py-4 border-b border-gray-200 md:flex md:justify-between md:items-center dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {title}
                  </h2>
                </div>
                {/* End Header */}
                {/* Table */}
                {data ? (
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-slate-900">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-start">
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase dark:text-gray-200">
                              Id
                            </span>
                          </div>
                        </th>
                        {columns.map((column, index) => (
                          <th
                            key={index}
                            scope="col"
                            className="px-6 py-3 text-start"
                          >
                            <div className="flex items-center gap-x-2">
                              <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase dark:text-gray-200">
                                {column.header}
                              </span>
                            </div>
                          </th>
                        ))}
                        <th scope="col" className="px-6 py-3 text-end" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {data.map((question: question, index) => (
                        <tr key={question["_id"]}>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {index + 1}
                              </span>
                            </div>
                          </td>
                          <td className="w-full size-px whitespace-nowrap">
                            <a
                              href={`/solve/${question.question}`}
                              className="w-full px-6 py-3"
                            >
                              <span className="text-sm text-blue-600 underline dark:text-gray-400">
                                {question.name}
                              </span>
                            </a>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {label[question.difficultyLevel]}
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {question.points}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <Loader />
                )}
                {/* End Table */}
                {/* Footer */}
                <div className="grid gap-3 px-6 py-4 border-t border-gray-200 md:flex md:justify-between md:items-center dark:border-gray-700">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {data.length}
                      </span>{" "}
                      results
                    </p>
                  </div>
                </div>
                {/* End Footer */}
              </div>
            </div>
          </div>
        </div>
        {/* End Card */}
      </div>
      {/* End Table Section */}
    </>
  );
}
