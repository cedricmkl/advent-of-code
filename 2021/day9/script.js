const fs = require("fs")
const path = require("path")
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const heightMap = input.split("\n").map(value => value.split("").map(value1 => parseInt(value1)))

function getAdjacentPoints(x, y) {
    const row = heightMap[y]
    const points = []
    if (x > 0) {
        points.push({x: x - 1, y, height: row[x - 1]})
    }

    if (x < row.length - 1) {
        points.push({x: x + 1, y, height: row[x + 1]})
    }

    if (y > 0) {
        points.push({x, y: y - 1, height: heightMap[y - 1][x]})
    }

    if (y < heightMap.length - 1) {
        points.push({x, y: y + 1, height: heightMap[y + 1][x]})
    }
    return points
}

function part1() {
    let riskLevel = 0
    heightMap.forEach((row, y) => {
        row.filter((height, x) => Math.min(...getAdjacentPoints(x, y).map(value => value.height)) > height)
            .forEach(value => riskLevel += value + 1)
    })

    return riskLevel
}

function getTotalAdjacentPointsSize(x, y) {
    const isNotNine = (value) => value.height !== 9
    heightMap[y][x] = 9
    let size = 1
    let points = [{x, y}]
    while (points.length > 0) {
        let nextPoints = []
        points.forEach(point => {
            getAdjacentPoints(point.x, point.y).filter(isNotNine).filter(isNotNine).forEach(value => {
                heightMap[value.y][value.x] = 9
                size += 1
                nextPoints.push({x: value.x, y: value.y})
            })
        })
        points = nextPoints
    }
    return size
}

function part2() {
    let basins = []
    let basinCoordinates = []

    for (let y = 0; y < heightMap.length; y++) {
        const row = heightMap[y]
        for (let x = 0; x < row.length; x++) {
            const entry = row[x]
            if (entry === 9 || basinCoordinates.includes({x, y})) continue
            basinCoordinates.push({x, y})
            const basinSize = getTotalAdjacentPointsSize(x, y)
            const min = Math.min(...basins)
            if (basins.length < 3) {
                basins.push(basinSize)
            } else if (basinSize > min) {
                basins.splice(basins.indexOf(min), 1)
                basins.push(basinSize)
            }
        }
    }
    return basins[0] * basins[1] * basins[2]
}


console.table([["Solution Part 1", part1()],
    ["Solution Part 2", part2()]])