const input = await Deno.readTextFile("./input.txt");

type Position = [number, number]
type Direction = "U" | "R" | "D" | "L"
type Instruction = { direction: Direction, steps: number }

const instructions: Array<Instruction> = input.split("\n").map((instruction) => instruction.split(" "))
    .map((instruction) => ({ direction: instruction[0] as Direction, steps: parseInt(instruction[1]) }))

const tailPositions: Array<Position> = [[0, 0]]
const deepIncludes = (array: Array<Position>, position: Position) =>
    array.some((pos) => pos[0] === position[0] && pos[1] === position[1])

let head: Position = [0, 0]
let tail: Position = [0, 0]
instructions.forEach((instruction) => {
    for (let i = 1; i < instruction.steps + 1; i++) {
        let headCopy = head
        head = move(head, instruction.direction)
        if (distance(tail, head) > 1) {
            tail = headCopy
            if (!deepIncludes(tailPositions, tail)) tailPositions.push(tail)
        }
    }
})

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

console.log(tailPositions.length)
