const input = await Deno.readTextFile("./input.txt");

for (let i = 13; i < input.length; i++) {
    const list = []
    for (let j = i - 13; j < i + 1; j++) {
        list.push(input[j])
    }
    if (!containsDuplicates(list)) {
        console.log(list)
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