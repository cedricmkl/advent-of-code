import json


def parse(file):
    with open(file) as file:
        return [[json.loads(p) for p in line.splitlines()] for line in file.read().split("\n\n")]


def compare(left, right):
    print("Compare", left, "vs", right)
    if type(left) == int and type(right) == int:
        if left == right:
            return None
        if left < right:
            print("Left side is smaller, so inputs are in the right order")
        return left < right
    elif type(left) == list and type(right) == list:
        for i, l in enumerate(left):
            if len(right) - 1 < i:
                return False
            if compare(l, right[i]) == None:
                continue
            return compare(l, right[i])
        return True
    else:
        if type(left) == int:
            left = [left]
        elif type(right) == int:
            right = [right]
        return compare(left, right)


def solve(pairs):
    sum = 0
    for i, pair in enumerate(pairs):
        a = compare(pair[0], pair[1])
        print(i+1, a)
        if a:
            sum += i + 1
    return sum


pairs = parse("test.txt")
print(solve(pairs))
