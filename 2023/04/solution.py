import re 
def parse(name: str):
    with open(name) as f:
        return [list(map(lambda x: int(x), re.findall("\d+", line))) for line in f.read().splitlines()]

divider = 11


def part1(input):
    part1 = 0

    for card in input:
        points = 0
        for num in card[divider:]:
            if num in card[1:divider]:
                if points == 0:
                    points = 1
                else:
                    points *= 2
        part1 += points
    return part1

def part2(input):
    cards = {}
    part2 = 0
    max = input[-1][0]

    for card in input:
        id = card[0]
        matching = 0
        for num in card[divider:]:
            if num in card[1:divider]:
                matching += 1
        cards[id] = cards.get(id, 0) + 1
        for i in range (1, matching + 1):
            if id + i > max:
                break
            cards[id + i] = cards.get(id + i, 0) + 1*cards[id]

    for card in cards.values():
        print(card)
        part2 += card
    return part2

input = parse("input.txt")
print(f"Part 1: {part1(input)}")
print(f"Part 2: {part2(input)}")