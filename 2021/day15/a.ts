const input = await Deno.readTextFile("./input.txt");
const grid = input.split("\n").map((s) => s.split("").map((riskLevel) => parseInt(riskLevel)))

type Node = [number, number]

const data = new Map<string, [Node | undefined, number]>
data.set(toMapKey([0, 0]), [undefined, 0])

let que: Array<Node> = [[0, 0]]
while (que.length > 0) {
    que = que.sort((a, b) => data.get(toMapKey(a))![1] - data.get(toMapKey(b))![1])
    const node = que.shift()!
    getNeighbours(node).forEach((neighbourNode) => {
        const cost = getCost(node) + grid[neighbourNode[1]][neighbourNode[0]]
        if (getCost(neighbourNode) > cost) {
            data.set(toMapKey(neighbourNode), [node, cost])
            que.push(neighbourNode)
        }
    })
}

function getCost(node: Node): number {
    const nodeData = data.get(toMapKey(node))
    if (nodeData === undefined) return Infinity
    return nodeData[1]
}

function getNeighbours(node: Node): Array<[number, number]> {
    const neigbours: Array<[number, number]> = []
    if (node[0] > 0) neigbours.push([node[0] - 1, node[1]])
    if (node[0] < grid[0].length - 1) neigbours.push([node[0] + 1, node[1]])
    if (node[1] > 0) neigbours.push([node[0], node[1] - 1])
    if (node[1] < grid.length - 1) neigbours.push([node[0], node[1] + 1])
    return neigbours
}

function toMapKey(node: Node): string {
    return `${node[0]}|${node[1]}`
}

console.log(getCost([grid[0].length - 1, grid.length - 1]))
