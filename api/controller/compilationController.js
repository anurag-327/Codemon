const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const { generateFileName } = require("../utils/genrateFilename");
module.exports.compile = async (req, res) => {
  try {
    if (!req.body.code) {
      return res.status(400).json({ status: 400, message: "Missing code" });
    } else {
      // formatting code,input and output file
      let code = req.body.code;
      let input = req.body.input;

      const uuidWithoutHyphens = uuidv4().replace(/-/g, "");
      const fileName = generateFileName(uuidWithoutHyphens);
      const inputFileName = fileName + "_" + "input";
      const codeFileName = fileName + "_" + "code";
      const defaultCode = `#include<bits/stdc++.h>
      using namespace std;
      void ip();
      void solve();
      int main()
      {
          ip();
          solve();
      }`;
      const ipCode = `void ip(){
            freopen("./code/${inputFileName}.txt","r",stdin);  
        }`;
      code = `${defaultCode}\n${ipCode}\n${code}`;
      fs.writeFileSync(
        path.join(process.cwd(), `./code/${codeFileName}.cpp`),
        code
      );
      const executionResult = await checkExeFile(
        req,
        res,
        fileName,
        codeFileName
      );
      if (executionResult == true) {
        const finalResult = await runCode(req, res, fileName, input);
        deleteFiles(fileName);
        if (finalResult.status == true) {
          return res
            .status(200)
            .json({ status: 200, output: finalResult.output });
        } else {
          return res
            .status(400)
            .json({ status: 400, error: finalResult.error });
        }
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
          fs.unlink(`./code/${codeFileName}.cpp`, function (err) {
            if (err) throw err;
          });
          return res.status(400).json({ status: 400, error: stderr });
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

function runCode(req, res, fileName, input) {
  fs.writeFileSync(
    path.join(process.cwd(), `./code/${fileName}_input.txt`),
    input
  );
  return new Promise(function (resolve, reject) {
    try {
      const exeFilePath = path.join(process.cwd(), `./code/${fileName}.exe`);
      exec(`${exeFilePath}`, (error, stdout, stderr) => {
        if (error || stderr) {
          console.log(error, stderr);
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
