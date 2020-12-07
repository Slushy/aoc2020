const path = require('path');
const fs = require('fs');

let input = fs.readFileSync(path.join(__dirname, '../', 'input', '2020', 'day5.txt'))
    .toString()
    .split('\n');

function find(code, lowerChar, lower, upper, i = 0) {
    let dist = Math.ceil((upper - lower) / 2);

    if (code[i] === lowerChar) upper -= dist;
    else lower += dist;

    return (i < code.length - 1)
        ? find(code, lowerChar, lower, upper, i + 1)
        : lower;
}

function findRow(line) {
    return find(line.substr(0, 7), 'F', 0, 127);
}

function findCol(line) {
    return find(line.substr(7), 'L', 0, 7);
}

function part1() {
    let highestSeatId = -1;

    for (let line of input) {
        let rowNum = findRow(line);
        let colNum = findCol(line);
        let seatId = rowNum * 8 + colNum;

        if (seatId > highestSeatId) highestSeatId = seatId;
    }

    return highestSeatId;
}

function part2() {
    let seats = {};
    let minSeatId = Number.MAX_SAFE_INTEGER;
    let maxSeatId = Number.MIN_SAFE_INTEGER;

    for (let line of input) {
        let rowNum = findRow(line);
        let colNum = findCol(line);
        let seatId = rowNum * 8 + colNum;
        seats[seatId] = true;

        if (seatId < minSeatId) minSeatId = seatId;
        if (seatId > maxSeatId) maxSeatId = seatId;

        if (!seats[seatId - 1]) seats[seatId - 1] = false;
        if (!seats[seatId + 1]) seats[seatId + 1] = false;
    }

    for (let id in seats) {
        if (id > minSeatId && id < maxSeatId && seats[id] === false) {
            return id;
        }
    }
}

console.log(part1());
console.log(part2());
