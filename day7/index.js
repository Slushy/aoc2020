const path = require('path');
const fs = require('fs');

let input = fs.readFileSync(path.join(__dirname, '../', 'input', '2020', 'day7.txt'))
    .toString()
    .split('\n')
    .reduce((tree, line) => {
        let [root, contain] = line.split(' contain ');
        let rootColor = root.match(/^(.*) bags$/)[1];
        tree[rootColor] = {};

        for (let containBag of contain.split(', ')) {
            let containColor = containBag.match(/^(\d+) (.*) bags?.?$/);
            if (containColor != null) {
                tree[rootColor][containColor[2]] = parseInt(containColor[1], 10);
            }
        }

        return tree;
    }, {});

const SHINY_GOLD = "shiny gold";

function findGold(searched, rootColor) {
    if (searched[rootColor] != null) return searched[rootColor];

    for (let color in input[rootColor]) {
        if (searched[color] || color === SHINY_GOLD || findGold(searched, color)) {
            searched[rootColor] = true;
            return true;
        }
    }

    searched[rootColor] = false;
    return false;
}

function part1() {
    let searched = {};

    for (let rootColor in input) {
        findGold(searched, rootColor)
    }

    return Object.keys(searched).filter(color => searched[color]).length;
}

function findBagCount(rootColor = SHINY_GOLD) {
    let total = 0;
    for (let color in input[rootColor]) {
        let amount = input[rootColor][color];
        total += (amount + amount * findBagCount(color));
    }
    return total;
}

function part2() {
    return findBagCount();
}

console.log(part1());
console.log(part2());
