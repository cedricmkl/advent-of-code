const input = await Deno.readTextFile("./input.txt");

const caveConnections = input.split("\n").map((connection) => connection.split("-"))

caveConnections.forEach((connection) => caveConnections.push([connection[1], connection[0]]))
let paths = 0
function walk(cave: string, path: Array<string>) {
    if(cave === "end") {
        paths++
        return
    }
    getAllConnectionsFrom(cave, path).forEach((connectedCave) => {
        walk(connectedCave, [...path, connectedCave])
    })
}

function getAllConnectionsFrom(cave: string, path: Array<string>): Array<string> {
    return caveConnections.filter((connection) => connection[0] === cave 
    && !(connection[1].toLowerCase() === connection[1] && path.includes(connection[1]))).map((connection) => connection[1] )
}

getAllConnectionsFrom("start", ["start"]).forEach((connectedCave) => walk(connectedCave, ["start", connectedCave]))

console.log("paths", paths);
