import math


def parse(file):
    with open(file) as file:
        return [line.strip().split() for line in file.readlines()]


def solve(input: list):
    strenghts = []
    x = 1
    addx = None
    crt = [[] for _ in range(6)]
    for cycle in range(1, 241):
        if len(input) > 0 and addx is None:
            ins = input.pop(0)
            if ins[0] == "addx":
                addx = (1, int(ins[1]))

        if (cycle in [20, 60, 100, 140, 180, 220]):
            strenghts.append(cycle*x)

        yCrt = math.floor((cycle - 1)/40)
        xCrt = (cycle-1) - 40*yCrt
        row = crt[yCrt]

        if x - 1 <= xCrt <= x + 1:
            row.append("#")
        else:
            row.append(".")
        crt[yCrt] = row

        if addx is not None:
            (c, val) = addx
            if c > 0:
                addx = (c-1, val)
            else:
                x += val
                addx = None

        if (len(input) == 0 and addx == None):
            break
    return (sum(strenghts), crt)


input = parse("input.txt")
part1, part2 = solve(input)

print(part1)
print("\n".join(("".join(line) for line in part2)))
