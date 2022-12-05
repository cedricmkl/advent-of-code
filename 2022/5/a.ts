const input = await Deno.readTextFile("./input.txt");
const parsed = input.split("\n\n").map((s) => s.split("\n"))

type Instruction = {
    count: number,
    from: number,
    to: number
}

const instructions: Array<Instruction> = parsed[1]
    .map((s) => s.split(" "))
    .map((s) => ({
        count: parseInt(s[1]),
        from: parseInt(s[3]),
        to: parseInt(s[5])
    }))

const crates: Array<Array<string>> = []

for (let i = 1; i < parsed[0][parsed[0].length - 1].length; i = i + 4) {
    crates[(i - 1) / 4] = parsed[0].filter((_, index) => index != parsed[0].length - 1)
        .map((s) => s.charAt(i))
        .filter((s) => s !== " ")
        .reverse()
}

instructions.forEach((instruction) => {
    for (let i = 0; i < instruction.count; i++) {
        const element = crates[instruction.from - 1].pop()!
        crates[instruction.to - 1].push(element)
    }
})

console.log(crates.map(arr => arr[arr.length - 1]).join(""))