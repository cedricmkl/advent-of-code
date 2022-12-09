const input = await Deno.readTextFile("./input.txt");

type Tree = {
    height: number,
    visible: boolean
}

const trees: Array<Array<Tree>> = input.split("\n")
    .map((row) => row.split("").map((height => ({ height: parseInt(height), visible: true }))))

for (let y = 1; y < trees.length - 1; y++) {
    for (let x = 1; x < trees[y].length - 1; x++) {
        const tree = trees[y][x]
        tree.visible = doesShorterTreesExist(x, y, tree.height, 1, "X") || doesShorterTreesExist(x, y, tree.height, -1, "X")
            || doesShorterTreesExist(x, y, tree.height, 1, "Y") || doesShorterTreesExist(x, y, tree.height, -1, "Y")
    }
}

function doesShorterTreesExist(x: number, y: number, height: number, step: number, direction: "X" | "Y"): boolean {
    let current = (direction === "X" ? x : y) + step
    while (current >= 0 && current <= (direction === "X" ? trees[y].length : trees.length) - 1) {
        const tree = direction === "X" ? trees[y][current] : trees[current][x]
        if (tree.height >= height) {
            return false
        }
        current += step
    }
    return true
}

console.log(trees.flat().filter(tree => tree.visible).length)