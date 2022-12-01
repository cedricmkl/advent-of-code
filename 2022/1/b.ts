const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n\n")

const calories = []

for (const line of lines) {
    calories.push(line.split("\n").map((string) => parseInt(string)).reduce((a, b) => a + b))
}

console.log(calories.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b))