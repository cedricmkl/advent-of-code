const fs = require("fs")
const path = require("path")
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")


function getFishes(days) {
    let fishes = []

    const addFish = (day, amount, fisches) => {
        if (fisches[day] !== undefined) {
            fisches[day] += amount
        } else {
            fisches[day] = amount
        }
    }


    input.split(",").forEach(value => {
        addFish(value, 1, fishes)
    })
    console.log(fishes)

    for (let day = 0; day < days; day++) {
        let oldFishes = fishes
        fishes = []

        oldFishes.forEach((amount, day) => {
            if (day === 0) {
                addFish(6, amount, fishes)
                addFish(8, amount, fishes)
            } else {
                addFish(day - 1, amount, fishes)
            }
        })

    }
    let sum = 0
    fishes.forEach(value => sum += value)
    return sum
}


console.table([["Solution Part 1", getFishes(80)], ["Solution Part 2", getFishes(256)]])