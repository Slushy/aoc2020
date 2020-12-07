#[aoc_generator(day1)]
fn input_generator(input: &str) -> Vec<isize> {
    let mut vec: Vec<isize> = input
        .lines()
        .map(|line| line.parse::<isize>().unwrap())
        .collect();

    vec.sort();

    return vec;
}

fn run(input: &[isize], target: isize, count: usize, index: usize) -> isize {
    for i in index..input.len() {
        let num = input[i];
        if num > target { return -1; }

        if count == 1 {
            if num == target { return target; }
            continue;
        }

        let found = run(input, target - num, count - 1, i + 1);
        if found != -1 { return found * num; }
    }

    return -1;
}

#[aoc(day1, part1)]
fn part1(input: &[isize]) -> isize {
    run(&input, 2020, 2, 0)
}

#[aoc(day1, part2)]
fn part2(input: &[isize]) -> isize {
    run(&input, 2020, 3, 0)
}
