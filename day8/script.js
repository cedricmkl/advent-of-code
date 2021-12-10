const fs = require("fs")
const path = require("path")
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const symbolLines = input.split("\n").map(value => {
    value.split("")
})
console.log("not working sadge")
console.log("Liens", symbolLines)

function part1() {

}

function part2() {

}


console.table([["Solution Part 1", part1()],
    ["Solution Part 2", part2()]])