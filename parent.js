/**
 * @author yenilikci
 * node-multi ~ 08.03.2022
 */

const express = require("express");
const cp = require("child_process");
const app = express();

app.listen(3000, () => {
  console.log("server listen...");
});

app.get("/run", call);

function call(req, res) {
  let result = [],
    counter = 0;
  const childProcess1 = cp.spawn("go", [
    "run",
    "./childProcess1.go",
    req.query.author,
  ]);
  const childProcess2 = cp.spawn("python", [
    "./childProcess2.py",
    req.query.author,
  ]);
  [childProcess1, childProcess2].forEach((childProcess) => {
    childProcess.stdout.on("data", (data) => {
      childProcess.on("close", () => {
        result.push(data.toString().replace(/\n/g, ""));
        counter++;
        if (counter == 2) res.send(result);
      });
    });
  });
}
