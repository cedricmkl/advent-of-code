const input = await Deno.readTextFile("./input.txt");

const terminalOutput: Array<string> = []
let currentOutput: Array<string> = []
for (const element of input.split("\n")) {
    if (element[0] === "$") {
        if (currentOutput.length > 0) {
            terminalOutput.push(currentOutput.join("\n"))
            currentOutput = []
        }
        terminalOutput.push(element)
        continue
    }
    currentOutput.push(element)
}

if (currentOutput.length > 0) {
    terminalOutput.push(currentOutput.join("\n"))
}

const files = new Map<Array<string>, number>()
const directories: Array<Array<string>> = []
let path: Array<string> = []
terminalOutput
    .forEach((string, index) => {
        if (!string.startsWith("$")) return
        const command = string.split(" ")
        if (command[1] === "cd") {
            const to = command[2]
            if (to === "/") path = []
            else if (to === "..") path.pop()
            else path.push(to)
        } else if (command[1] === "ls") {
            const output = terminalOutput[index + 1].split("\n").map((s) => s.split(" "))
            output.forEach((s) => {
                if (s[0] === "dir") {
                    const dir = [...path, s[1]]
                    if (!directories.includes(dir)) directories.push(dir)
                } else files.set([...path, s[1]], parseInt(s[0]))
            })
        }
    })

function isInSameDirectory(dir: Array<string>, file: Array<string>): boolean {
    for (let i = 0; i < dir.length; i++) {
        if (dir[i] != file[i]) return false
    }
    return true
}

const dirSizes = new Map<Array<string>, number>()

for (const dir of directories) {
    let sum = 0;
    [...files].filter((file) => isInSameDirectory(dir, file[0])).forEach((file) => sum += file[1])
    dirSizes.set(dir, sum)

}

const requiredDiscSpace = 30_000_000 - (70_000_000 - [...files].map(s => s[1]).reduce((a, b) => a + b))

console.log([...dirSizes].filter((dir) => dir[1] >= requiredDiscSpace).sort((a, b) => a[1] - b[1])[0][1])