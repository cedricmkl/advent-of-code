def parse(name: str):
    with open(name) as f:
        return [line + "." for line in f.read().splitlines()]

def get_adjacent_coordinates(x1: int, x2: int, y: int, X: int, Y: int):
    coordinates = [(x1-1, y), (x2+1, y)]
    for x in range(x1 - 1, x2 + 2):
        coordinates.append((x, y-1))
        coordinates.append((x, y+1))
    coordinates = filter(lambda c: c[0] >= 0 and c[0] < X and c[1] >= 0 and c[1] < Y, coordinates)
    return list(coordinates)

def solve(input):
    Y = len(input)
    X = len(input[0])

    part1 = 0
    part2 = 0
    gears = {}
    for y, line in enumerate(input):
        num = ""
        x_start = None
        for x, char in enumerate(line):
            if char.isdigit():
                if x_start is None:
                    x_start = x
                num += char
            elif num != "":
                for c in get_adjacent_coordinates(x_start, x-1, y, X, Y):
                    v = input[c[1]][c[0]]
                    if v in ".0123456789":
                        continue
                    part1 += int(num)

                    if v == "*":
                        gears[c] = [int(num)] if c not in gears else [*gears[c], int(num)]
                    break
                num = ""
                x_start = None
    for nums in gears.values():
        if len(nums) == 2:
            part2 += nums[0] * nums[1]

    return part1, part2

input = parse("input.txt")
part1, part2 = solve(input)
print(f"Part 1: {part1}")
print(f"Part 2: {part2}")