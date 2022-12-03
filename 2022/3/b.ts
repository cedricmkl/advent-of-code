const input = await Deno.readTextFile("./input.txt");
const backpacks = input.split("\n")
    .map((string) => string.split(""))

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
let sum = 0;

for (let i = 0; i < backpacks.length; i = i + 3) {    
    const item = backpacks[i].filter((it) => backpacks[i+1].includes(it) && backpacks[i+2].includes(it))[0]
    sum += alphabet.indexOf(item) + 1
}

console.log(sum);
