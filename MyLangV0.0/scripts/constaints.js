function readConstants(file) {
    var buffer = [];
    var mask = generateMask(file)
    var i = 0
    for (line of file) {
        var wordsInLine = line.split(/ /)
        var constaint = []

        wordsInLine = wordsInLine.filter(function (el) {
            return el != "";
        });

        if (wordsInLine[0] == "const") {
            if (wordsInLine.length != 4)
                return null
            if (!mask[i])
                return null;
            constaint.push(wordsInLine[1])
            if (wordsInLine[2] != '=') {
                return null
            }
            if (wordsInLine[3] == "true") {
                constaint.push(true)
                constaint.push(i)
                constaint.push("bool")
            } else if (wordsInLine[3] == "false") {
                constaint.push(false)
                constaint.push(i)
                constaint.push("bool")
            } else {
                if (!isNaN(parseInt(wordsInLine[3], 10)))
                    constaint.push(parseInt(wordsInLine[3], 10))
                else
                    return null
                constaint.push(i)
                constaint.push("num")
            }
            if (!checkValidName(wordsInLine[1]))
                return
            if (getConstant(buffer, wordsInLine[1], 999999999) != null)
                return null
            buffer.push(constaint)
        }
        i++
    }
    return buffer
}

function getConstant(constaints, name, row) {
    for (constaint of constaints) {
        if (constaint[0] == name && constaint[2] <= row)
            return constaint[1]
    }
    return null
}