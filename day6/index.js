const path = require('path');
const fs = require('fs');

let input = fs.readFileSync(path.join(__dirname, '../', 'input', '2020', 'day6.txt'))
    .toString()
    .split('\n');

function part1() {
    let total = 0;
    let groupCount = 0;
    let group = {};

    for (let i = 0; i < input.length; i++) {
        let person = input[i];

        for (let answer of person) {
            if (!group[answer]) groupCount++;
            group[answer] = true;
        }

        if (!person || i === input.length - 1) {
            total += groupCount;
            groupCount = 0;
            group = {};
        }
    }

    return total;
}

function part2() {
    let total = 0;
    let answers = undefined;

    for (let i = 0; i < input.length; i++) {
        let person = input[i];

        if (person) {
            if (!answers) answers = person.split('');
            else if (answers.length) {
                answers = answers.filter(a => person.indexOf(a) !== -1);
            }
        }

        if (!person || i === input.length - 1) {
            total += answers.length;
            answers = undefined;
        }
    }

    return total;
}

console.log(part1());
console.log(part2());
