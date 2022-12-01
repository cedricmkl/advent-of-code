const fs = require("fs")
const path = require("path")
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const commands = input.split("\n")

let horizontal = 0
let depth = 0
let aim = 0

commands.forEach(command => {
    const [commandType, stringValue] = command.split(" ")
    const value = Number.parseInt(stringValue)

    switch(commandType) {
        case "forward": {
            horizontal += value
            break
        }
        case "down": {
            depth += value
            break
        }
        case "up": {
            depth -= value
            break
        }
    }
})

let horizontal2 = 0
let depth2 = 0
let aim2 = 0

commands.forEach(command => {
    const [commandType, stringValue] = command.split(" ")
    const value = Number.parseInt(stringValue)

    switch(commandType) {
        case "forward": {
            horizontal2 += value
            depth2 += aim2*value
            break
        }
        case "down": {
            aim2 += value
            break
        }
        case "up": {
            aim2 -= value
            break
        }
    }
})



console.table([["Solution Part 1", horizontal*depth], ["Solution Part 2", horizontal2*depth2]])