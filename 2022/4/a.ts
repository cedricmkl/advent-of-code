const input = await Deno.readTextFile("./input.txt");

type Assingnment = [number, number]
const assingmentPairs: Array<[Assingnment, Assingnment]> = input.split("\n")
    .map((pair) => [pair.split(",")[0].split("-").map((s) => parseInt(s)), 
        pair.split(",")[1].split("-").map((s) => parseInt(s))] as [Assingnment, Assingnment])

function doesFullyOverlap(pair: [Assingnment, Assingnment]): boolean {
    const pair1Nums = range(pair[0][0], pair[0][1])
    const pair2Nums = range(pair[1][0], pair[1][1])
    return pair1Nums.filter((i) => !pair2Nums.includes(i)).length === 0 || pair2Nums.filter((i) => !pair1Nums.includes(i)).length === 0
}

function range(start: number, end: number) {
    let list = [];
    for (let i = start; i <= end; i++) {
        list.push(i);
    }
    return list
}

console.log(assingmentPairs.filter((pair) => doesFullyOverlap(pair)).length)


