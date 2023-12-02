board = []
with open("test.txt") as file:
    board = [[char for char in line] for line in file.read().splitlines()]

directions = [0, 2, 3, 1]

dx = 0
dy = 0


def check(x, y):
    if y < 0:
        dy += abs(y)
        for _ in range(abs(y)):
            board.insert(0, [])
    if x < 0:
        dx += abs(x)
        for _ in range(abs(y)):
            board[y+dy].insert(0, [])


def get(x, y):
    check(x, y)
    nX, nY = x + dx, y + dy
    return board[y+dy][x+dx]


def adjacent_tiles(x, y):
    for dx in [-1, 0, 1]:
        for dy in [-1, 0, 1]:
            if dx == 0 and dy == 0:
                continue
            yield x + dx, y + dy


print(list(adjacent_tiles(0, 0)))


def first_valid_direction(x, y):
    for direction in directions:
        newX, newY = move(x, y, direction)
        if board[newY][newX] == ".":
            return direction
    return None
