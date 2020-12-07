const path = require('path');
const fs = require('fs');

let nums = fs.readFileSync(path.join(__dirname, '../', 'input', '2020', 'day1.txt'))
    .toString()
    .split('\n').map(str => parseInt(str, 10))
    .sort((a, b) => a - b);

function run(target, count, index = 0) {
    for (let i = index; i < nums.length; i++) {
        let num = nums[i];
        if (num > target) return null;

        if (count === 1) {
            if (num === target) return target;
            continue;
        }

        let found = run(target - num, count - 1, i + 1);
        if (found != null) return found * num;
    }

    return null;
}

console.log(run(2020, 2));
console.log(run(2020, 3));
