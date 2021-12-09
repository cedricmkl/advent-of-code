const fs = require("fs")
const path = require("path")
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const digitInput = input.split("\n").map(value => {
    const split = value.split("|").map(value1 => value1.trim())
    return [split[0].split(" "), split[1].split(" ")]
})


function check(input, chars) {
    return chars.split("").every(value1 => input.includes(value1))
}


function part1() {
    let totalChars = 0
    digitInput.forEach(value => {
        const [input, output] = value
        totalChars += output.filter(value1 => value1.length === 2 ||
            value1.length === 4 || value1.length === 3 || value1.length === 7).length
    })
    return totalChars
}

function part2() {
    let sum = 0
    digitInput.forEach(value => {
        let [digits, output] = value

        const find = (condition) => {
            if (typeof condition === "number") {
                const length = condition
                condition = (a) => a.length === length
            }
            return digits.splice(digits.findIndex(condition), 1)[0];
        }

        const substract = (a, b) => {
            return a.split("").filter((c) => !b.includes(c)).join("");
        }

        const includes = (a, b) => {
            return substract(a, b).length === 0
        }

        const signals = {
            1: find(2),
            4: find(4),
            7: find(3),
            8: find(7)
        }

        signals[9] = find(a => includes(a, signals[4]))

        //remaining with 6 signals: 6, 0 | 0 has a 1 in it
        signals[0] = find(a => (a.length === 6) && includes(a, signals[1]))

        //only remaining with 6 signals
        signals[6] = find(6)

        //3 contains a 7 in it
        signals[3] = find((a) => includes(a, signals[7]))

        //only 2 and 5 remain
        //2 has 2 signals in common with 4, 5 has 3
        signals[2] = find(a => substract(signals[4], a).length === 2)

        signals[5] = find(5)

        let outputValue = ""
        output.forEach((digits) => {
            for (let signalsKey in signals) {
                if (check(digits, signals[signalsKey])) {
                    outputValue += signalsKey
                    console.log(signalsKey)
                }
            }
        })
        console.log(outputValue)
        sum += parseInt(outputValue)

    })
    return sum
}


console.table([["Solution Part 1", part1()],
    ["Solution Part 2", part2()]])