const input = await Deno.readTextFile("./input.txt");
const backpacks = input.split("\n")
    .map((string) => [
        string.substring(0, string.length / 2).split(""), 
        string.substring(string.length / 2, string.length).split("")
    ])

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
let sum = 0;
for (const [com1, com2] of backpacks) {
    const item = com1.filter((i) => com2.includes(i))[0]
    sum += alphabet.indexOf(item) + 1
} 

console.log(sum);
