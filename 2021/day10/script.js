const fs = require("fs")
const path = require("path")
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const symbolLines = input.split("\n").map(value => value.split(""))

const pairs = {
    "(": ")",
    "{": "}",
    "[": "]",
    "<": ">",
}

const pointsTable = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
}

const pointsTablePartTwo = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
}


function part1() {
    let lines = symbolLines
    let totalErrors = []
    let incompleteLines = []
    lines.forEach((line, lineIndex) => {
        let requiredClosingTags = []
        let isinComplete = true
        line.forEach((char) => {
            if (pairs[char]) {
                requiredClosingTags.push(pairs[char])
            } else {
                if (requiredClosingTags[requiredClosingTags.length - 1] === char) {
                    requiredClosingTags.pop()
                } else {
                    totalErrors = [...totalErrors, char]
                    requiredClosingTags.pop()
                    isinComplete = false
                }
            }
        })
        if (isinComplete) {
            incompleteLines = [...incompleteLines, line]
        }
    })
    let points = 0
    totalErrors.forEach(error => points += pointsTable[error])
    return [points, incompleteLines]
}

function part2() {
    let [part1Points, incompleteLines] = part1()
    let scores = []
    incompleteLines.forEach((line, index) => {
        let requiredClosingTags = []
        line.forEach(char => {
            if (pairs[char]) {
                requiredClosingTags = [...requiredClosingTags, pairs[char]]
            } else {
                requiredClosingTags.pop()
            }
        })
        let score = 0
        requiredClosingTags.reverse().forEach(value => {
            score = score * 5 + pointsTablePartTwo[value]
        })
        scores.push(score)
    })
    return scores.sort((a, b) => a - b)[(scores.length - 1) / 2]
}


console.table([["Solution Part 1", part1()[0]],
    ["Solution Part 2", part2()]])