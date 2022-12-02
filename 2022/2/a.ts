const input = await Deno.readTextFile("./input.txt");
const rounds = input.split("\n")


const getPointsByShape = (shape: string): number => {
    switch (shape) {
        case "A":
        case "X":
            return 1
        case "B":
        case "Y":
            return 2
        case "C":
        case "Z":
            return 3
    }
    return 0
}

let points = 0
for(const round of rounds) {
    const shapes = round.split(" ")
    const opponentShape = shapes[0]
    const myShape = shapes[1]

    if (getPointsByShape(opponentShape) === getPointsByShape(myShape)) {
        points += getPointsByShape(myShape) + 3
        continue
    }

    if(myShape === "X" && opponentShape === "C") {
        points += getPointsByShape(myShape) + 6
        continue
    }

    if (myShape === "Y" && opponentShape === "A") {
        points += getPointsByShape(myShape) + 6
        continue
    }

    if (myShape === "Z" && opponentShape === "B") {
        points += getPointsByShape(myShape) + 6
        continue
    }

    points += getPointsByShape(myShape)

}

console.log(points)

