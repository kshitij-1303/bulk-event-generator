const express = require("express");
const router = express.Router();
const xlsx = require("xlsx");
let workbook_response = [];

const workbook = xlsx.readFile("../meet-template.xlsx");
let workbook_sheet = workbook.SheetNames;
workbook_response = xlsx.utils.sheet_to_json(
  workbook.Sheets[workbook_sheet[0]]
);
console.log(workbook_response);

const setTime = (time) => {
  const date = new Date(0);
  date.setMilliseconds(time * 24 * 60 * 60 * 1000);
  return date;
};

function nameChange(ele) {}

const newResponse = workbook_response.map((ele, idx) => {
  let response = {
    Date: new Date((ele.Date - 25569) * 86400 * 1000),
    Time: setTime(ele.Time),
    studentName: ele["Student name"],
    studentEmail: ele["Student email"],
  };
  return response;
});

console.log(newResponse);

router.get("/read-excel", (req, res) => {
  res.status(200).send({
    message: workbook_response,
  });
});

module.exports = {
  readExcel: router,
  response: newResponse,
};
