const input = await Deno.readTextFile("./input.txt");
const rounds = input.split("\n")

const getPointsByShape = (shape: string): number => {
    switch (shape) {
        case "A":
            return 1
        case "B":
            return 2
        case "C":
            return 3
    }
    return 0
}

let points = 0

const shapesToWin = {
    'A': 'B',
    'B': 'C',
    'C': 'A'
}

const shapesToLose = {
    'A': 'C',
    'B': 'A',
    'C': 'B'
}

for(const round of rounds) {
    const shapes = round.split(" ")
    const opponentShape = shapes[0] as "A" | "B" | "C"
    const action = shapes[1]

    if (action === "X") {
        points += getPointsByShape(shapesToLose[opponentShape])
        continue
    }

    if(action === "Y") {
        points += getPointsByShape(opponentShape) + 3
        continue
    }

    if(action === "Z") {
        points += getPointsByShape(shapesToWin[opponentShape]) + 6
        continue
    }

}

console.log(points)

