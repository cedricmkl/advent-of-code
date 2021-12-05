const fs = require("fs")
const path = require("path")
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const lineCoordinates = input.split("\n").map(value => {
    const coordinates = value.split(" -> ")
    return ({
        x1: parseInt(coordinates[0].split(",")[0]),
        y1: parseInt(coordinates[0].split(",")[1]),
        x2: parseInt(coordinates[1].split(",")[0]),
        y2: parseInt(coordinates[1].split(",")[1])
    })
})


function part1() {
    const coordinates = lineCoordinates.filter(value => value.x1 === value.x2 || value.y1 === value.y2)
    const maxX = Math.max(coordinates.sort(a => Math.max(a.x1, a.x2))[0].x1, coordinates.sort(a => Math.max(a.x1, a.x2))[0].x2)
    const maxY = Math.max(coordinates.sort(a => Math.max(a.y1, a.y2))[0].y1, coordinates.sort(a => Math.max(a.y1, a.y2))[0].y2)
    const points = []
    coordinates.forEach(value => {
        const {x1, y1, x2, y2} = value
        if (x1 === x2) {
            for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                const point = points.find(value1 => value1.x === x1 && value1.y === y) || {x: x1, y: y, count: 1}
                const index = points.indexOf(point)
                if (index === -1) {
                    points.push(point)
                } else {
                    points[index] = {x: point.x, y: point.y, count: point.count + 1}
                }
            }
        } else {
            for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
                const point = points.find(value1 => value1.x === x && value1.y === y1) || {x: x, y: y1, count: 1}
                const index = points.indexOf(point)
                if (index === -1) {
                    points.push(point)
                } else {
                    points[index] = {x: point.x, y: point.y, count: point.count + 1}
                }
            }
        }
    })
    return points.filter(value => value.count > 1).length
}


function part2() {
    const coordinates = lineCoordinates
    const maxX = Math.max(coordinates.sort(a => Math.max(a.x1, a.x2))[0].x1, coordinates.sort(a => Math.max(a.x1, a.x2))[0].x2)
    const maxY = Math.max(coordinates.sort(a => Math.max(a.y1, a.y2))[0].y1, coordinates.sort(a => Math.max(a.y1, a.y2))[0].y2)
    const points = []
    coordinates.forEach(value => {
        const {x1, y1, x2, y2} = value
        const maxX = Math.max(x1, x2)
        const minX = Math.min(x1, x2)
        const maxY = Math.max(y1, y2)
        const minY = Math.min(y1, y2)
        if (x1 === x2) {
            for (let y = minY; y <= maxY; y++) {
                const point = points.find(value1 => value1.x === x1 && value1.y === y) || {x: x1, y: y, count: 1}
                const index = points.indexOf(point)
                if (index === -1) {
                    points.push(point)
                } else {
                    points[index] = {x: point.x, y: point.y, count: point.count + 1}
                }
            }
        } else if (y1 === y2) {
            for (let x = minX; x <= maxX; x++) {
                const point = points.find(value1 => value1.x === x && value1.y === y1) || {x: x, y: y1, count: 1}
                const index = points.indexOf(point)
                if (index === -1) {
                    points.push(point)
                } else {
                    points[index] = {x: point.x, y: point.y, count: point.count + 1}
                }
            }
        } else {
            const xCoordinates = []
            const yCoordinates = []
            for (let x = minX; x <= maxX; x++) {
                xCoordinates.push(x)
            }

            if ((x1 > x2 && y1 > y2) || (x1 < x2 && y1 < y2)) {
                for (let y = minY; y <= maxY; y++) {
                    yCoordinates.push(y)
                }
            }else  {
                for (let y = maxY; y >= minY; y--) {
                    yCoordinates.push(y)
                }
            }
            xCoordinates.forEach((x, index) => {
                const point = points.find(value1 => value1.x === x && value1.y === yCoordinates[index]) || {x: x, y: yCoordinates[index], count: 1}
                const pointIndex = points.indexOf(point)
                if (pointIndex === -1) {
                    points.push(point)
                } else {
                    points[pointIndex] = {x: point.x, y: point.y, count: point.count + 1}
                }
            })
        }
    })
    return points.filter(value => value.count > 1).length
}


console.table([["Solution Part 1", part1()], ["Solution Part 2", part2()]])