import math


def parse(file):
    with open(file) as file:
        monkeys = []
        inventories = []
        for monkey in file.read().strip().split("\n\n"):
            fields = [s.strip() for s in monkey.split("\n")]
            inventories.append(
                list(map(int, fields[1].split(": ")[1].split(", "))))
            monkeys.append((
                fields[2].split("= ")[1].split(
                    " "), int(fields[3].split("by ")[1]),
                int(fields[4].split("monkey ")[1]),
                int(fields[5].split("monkey ")[1])))
    return monkeys, inventories

# only part 2


def solve(monkeys: list, inventories: list):
    globalMod = 1
    for (_, test, _, _) in monkeys:
        globalMod *= test
    inspected = [0 for _ in range(len(monkeys))]
    for _ in range(10000):
        for i, (operation, test, ifTrue, ifFalse) in enumerate(monkeys):
            for item in inventories[i]:
                inspected[i] += 1
                parsed = item if operation[2] == "old" else int(operation[2])
                new = (item * parsed if operation[1] ==
                       "*" else parsed + item) % globalMod
                if new % test == 0:
                    inventories[ifTrue].append(new)
                else:
                    inventories[ifFalse].append(new)
            inventories[i] = []
    inspected.sort(reverse=True)
    return (inspected[0] * inspected[1])


monkeys, inventories = parse("input.txt")
print(solve(monkeys, inventories))
