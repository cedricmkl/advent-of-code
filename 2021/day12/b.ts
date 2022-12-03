const input = await Deno.readTextFile("./input.txt");

const caveConnections = input.split("\n").map((connection) => connection.split("-"))

caveConnections.forEach((connection) => caveConnections.push([connection[1], connection[0]]))

let paths: Array<Array<string>> = []
//[...path]
function walk(currentCave: string, path: Array<string>) {
    path = [...path, currentCave]

    if (currentCave === "end") {
        paths.push(path) 
        return
    }
    
    getAllConnectionsFrom(currentCave, path).forEach((connectedCave) => {        
        //console.log("Let's go from", currentCave, "to", connectedCave, "path is", path)
        walk(connectedCave, path)
    })
}

function canVisitCave(caveToVisit: string, path: Array<string>): boolean {
    if(caveToVisit === "end") return true
    if(caveToVisit === "start") return false
    if(caveToVisit.toLowerCase() === caveToVisit) {
        if (path.filter((c) => c.toLowerCase() === c)
                .filter((c) => getOccurrence(path, c) > 1).length > 0 && getOccurrence(path, caveToVisit) > 0 ) return false
    }
    return true
}

function getAllConnectionsFrom(currentCave: string, path: Array<string>): Array<string> {
    return caveConnections.filter((connection) => connection[0] === currentCave 
    && canVisitCave(connection[1], path)).map((connection) => connection[1])
}


function getOccurrence(array: Array<string>, value: string): number {
    let count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

getAllConnectionsFrom("start", ["start"]).forEach((connectedCave) => walk(connectedCave, ["start"]))
console.log("paths", paths.length);
