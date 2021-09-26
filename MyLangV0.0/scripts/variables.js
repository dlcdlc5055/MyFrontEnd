function readVariables(file) {
    var buffer = [];
    var mask = generateMask(file)
    var i = 0
    for (line of file) {
        var wordsInLine = line.split(/ /)
        var variable = []

        wordsInLine = wordsInLine.filter(function (el) {
            return el != "";
        });

        if (wordsInLine[0] == "var") {
            if (getVariables(buffer, wordsInLine[1], 999999999) == null) {
                if (wordsInLine.length != 4)
                    return null
                if (!mask[i])
                    return null;
                variable.push(wordsInLine[1])
                if (wordsInLine[2] != '=') {
                    return null
                }
                if (wordsInLine[3] == "true") {
                    variable.push(true)
                    variable.push(i)
                    variable.push("bool")
                } else if (wordsInLine[3] == "false") {
                    variable.push(false)
                    variable.push(i)
                    variable.push("bool")
                } else if (wordsInLine[3] == "prompt") {
                    var name = wordsInLine[1]
                    var value = prompt(name)
                    if (value == "false") {
                        value = false
                        variable.push(value)
                        variable.push(i)
                        variable.push("bool")
                    } else if (value == "true") {
                        value = true
                        variable.push(value)
                        variable.push(i)
                        variable.push("bool")
                    } else if (isNaN(parseInt(value))) {
                        value = 0
                        variable.push(value)
                        variable.push(i)
                        variable.push("num")
                    } else {
                        value = parseInt(value)
                        variable.push(value)
                        variable.push(i)
                        variable.push("num")
                    }
                } else {
                    if (!isNaN(parseInt(wordsInLine[3], 10)))
                        variable.push(parseInt(wordsInLine[3], 10))
                    else
                        return null
                    variable.push(i)
                    variable.push("num")
                }
                buffer.push(variable)
                if (!checkValidName(wordsInLine[1]))
                    return null
            }
        }
        i++
    }
    return buffer
}

function getVariables(variables, name, row) {
    for (variable of variables)
        if (variable[0] == name && variable[2] <= row)
            return variable[1]
    return null
}

function setVariables(variables, name, value) {
    var buffer = variables
    for (i in buffer)
        if (buffer[i][0] == name)
            buffer[i][1] = value
    return buffer
}

function processAsignVariable(variables, constants, name, value) {
    var buffer = variables
    for (i in variables) {
        if (buffer[i][0] == name) {
            if (value == "true") {
                buffer[i][1] = true
            } else if (value == "false") {
                buffer[i][1] = false
            } else if (!isNaN(parseInt(value, 10))) {
                buffer[i][1] = parseInt(value, 10)
            } else {
                var found = false
                for (v of variables) {
                    if (v[0] == value) {
                        buffer[i][1] = v[1]
                        found = true
                    }
                }
                for (c of constants) {
                    if (c[0] == value) {
                        buffer[i][1] = c[1]
                        found = true
                    }
                }
            }
        }
    }
    return buffer
}

function removeVariable(variables, name) {
    var buffer = variables
    buffer = buffer.filter((e) => {
        return e[0] != name
    })
    return buffer
}

function reapirVariables(variables) {
    var buffer = variables
    for (i in buffer) {
        buffer[i][1] = Math.floor(buffer[i][1])
    }
    return buffer
}