const input = await Deno.readTextFile("./input.txt");

parsePacket(parseInt(input, 16).toString(2).split(""))


function parsePacket(data: Array<string>) {
    const version = parseInt(data.splice(0, 3).join(""), 2)
    const typeId = parseInt(data.splice(0, 3).join(""), 2)

    console.log(version, typeId);
    
    if(typeId === 4) {
        //Literal Packet
        parseLiteralPacket(data)
    }else {
        //Operator Packet
        parseOperatorPacket(data)
    }
}

function parseLiteralPacket(data: Array<string>): number {
    let numberString = ""
    while(true) {
        let lastChunk = data.splice(0, 1)[0] === "0"
        numberString += data.splice(0, 4).join("")
        if(lastChunk) break
    }
    return parseInt(numberString, 2)
}

function parseOperatorPacket(data: Array<string>) {
    const lengthTypeId = data.splice(0, 1)[0]
    if(lengthTypeId === "0") {
        const totalSubPacketLength = parseInt(data.splice(0, 15).join(""), 2)
        while() {
            parsePacket(data)
        }
    }else {

    }
}
