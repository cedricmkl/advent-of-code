const fs = require("fs")
const path = require("path")
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const diagnosticReports = input.split("\n")


function part1() {
    let gammaRate = ""
    let epsilonRate = ""
    let currentBits = []

    for (let index = 0; index < 12; index++) {
        currentBits = []
        diagnosticReports.map(string => string.charAt(index)).forEach(bit => currentBits.push(bit))
        if (currentBits.filter(bit => bit === "0").length > (currentBits.length / 2)) {
            gammaRate += "0"
            epsilonRate += "1"
        } else {
            gammaRate += "1"
            epsilonRate += "0"
        }
    }
    return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
}

function part2() {
    let oxygenGeneratorRating = 0
    let co2ScrubberRating = 0

    let oxygenCo2Bits = diagnosticReports

    for (let i = 0; i < 12; i++) {
        const bits0 = oxygenCo2Bits.filter(value => value.charAt(i) === "0")
        const bits1 = oxygenCo2Bits.filter(value => value.charAt(i) === "1")
        if (bits0.length > bits1.length) {
            oxygenCo2Bits = bits0
        } else {
            oxygenCo2Bits = bits1
        }

        if (oxygenCo2Bits.length === 1) {
            oxygenGeneratorRating = parseInt(oxygenCo2Bits[0], 2)
            break
        }
    }

    let co2ScrubberBits = diagnosticReports

    for (let i = 0; i < 12; i++) {
        const bits0 = co2ScrubberBits.filter(value => value.charAt(i) === "0")
        const bits1 = co2ScrubberBits.filter(value => value.charAt(i) === "1")
        if (bits0.length > bits1.length) {
            co2ScrubberBits = bits1
        } else {
            co2ScrubberBits = bits0
        }

        if (co2ScrubberBits.length === 1) {
            co2ScrubberRating = parseInt(co2ScrubberBits[0], 2)
            break
        }

    }
    return oxygenGeneratorRating*co2ScrubberRating
}


console.table([["Solution Part 1", part1()], ["Solution Part 2", part2()]])