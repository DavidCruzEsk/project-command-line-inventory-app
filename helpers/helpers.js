const { readFileSync, writeFileSync } = require('node:fs');

function writeJsonFile(path, fileName, data) {
    data = JSON.stringify(data, null, 2);
    return writeFileSync(`${path}/${fileName}`, data, { encoding: 'utf-8' });
}

function readJsonFile(path, fileName) {
    let collection = readFileSync(`${path}/${fileName}`, {encoding: 'utf-8'});
    return collection ? JSON.parse(collection) : [];
}

// FUNCTION THAT RETURNS A RANDOM BOOLEAN OF TRUE OR FALSE
function trueOrNot() {
    const boolArr = [ true, false ];
    const trueOrFalse = boolArr[Math.floor(Math.random() * boolArr.length - 1)];
    return trueOrFalse;
}

// FUNCTION THAT RETURNS A RANDOM ELEMENT FROM ANY ARRAY
function randomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length - 1)];
}

module.exports = {
    readJsonFile,
    writeJsonFile,
    trueOrNot,
    randomElement
};