const fs = require("fs")
const path = require("path")
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const elements = input.split("\n\n")
const numbersDrawn = elements[0].split(",").map(string => parseInt(string))

function createBoards() {
    let boards = []
    for (let index = 1; index < elements.length; index++) {
        let board = []
        elements[index].split("\n").forEach(value => {
            const numbers = value.trim().split(/\s+/).map(string => parseInt(string))
            board = [...board, numbers]
        })
        boards.push(board)
    }
    return boards
}

function validate(board) {
    let valid = false
    board.forEach(row => {
        if (row.filter(value => value === "X").length === 5) valid = true
    })

    for (let i = 0; i < 5; i++) {
        if (board[0][i] === "X"
            && board[1][i] === "X"
            && board[2][i] === "X"
            && board[3][i] === "X"
            && board[4][i] === "X") {
            valid = true
        }
    }

    return valid
}

function part1() {
    let boards = createBoards()

    let winner = null
    let calledNumber = 0
    numbersDrawn.forEach(i => {
        if (winner) return
        const newBoards = []
        boards.forEach(board => {
            let changed = false
            const newBoard = []
            board.forEach(row => {
                newBoard.push(row.map(value => {
                    if (value === i) {
                        changed = true
                        return "X"
                    }
                    return value
                }))
            })
            newBoards.push(newBoard)
            if (changed && validate(newBoard)) {
                winner = newBoard
                calledNumber = i
            }
        })
        boards = newBoards
    })

    let totalUnmarked = 0

    winner.forEach(row => {
        row.forEach(value => {
            if (value !== "X") {
                totalUnmarked += value
            }
        })
    })
    return totalUnmarked * calledNumber
}


function part2() {
    let boards = createBoards()

    let lastWinner = null
    let calledNumber = 0
    numbersDrawn.forEach(i => {
        if (lastWinner) return
        const newBoards = []
        boards.forEach(board => {
            let changed = false
            const newBoard = []
            board.forEach(row => {
                newBoard.push(row.map(value => {
                    if (value === i) {
                        changed = true
                        return "X"
                    }
                    return value
                }))
            })
            if (changed && validate(newBoard)) {
                if (boards.length === 1) {
                    lastWinner = newBoard
                    calledNumber = i
                }
            }else {
                newBoards.push(newBoard)
            }
        })
        boards = newBoards
    })

    let totalUnmarked = 0

    lastWinner.forEach(row => {
        row.forEach(value => {
            if (value !== "X") {
                totalUnmarked += value
            }
        })
    })
    return totalUnmarked * calledNumber
}


console.table([["Solution Part 1", part1()], ["Solution Part 2", part2()]])