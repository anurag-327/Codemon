const { exec } = require("child_process");
const questionSchema = require("../model/question");
const testcaseSchema = require("../model/testcases");
const User = require("../model/user");
const path = require("path");
const fs = require("fs");
const { generateFileName } = require("../utils/genrateFilename");
const submissionSchema = require("../model/submission");

// testing for sample cases
module.exports.testCode = async (req, res) => {
  try {
    const questionId = req.body.questionId;
    let userCode = req.body.code;

    // checks if question Name mentioned with request
    if (!questionId) {
      return res
        .status(400)
        .json({ status: 400, message: "Missing question name/id" });
    }
    // checks if any code exists
    if (!userCode) {
      return res.status(400).json({ status: 400, message: "Code Missing" });
    }
    // checks if question exists
    const questionData = await questionSchema.findById(questionId);
    if (!questionData)
      return res
        .status(404)
        .json({ status: 400, message: "Question Not found" });
    const testCases = questionData.sampleCases;
    if (testCases.length == 0)
      return res
        .status(404)
        .json({ status: 400, message: "Could Not get test cases" });
    const fileName = generateFileName(req.user._id);
    const inputFileName = fileName + "_" + "input";
    const codeFileName = fileName + "_" + "code";
    const ipCode = `void ip()
        {
            freopen("./code/${inputFileName}.txt","r",stdin);  
        }`;
    const code = `${questionData.defaultCode}\n${ipCode}\n${userCode}`;
    fs.writeFileSync(
      path.join(process.cwd(), `./code/${codeFileName}.cpp`),
      code
    );
    // creating exe file
    const executionResult = await checkExeFile(
      req,
      res,
      fileName,
      codeFileName
    );
    if (executionResult == true) {
      const finalResult = await runTests(req, res, fileName, testCases);
      if (!finalResult.passed) {
        deleteFiles(fileName);
        return res.status(406).json(finalResult);
      }
      deleteFiles(fileName);
      return res.status(200).json({
        status: 200,
        result: "Accepted",
        message: "Accepted solution",
        passed: true,
        hasError: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
};

// running for sample cases
module.exports.submitCode = async (req, res) => {
  try {
    const questionId = req.body.questionId;
    let userCode = req.body.code;

    // checks if question Name mentioned with request
    if (!questionId) {
      return res
        .status(400)
        .json({ status: 400, message: "Missing question name/id" });
    }
    // checks if code exists
    if (!userCode) {
      return res.status(400).json({ status: 400, message: "Code Missing" });
    }
    // checks if question exists
    const questionData = await questionSchema.findById(questionId);

    if (!questionData)
      return res
        .status(404)
        .json({ status: 400, message: "Question Not found" });

    const testCases = await testcaseSchema
      .find({ questionId: questionId })
      .select("input expectedOutput -_id");
    if (testCases.length == 0)
      return res
        .status(404)
        .json({ status: 400, message: "Could Not find test cases, Try later" });
    const fileName = generateFileName(req.user._id);
    const inputFileName = fileName + "_" + "input";
    const codeFileName = fileName + "_" + "code";
    const ipCode = `void ip()
    {
        freopen("./code/${inputFileName}.txt","r",stdin);  
    }`;
    const code = `${questionData.defaultCode}\n${ipCode}\n${userCode}`;
    fs.writeFileSync(
      path.join(process.cwd(), `./code/${codeFileName}.cpp`),
      code
    );
    // creating exe file
    const executionResult = await checkExeFile(
      req,
      res,
      fileName,
      codeFileName
    );
    if (executionResult == true) {
      const finalResult = await runTests(req, res, fileName, testCases);
      if (!finalResult.passed) {
        saveCode(userCode, questionId, req.user._id, "Wrong Solution", false);
        deleteFiles(fileName);
        return res.status(406).json(finalResult);
      }
      deleteFiles(fileName);
      saveCode(userCode, questionId, req.user._id, "Accepted Solution", true);
      const { points, questionsSolved } = await User.findById(
        req.user._id
      ).select("points questionsSolved -_id");
      if (questionsSolved.includes(questionData._id)) {
        // already submiited
        return res.status(200).json({ ...finalResult, points: 0 });
      } else {
        // submitting for first time
        updateUserInfo(
          res,
          questionsSolved,
          questionId,
          points,
          questionData.points,
          req.user._id
        );
        return res
          .status(200)
          .json({ ...finalResult, points: questionData.points });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
};

function checkExeFile(req, res, fileName, codeFileName) {
  const codeFilePath = path.join(process.cwd(), `./code/${codeFileName}.cpp`);
  const exeFilePath = path.join(process.cwd(), `./code/${fileName}.exe`);
  return new Promise(function (resolve, reject) {
    exec(`g++ ${codeFilePath} -o ${exeFilePath}`, (error, stdout, stderr) => {
      try {
        if (error || stderr) {
          return res.status(400).json({
            status: 400,
            result: "Compile Error",
            passed: false,
            message: "Compile Error",
            points: 0,
            totalTestcases: 0,
            successfullyPassed: 0,
            hasError: true,
            error: stderr.split("error:")[1],
          });
          reject(false);
        } else {
          resolve(true);
        }
      } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
      }
    });
  });
}

function runTest(testCase, fileName) {
  fs.writeFileSync(
    path.join(process.cwd(), `./code/${fileName}_input.txt`),
    testCase.input
  );
  return new Promise(function (resolve, reject) {
    try {
      const exeFilePath = path.join(process.cwd(), `./code/${fileName}.exe`);
      exec(`${exeFilePath}`, (error, stdout, stderr) => {
        if (error || stderr) {
          reject({ status: false, error: stderr });
        } else {
          resolve({ status: true, output: stdout });
        }
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  });
}

async function runTests(req, res, fileName, testCases) {
  try {
    const n = testCases.length;
    for (let i = 0; i < n; i++) {
      const testCase = testCases[i];
      const executionResult = await runTest(testCase, fileName);
      if (executionResult.status) {
        const pass = executionResult.output === testCase.expectedOutput;
        if (pass == false) {
          return {
            status: 406,
            result: "Wrong Answer",
            passed: pass,
            totalTestcases: n,
            successfullyPassed: i,
            message: "Wrong Solution",
            hasError: false,
            error: null,
            breakPoint: {
              testCase: testCase.input,
              expectedOutput: testCase.expectedOutput,
              actualOutput: executionResult.output,
            },
          };
        }
      } else {
        return res
          .status(500)
          .json({ status: 500, message: executionResult.error });
      }
    }
    return {
      status: 200,
      result: "Accepted",
      passed: true,
      totalTestcases: n,
      successfullyPassed: n,
      hasError: false,
      error: null,
      message: "Accepted",
    };
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
}

function deleteFiles(fileName) {
  const files = [
    fileName + "_code.cpp",
    fileName + "_input.txt",
    fileName + ".exe",
  ];
  for (let file of files) {
    fs.unlink(`./code/${file}`, function (err) {
      if (err) throw err;
    });
  }
}

async function saveCode(code, questionId, userId, message, isAccepted) {
  const newsubmission = new submissionSchema({
    code,
    questionId,
    userId,
    message,
    isAccepted,
  });
  newsubmission.save();
}

async function updateUserInfo(
  res,
  questionsSolved,
  questionId,
  points,
  questionPoints,
  userId
) {
  try {
    questionsSolved.push(questionId);
    points += questionPoints;
    const result = await User.findByIdAndUpdate(userId, {
      points,
      questionsSolved,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Failed to updated submission records" });
  }
}
