import re

def parse(name: str):
    with open(name) as file:
        return file.read().splitlines()

digits = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven":"7",
    "eight": "8",
    "nine": "9",
}

def part1(input):
    sum = 0
    for line in input:
        a = None
        b = None
        for char in line:
            if char.isnumeric():
                if a is None:
                    a = char
                    b = char
                else: 
                    b = char
        sum += int(f"{a}{b}")
    print(f"Part 1: {sum}")

def part2(input):
    sum = 0
    for line in input:
        a = None
        b = None

        results = re.findall("(?=(one|two|three|four|five|six|seven|eight|nine|[1-9]))", line)
        if results[0] in digits:
            a = digits[results[0]]
        else:
            a = results[0]

        if results[-1] in digits:
            b = digits[results[-1]]
        else:
            b = results[-1]

        assert a is not None
        assert b is not None
        print(f"{line} {a} + {b} = {int(f'{a}{b}')}")
        sum += int(f"{a}{b}")
    print(f"Part 2: {sum}")


input = parse("input.txt")
#part1(input)
part2(input)