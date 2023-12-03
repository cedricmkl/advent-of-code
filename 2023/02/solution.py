def parse(name: str):
    with open(name) as file:
        games = []
        for line in file.read().splitlines():
            id = get_num(line[5:])
            print(id)
            sets = [[c.strip() for c in s.strip().split(",")] for s in line[6 + len(str(id)):].split(";")]
            games.append((id, sets))
        return games
    
def get_num(str: str):
    num = ""
    for char in str:
        if char.isdigit():
            num += char
        else:
            break
    return int(num)

def part1(input):
    sum = 0
    limit_red = 12
    limit_green = 13
    limit_blue = 14


    for game in input:
        invalid = False
        id = game[0]
        sets = game[1]

        for set in sets:
            for cube in set:
                num = get_num(cube)
                if "red" in cube and num > limit_red:
                    invalid = True
                elif "green" in cube and num > limit_green:
                    invalid = True
                elif "blue" in cube and num > limit_blue:
                    invalid = True

        if not invalid:
            sum += id
    print(f"Part 1: {sum}")

def part2(input):
    sum = 0


    for game in input:
        sets = game[1]
        red = 0
        green = 0
        blue = 0

        for set in sets:
            for cube in set:
                num = get_num(cube)
                if "red" in cube and num > red:
                    red = num
                elif "green" in cube and num > green:
                    green = num
                elif "blue" in cube and num > blue:
                    blue = num

        sum += red*green*blue
    print(f"Part 2: {sum}")


input = parse("input.txt")
part1(input)
part2(input)