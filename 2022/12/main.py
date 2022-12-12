def parse(file):
    with open(file) as file:
        return [[char for char in line] for line in file.read().splitlines()]


def find(char_to_find, grid):
    for y, col in enumerate(grid):
        for x, char in enumerate(col):
            if char == char_to_find:
                return (x, y)


def find_all(char_to_find, grid):
    chars = []
    for y, col in enumerate(grid):
        for x, char in enumerate(col):
            if char == char_to_find:
                chars.append((x, y))
    return chars


def to_height(char):
    if char == "S":
        return 0
    elif char == "E":
        return 25
    else:
        return ord(char)-97


def possible_moves(current, x, y, grid):
    moves = []
    if y > 0:
        moves.append((x, y-1))
    if y < len(grid) - 1:
        moves.append((x, y+1))
    if x > 0:
        moves.append((x-1, y))
    if x < len(grid[y]) - 1:
        moves.append((x+1, y))
    return list(filter(lambda next: to_height(grid[next[1]][next[0]]) - 1 <= to_height(current), moves))


def get_cost(x, y, data: dict):
    d = data.get((x, y))
    if d is None:
        return 999999999999
    else:
        return d[1]


def solve(grid, start):
    que = [start]
    data = {
        start: (None, 0)
    }
    while (len(que) > 0):
        que.sort(key=lambda a: get_cost(a[0], a[1], data))
        (x, y) = que.pop(0)
        cost = get_cost(x, y, data)
        for node in possible_moves(grid[y][x], x, y, grid):
            if get_cost(node[0], node[1], data) > cost + 1:
                data[(node[0], node[1])] = ((x, y), cost + 1)
                que.append((node[0], node[1]))
    if find("E", grid) not in data:
        return 9999999999999
    return data[find("E", grid)][1]


def solve_part2(grid):
    fewest = 9999999999
    for node in find_all("a", grid):
        steps = solve(grid, node)
        if steps < fewest:
            fewest = steps
    return fewest


grid = parse("input.txt")
print(solve(grid, find("S", grid)))
print(solve_part2(grid))
