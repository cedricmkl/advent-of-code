const input = await Deno.readTextFile("./input.txt");
//not working
type Position = [number, number]
type Direction = "U" | "R" | "D" | "L"
type Instruction = { direction: Direction, steps: number }

const instructions: Array<Instruction> = input.split("\n").map((instruction) => instruction.split(" "))
    .map((instruction) => ({ direction: instruction[0] as Direction, steps: parseInt(instruction[1]) }))

const tailPositions: Array<Position> = [[0, 0]]
const deepIncludes = (array: Array<Position>, position: Position) =>
    array.some((pos) => pos[0] === position[0] && pos[1] === position[1])

let positions: Array<Position> = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]

let ins = 0
instructions.forEach((instruction) => {
    console.log(instruction)
    for (let step = 1; step < instruction.steps + 1; step++) {
        let inFrontOfKnot: Position | null = null
        let inFrontOfKnotOld: Position | null = null
        for (let i = 0; i < positions.length; i++) {
            let position = positions[i];
            let oldPosition = position
            if (i === 0) {
                position = move(position, instruction.direction)
            }
            else if (distance(inFrontOfKnot!, position) > 1) {
                position = inFrontOfKnotOld!
            }
            inFrontOfKnotOld = oldPosition
            inFrontOfKnot = position
            if (i === 9 && !deepIncludes(tailPositions, position)) tailPositions.push(position)
            positions[i] = position
        }
        print(ins)
        ins++
    }
})

//   0 1 2 3 4
//-4 X X X B X
//-3 X X X X X
//-2 X A X X X
//-1 X X X X X
// 0 X X X X X
function distance(pos1: Position, pos2: Position): number {
    const distanceX = Math.abs(pos1[0] - pos2[0])
    const distanceY = Math.abs(pos1[1] - pos2[1])
    if (distanceX === distanceY) return distanceX
    return distanceX + distanceY
}

function move(position: Position, direction: Direction): Position {
    if (direction === "U" || direction === "D") {
        return [position[0], position[1] + (direction === "U" ? -1 : 1)]
    } else {
        return [position[0] + (direction === "L" ? -1 : 1), position[1]]
    }
}

function print(i: number) {
    console.log(i)
    console.log("#  0 1 2 3 4 5 6 7 8 9")
    for (let y = -9; y <= 0; y++) {
        let s = ""
        for (let x = 0; x < 10; x++) {
            let symbol: string | null = null
            positions.forEach((pos, index) => {
                if (symbol != null) return
                if (pos[0] === x && pos[1] === y) {
                    if (index === 0) symbol = "H"
                    else if (index === 9) symbol = "T"
                    else symbol = index.toString()
                }
            })
            s += (symbol === null ? "." : symbol) + " "
        }
        console.log((y === 0 ? " " : "") + y + " " + s)
    }
}


console.log("#  0 1 2 3 4 5 6 7 8 9")
for (let y = -9; y <= 0; y++) {
    let s = ""
    for (let x = 0; x < 10; x++) {
        s += (deepIncludes(tailPositions, [x, y]) ? "#" : ".") + " "
    }
    console.log((y === 0 ? " " : "") + y + " " + s)
}

console.log(tailPositions.length)

