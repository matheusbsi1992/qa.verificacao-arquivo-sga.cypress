//const { read } = require("fs");

const path = require('path');
const xlsx = require("xlsx");

const readExcelFile = async (pathToExcel) => {
    const filePath = pathToExcel;
    const absolutePath = path.resolve(filePath);

    const workbook = xlsx.readFile(absolutePath);

    // pega a primeira aba (sheet)
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // converte para JSON
    const data = xlsx.utils.sheet_to_json(sheet, { defval: "" });

    return data; // Cypress recebe como um array de objetos

};

module.exports = {
    readExcelFile
};