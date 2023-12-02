board = []
path = None
with open("test.txt") as file:
    split = file.read().split("\n\n")
    path = split[1]
    for line in split[0].splitlines():
        board.append([char for char in line])


def move(direction, x, y):
    if direction == 0:
        return x, y-1
    elif direction == 1:
        return x+1, y
    elif direction == 2:
        return x, y+1
    elif direction == 3:
        return x-1, y


def fix(x, y):
    if x < 0:
        return len(board[y]-1), y
    if y < 0:
        for i in range(len(board)):
            newY = len(board)-1-i
            if len(board[newY]) - 1 < x:
                continue
            if board[newY][x] == ".":
                return x, newY
        return x, y+1
    return x, y


direction = 1
x, y = board[0].count(" "), 0
i = 0
while i < len(path) - 1:
    segment = path[i]
    if segment.isdigit():
        s = segment
        i += 1
        while path[i].isdigit():
            segment += path[i]
            i += 1
        for j in range(int(segment)):
            newX, newY = move(direction)

        continue
    elif segment == "R":
        direction += 1
        if direction > 3:
            direction = 0
    elif segment == "L":
        direction -= 1
        if direction < 0:
            direction = 0
    i += 1

print(board)
print(path)
