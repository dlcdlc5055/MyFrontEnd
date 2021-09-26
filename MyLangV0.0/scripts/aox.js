function generateMask(code) {
    var buffer = []
    var value = true
    for (line of code) {
        var wordsInLine = line.split(/ /)
        wordsInLine = wordsInLine.filter(function (el) {
            return el != "";
        });
        if (wordsInLine[0] == "if" || wordsInLine[0] == "while")
            value = false
        else if (wordsInLine[0] == "break")
            value = true
        buffer.push(value)
    }
    return buffer
}

function crossCheckVariableAndConstants(constants, variables) {
    for (constant of constants) {
        for (variable of variables) {
            if (constant[0] == variable[0]) {
                return true
            }
        }
    }
    return false
}

function checkValidName(name) {
    var numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    var first = name.charAt(0)
    var buffer = []
    for (nr of numbers)
        if (nr == first)
            return false
    for (var i = 0; i < name.length; i++)
        buffer.push(name.charAt(i))
    for (value of buffer)
        if (value == "-" || value == "+" || value == "/" || value == "*" || value == "\\" || value == "{" || value == "}" || value == '"' || value == "'" || value == "^" || value == "&" || value == "$" || value == "#" || value == "!" || value == "@" || value == "~" || value == "`" || value == "<" || value == ">" || value == "=" || value == ";" || value == ":" || value == "[" || value == "]" || value == "|")
            return false
    if (name === "false" || name === "true" || name === "const" || name === "var" || name === "if" || name === "while" || name === "break" || name === "prompt"||name==="i")
        return false
    return true
}

function getIfVarDeclaredInRow(variables, row) {
    for (v of variables)
        if (v[2] == row)
            return true
    return false
}

function getBreakLocation(code, row) {
    var i = 0
    for (line of code) {
        var buffer = line.split(/ /)[0]
        if (buffer == "break" && i > row) {
            return i - 1
        }
        i += 1
    }
    return null
}

function checkBlockIntegrity(code) {
    var ifs = 0
    var whiles = 0
    var breaks = 0
    for (line of code) {
        var wordsInLine = line.split(/ /)
        wordsInLine = wordsInLine.filter(function (el) {
            return el != "";
        });
        try {
            var buffer = wordsInLine[0]
            if (buffer == "while")
                whiles += 1
            else if (buffer == "if")
                ifs += 1
            else if (buffer == "break")
                breaks += 1
        } catch (e) {
            return false;
        }
    }
    var buffer = ifs + whiles
    if (buffer == breaks)
        return true;
    else
        return false
}