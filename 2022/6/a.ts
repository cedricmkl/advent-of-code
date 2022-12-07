const input = await Deno.readTextFile("./input.txt");

for (let i = 3; i < input.length; i++) {
    if (!containsDuplicates([input[i - 3], input[i - 2], input[i - 1], input[i]])) {
        console.log(i + 1)
        break
    }
}


function containsDuplicates(array: Array<string>) {
    for (let i = 0; i < array.length; i++) {
        if (array.indexOf(array[i]) !== array.lastIndexOf(array[i])) {
            return true
        }
    }
    return false
}