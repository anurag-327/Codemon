"use client";
interface testCase {
  questionId: string;
  input: string;
  expectedOutput: string;
}
const DisplayTestCases = ({ testCases }: { testCases: testCase[] }) => {
  return (
    <div className="w-full max-w-3xl px-4 py-2 pb-20 min-h-[200px]">
      <div>
        <h2 className="text-xl font-semibold ">TestCases:</h2>
      </div>
      <div className="w-full mt-4 text-center">
        {testCases.length == 0 && <p>No TestCase Found</p>}
      </div>
      <div>
        <ul>
          {testCases.map((testCase, index) => (
            <li
              key={index}
              className="p-2 mb-4 border border-gray-300 rounded-md"
            >
              <strong className="block text-blue-500">Input:</strong>
              <pre className="w-full ml-2 overflow-scroll no-scrollbar">
                {testCase.input}
              </pre>
              <strong className="block mt-2 text-green-500">
                Expected Output:
              </strong>
              <pre className="ml-2">{testCase.expectedOutput}</pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DisplayTestCases;
