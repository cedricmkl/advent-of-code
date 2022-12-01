const fs = require("fs")
const path = require("path")
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const horizontalPositions = input.split(",").map(value => parseInt(value))

function solve(checkFunction) {
    let cheapestPostion = Number.MAX_VALUE
    for (let goal = Math.min(...horizontalPositions); goal < Math.max(...horizontalPositions); goal++) {
        cheapestPostion = Math.min(cheapestPostion,
            horizontalPositions.map(currentPosition => checkFunction(currentPosition, goal))
            .reduce((total, current) => total += current))
    }
    return cheapestPostion
}


console.table([["Solution Part 1", solve((postion, goal) => Math.abs(postion - goal))],
    ["Solution Part 2", solve((postion, goal) => {
        let cost = 0
        for (let i = 1; i < Math.abs(postion - goal) + 1; i++) {
            cost += i
        }
        return cost
    })]])