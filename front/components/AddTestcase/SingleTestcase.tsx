"use client";
import { API_URL } from "@/credentials";
import { getToken } from "@/helper/tokenhandler";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
interface TestCase {
  questionId: string;
  input: string;
  expectedOutput: string;
}
const SingleTestcase = ({
  questionId,
  testCases,
  setTestCases,
}: {
  questionId: string;
  testCases: TestCase[];
  setTestCases: Dispatch<SetStateAction<TestCase[]>>;
}) => {
  const [testCase, setTestCase] = useState({ input: "", expectedOutput: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handleInputChange = (key: string, value: string) => {
    setTestCase({ ...testCase, [key]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    setLoading(true);
    setError("");
    const options = {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ ...testCase, questionId }),
    };
    const response = await fetch(
      API_URL + "/api/testcase/add-testcase",
      options
    );
    const data = await response.json();
    if (data.status == 201) {
      setLoading(false);
      //add to testcase
      setTestCases([...testCases, data.testCase]);
    } else {
      setLoading(false);
      setError(data.message);
    }
  };

  return (
    <div className="w-full md:w-[45%] md:h-screen md:overflow-auto p-6 mt-6 mx-auto bg-white rounded ">
      <h1 className="mb-4 text-2xl font-bold">Add Test Case</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid w-full grid-cols-1 mb-4 gap-x-4 gap-y-2">
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Input:
              <textarea
                className="block w-full min-h-[200px] mb-2 text-sm font-normal p-1 text-gray-700 border border-gray-300 rounded-md outline-none"
                name="input"
                autoCorrect="false"
                value={testCase.input}
                onChange={(e) => handleInputChange("input", e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Expected Output:
              <textarea
                className="block w-full min-h-[200px] mb-2 p-1 text-sm font-normal  text-gray-700 border border-gray-300 rounded-md outline-none"
                name="expectedOutput"
                autoCorrect="false"
                value={testCase.expectedOutput}
                onChange={(e) =>
                  handleInputChange("expectedOutput", e.target.value)
                }
                required
              />
            </label>
          </div>
        </div>

        <div className="mt-4">
          <button
            disabled={loading}
            type="submit"
            className={`px-4 py-2 ${
              loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-700"
            } font-bold text-white  rounded `}
          >
            {loading ? "Adding" : "Add Test Case"}
          </button>
        </div>
        {error && <div className="p-2 mt-4 bg-red-300 rounded-md">{error}</div>}
      </form>
    </div>
  );
};

export default SingleTestcase;
