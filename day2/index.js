const path = require('path');
const fs = require('fs');

let input = fs.readFileSync(path.join(__dirname, '../', 'input', '2020', 'day2.txt'))
    .toString()
    .split('\n')
    .map(str => {
        let [policy, letter, pass] = str.split(' ');
        let [num1, num2] = policy.split('-');
        return { num1, num2, letter: letter[0], pass };
    });

function part1() {
    let valid = 0;

    for (let { num1: min, num2: max, letter, pass } of input) {
        let actual = pass.split(letter).length - 1;
        actual >= min && actual <= max && valid++;
    }

    return valid;
}

function part2() {
    let valid = 0;

    for (let { num1: pos1, num2: pos2, letter, pass } of input) {
        let hasPos1 = pass[pos1 - 1] === letter;
        let hasPos2 = pass[pos2 - 1] === letter;
        hasPos1 ^ hasPos2 && valid++;
    }

    return valid;
}

console.log(part1());
console.log(part2());
