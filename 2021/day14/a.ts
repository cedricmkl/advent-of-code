const input = await Deno.readTextFile("./input.txt");
const parsed = input.split("\n\n")
const template = parsed[0]
const rules = parsed[1].split("\n").map((rule) => rule.split(" -> "))


let polymer = template.split("")

for (let i = 1; i < 11; i++) {
    let polymerCopy = polymer.map((rule) => rule)
    let appliedRules = 0
    for (let j = 0; j < polymerCopy.length - 1; j++) {
        const chars = `${polymerCopy[j]}${polymerCopy[j + 1]}`
        const rule = rules.find((rule) => rule[0] === chars)

        if(rule != null) {
            polymer.splice(j + 1 + appliedRules, 0, rule[1])
            appliedRules++
        }
    }
   console.log("Step", i, polymer.join(""))
}


const sorted = polymer.sort((a, b) => getOccurrence(polymer, b) - getOccurrence(polymer, a))

console.log(getOccurrence(sorted, sorted[0]) - getOccurrence(sorted, sorted[sorted.length - 1]))

function getOccurrence(array: Array<string>, value: string): number {
    let count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

