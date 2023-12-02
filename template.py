import re

def parse(name: str):
    with open(name) as f:
        return f.read().splitlines()

def solve(input):
    part1 = 0
    part2 = 0

    return part1, part2

input = parse("input.txt")
part1, part2 = solve(input)
print(f"Part 1: {part1}")
print(f"Part 2: {part1}")