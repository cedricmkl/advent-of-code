const fs = require("fs")
const path = require("path")
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const measurements = input.split("\n").map(measurement => Number.parseInt(measurement))

//Part 1
let lastMeasurment = undefined
let totalLargerMeasurments = 0

measurements.forEach(measurement => {
    if(lastMeasurment != undefined && measurement > lastMeasurment) totalLargerMeasurments++
    lastMeasurment = measurement
})

//Part 2
let totalLargerWindowedMeasurments = 0
for(let i = 3; i < measurements.length; i++) {
    const last = measurements[i - 1] + measurements[i - 2] + measurements[i - 3]
    const current = measurements[i] + measurements[i - 1] + measurements[i - 2]
    if(current > last) totalLargerWindowedMeasurments++
}

console.table([["Total measurments", measurements.length],
 ["Total larger measurments", totalLargerMeasurments], 
 ["Total larger windowed measurments", totalLargerWindowedMeasurments]])