"use client";
const Guide = () => {
  return (
    <div className=" w-full md:w-[55%] md:overflow-auto no-scrollbar h-screen max-w-4xl bg-white rounded-md">
      <div className="container p-4 mx-auto bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold">
          Creating a New Question Guide
        </h1>

        <div className="mb-4">
          <h2 className="mb-2 text-xl font-semibold">
            Step 1: Access the Question Creation Form
          </h2>
          <p>
            Navigate to the question creation page on the platform. Look for the
            "Create New Question" button or a similar option.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="mb-2 text-xl font-semibold">
            Step 2: Question Details
          </h2>
          <dl className="grid grid-cols-1 ml-6 md:grid-cols-1 gap-x-4 gap-y-2">
            <div className="mb-2">
              <dt className="font-semibold">Question Title:</dt>
              <dd>
                Input for the title or prompt of the question. Example:
                "Calculate the Sum of Two Numbers."
              </dd>
            </div>
            <div className="mb-2">
              <dt className="font-semibold">Question Name:</dt>
              <dd>
                Short name or identifier for the question. Example:
                "sum_of_two_numbers."
              </dd>
            </div>
            <div className="mb-2">
              <dt className="font-semibold">Description:</dt>
              <dd>
                Detailed description of the question, including any additional
                instructions or context. Example: "Write a function that takes
                two numbers as input and returns their sum. Consider edge cases
                and provide a brief explanation of your approach."
              </dd>
            </div>
          </dl>
        </div>

        <div className="mb-4">
          <h2 className="mb-2 text-xl font-semibold">Step 3: Sample Cases</h2>
          <p>
            Add sample test cases to illustrate input, expected output, and a
            description of each case.
          </p>
          <div className="ml-4">
            <ul className="pl-4 list-disc">
              <li>
                <strong>Input:</strong> The input values for the test case.
              </li>
              <li>
                <strong>Expected Output:</strong> The expected output for the
                given input.
              </li>
              <li>
                <strong>Description:</strong> A brief description or explanation
                of the test case.
              </li>
            </ul>
            <p className="mt-2">Example:</p>
            <div className="p-2 bg-gray-200 rounded">
              <p className="">
                Sample Case 1: Input: 3, 5 Expected Output: 8 Description: The
                sum of 3 and 5 is 8.
              </p>
              <p className="">
                Sample Case 2: Input: -2, 7 Expected Output: 5 Description: The
                sum of -2 and 7 is 5.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="mb-2 text-xl font-semibold">
            Step 4: Points and Difficulty Level
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <div className="mb-2">
              <dt className="font-semibold">Points:</dt>
              <dd>
                Numeric value indicating the points assigned to the question.
                Example: 50 points.
              </dd>
            </div>
            <div className="mb-2">
              <dt className="font-semibold">Difficulty Level:</dt>
              <dd>
                Selection for the difficulty level of the question. Options:
                Easy, Medium, Hard. Example: Medium.
              </dd>
            </div>
          </dl>
        </div>

        <div className="mb-4">
          <h2 className="mb-2 text-xl font-semibold">
            Step 5: Default and User Code
          </h2>
          <div className="mb-2">
            <dt className="font-semibold">Default Code:</dt>
            <dd>
              Code provided as a starting point for the question. Example:
              JavaScript function template.
            </dd>
          </div>
          <div className="mb-2">
            <dt className="font-semibold">User Code:</dt>
            <dd>
              Area for users to input their code solution. Example: Users will
              write a function to calculate the sum of two numbers.
            </dd>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="mb-2 text-xl font-semibold">Step 6: Save or Submit</h2>
          <p>
            Click the "Save" or "Submit" button to save the question. Ensure
            that all required fields are filled, and the question details are
            accurate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Guide;
