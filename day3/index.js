const path = require('path');
const fs = require('fs');

let input = fs.readFileSync(path.join(__dirname, '../', 'input', '2020', 'day3.txt'))
    .toString()
    .split('\n');

function countTrees(right, down) {
    let trees = 0;

    for (let x = right, y = down; y < input.length; x += right, y += down) {
        x %= input[y].length;
        input[y][x] === '#' && trees++;
    }

    return trees;
}

function part1() {
    return countTrees(3, 1);
}

function part2() {
    return [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
        .reduce((prev, curr) => prev * countTrees(...curr), 1);
}

console.log(part1());
console.log(part2());
