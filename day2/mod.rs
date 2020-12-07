
#[derive(Debug)]
struct Entry {
    num1: usize,
    num2: usize,
    letter: char,
    pass: String,
}

#[aoc_generator(day2)]
fn input_generator(input: &str) -> Vec<Entry> {
    input
        .lines()
        .map(|line| {
            let vals: Vec<&str> = line.split(" ").collect();
            let (policy, letter, pass) = (vals[0], vals[1], vals[2]);
            let nums: Vec<usize> = policy
                .split("-")
                .map(|x| x.parse().unwrap() )
                .collect();

            Entry { num1: nums[0], num2: nums[1], letter: letter.chars().next().unwrap(), pass: pass.to_string() }
        })
        .collect()
}

#[aoc(day2, part1)]
fn part1(input: &[Entry]) -> isize {
    let mut valid = 0;

    for line in input {
        let actual = line.pass.matches(line.letter).count();
        if actual >= line.num1 && actual <= line.num2 {
            valid += 1;
        }
    }

    return valid;
}

#[aoc(day2, part2)]
fn part2(input: &[Entry]) -> isize {
    let mut valid = 0;

    for line in input {
        let chars: Vec<char> = line.pass.chars().collect();
        let has_pos1 = chars[line.num1 - 1] == line.letter;
        let has_pos2 = chars[line.num2 - 1] == line.letter;

        if has_pos1 ^ has_pos2 {
            valid += 1;
        }
    }

    return valid;
}