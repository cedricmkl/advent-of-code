const input = await Deno.readTextFile("./input.txt");

type Tree = {
    height: number,
    scenicScore: number
}

const trees: Array<Array<Tree>> = input.split("\n")
    .map((row) => row.split("").map((height => ({ height: parseInt(height), scenicScore: 1 }))))

for (let y = 1; y < trees.length - 1; y++) {
    for (let x = 1; x < trees[y].length - 1; x++) {
        const tree = trees[y][x]
        tree.scenicScore = calculateViewDistance(x, y, tree.height, 1, "X") * calculateViewDistance(x, y, tree.height, -1, "X")
            * calculateViewDistance(x, y, tree.height, 1, "Y") * calculateViewDistance(x, y, tree.height, -1, "Y")
    }
}

function calculateViewDistance(x: number, y: number, height: number, step: number, direction: "X" | "Y"): number {
    let current = (direction === "X" ? x : y) + step
    let viewDistance = 0
    while (current >= 0 && current <= (direction === "X" ? trees[y].length : trees.length) - 1) {
        const tree = direction === "X" ? trees[y][current] : trees[current][x]
        viewDistance++
        if (tree.height >= height) {
            break
        }
        current += step
    }
    return viewDistance
}

console.log(trees.flat().sort((a, b) => b.scenicScore - a.scenicScore)[0].scenicScore)