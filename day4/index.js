const path = require('path');
const fs = require('fs');

let input = fs.readFileSync(path.join(__dirname, '../', 'input', '2020', 'day4.txt'))
    .toString()
    .split('\n');

function validatePassports(validationFn) {
    let valid = 0;
    let passport = undefined;

    input.forEach((line, i) => {
        if (line) {
            if (!passport) passport = { fieldCount: 0, fields: {} };

            passport.fields = line.split(' ').reduce((all, curr) => {
                passport.fieldCount++;
                let [name, val] = curr.split(':');
                return { ...all, [name]: val }
            }, passport.fields);
        }

        if (!line || i === input.length - 1) {
            validationFn(passport) && valid++;
            passport = undefined;
        }
    });

    return valid;
}

function part1() {
    let validate = function({ fieldCount, fields }) {
        return fieldCount === 8 || (fieldCount === 7 && !fields['cid']);
    }

    return validatePassports(validate);
}

function part2() {
    let validEyeColors = {
        amb: true,
        blu: true,
        brn: true,
        gry: true,
        grn: true,
        hzl: true,
        oth: true,
    };

    let validate = function({ fieldCount, fields }) {
        // regular validation
        if (!(fieldCount === 8 || (fieldCount === 7 && !fields['cid']))) return false;

        // birth year
        let byr = parseInt(fields.byr, 10);
        if (byr < 1920 || byr > 2002) return false;

        // issue year
        let iyr = parseInt(fields.iyr, 10);
        if (iyr < 2010 || iyr > 2020) return false;

        // expiration year
        let eyr = parseInt(fields.eyr, 10);
        if (eyr < 2020 || eyr > 2030) return false;

        // height
        let hgt = fields.hgt;
        let idx = hgt.indexOf('in');
        if (idx !== -1) {
            hgt = parseInt(hgt.substring(0, idx), 10);
            if (hgt < 59 || hgt > 76) return false;
        }
        else {
            idx = hgt.indexOf('cm');
            if (idx === -1) return false;

            hgt = parseInt(hgt.substring(0, idx), 10);
            if (hgt < 150 || hgt > 193) return false;
        }

        // hair color
        let hcl = fields.hcl;
        if (!hcl.match(/^#[0-9a-f]{6}$/)) return false;

        // eye color
        let ecl = fields.ecl;
        if (!validEyeColors[ecl]) return false;

        // passport id
        let pid = fields.pid;
        if (pid.length !== 9 || isNaN(parseInt(pid, 10))) return false;

        // valid
        return true;
    }

    return validatePassports(validate);
}

console.log(part1());
console.log(part2());
