const run_button = document.querySelector('button')

function execute() {
    var I = ["i", 0, 0, "num"]
    var display = ""
    var code = textArea.value.split(/\n/)
    var constaints = []
    var variables = []
    var programCounter = 0
    var pc_buffer = null
    var displayRows = 0

    constaints = readConstants(code)
    variables = readVariables(code)

    if (constaints == null || variables == null || crossCheckVariableAndConstants(constaints, variables)) {
        onRunError()
        return
    }

    if (!checkBlockIntegrity(code)) {
        onRunError()
        return
    }
    variables.push(I)

    while (programCounter < code.length) {
        if (!executeLine(code[programCounter], programCounter)) {
            onRunError()
            return
        }
        programCounter += 1
    }

    console.log(variables);
    console.log(constaints);
    console.log(display);

    function executeLine(line, pc) {
        variables = reapirVariables(variables)
        if (pc > code.length)
            return false
        console.log(line);
        var wordsInLine = line.split(/ /)
        wordsInLine = wordsInLine.filter(function (el) {
            return el != "";
        });
        switch (wordsInLine[0]) {
            case "const":
                break
            case "var":
                if (!getIfVarDeclaredInRow(variables, pc)) {
                    if (wordsInLine[3] == "prompt") {
                        var value = prompt(wordsInLine[1])
                        if (value == "false")
                            value = false
                        else if (value == "true")
                            value = true
                        else if (isNaN(parseInt(value)))
                            value = 0
                        else {
                            value = parseInt(value)
                        }
                        processAsignVariable(variables, constaints, wordsInLine[1], value)
                    } else
                    if (wordsInLine.length == 4) {
                        var buffer = wordsInLine[3]
                        variables = processAsignVariable(variables, constaints, wordsInLine[1], buffer)
                        if (variables == null) {
                            onRunError()
                            return false
                        }
                    } else if (wordsInLine.length > 4) {
                        var name_buffer = wordsInLine[1]
                        wordsInLine = wordsInLine.splice(3, 1000)
                        console.log(wordsInLine);
                        var value = calculateExpresion(wordsInLine, variables, constaints, pc)
                        if (value == null) {
                            onRunError()
                            return false
                        }
                        variables = processAsignVariable(variables, constaints, name_buffer, value)
                    } else {
                        onRunError()
                        return false
                    }
                }
                break
            case "alert":
                try {
                    var buffer = wordsInLine[1]
                    if (!processAlert(buffer, variables, constaints, pc)) {
                        onRunError()
                        return false
                    }
                } catch (e) {
                    onRunError()
                    return false
                }
                break
            case "println":
                if (wordsInLine.length == 1) {
                    display = processPrint(display, "", true)
                    displayRows += 1
                } else if (wordsInLine.length == 2) {
                    display = processPrint(display, variables, constaints, wordsInLine[1], true, pc)
                    displayRows += 1
                } else {
                    onRunError()
                    return false
                }
                if (display == null) {
                    onRunError()
                    return false
                }
                break
            case "print":
                if (wordsInLine.length == 1) {
                    display = processPrint(display, "", false)
                    displayRows += 1
                } else if (wordsInLine.length == 2) {
                    display = processPrint(display, variables, constaints, wordsInLine[1], false, pc)
                    displayRows += 1
                } else {
                    onRunError()
                    return false
                }
                if (display == null) {
                    onRunError()
                    return false
                }
                break
            case "clear":
                if (wordsInLine.length != 1) {
                    onRunError()
                    return false
                }
                displayRows = 0
                display = processClear()
                break;
            case "if":
                if (wordsInLine.length != 4) {
                    onRunError()
                    return false
                } else {
                    var breakLocation = getBreakLocation(code, pc) + 1
                    if (breakLocation == null) {
                        onRunError()
                        return false
                    }
                    var value1 = parseInt(wordsInLine[1])
                    var value2 = parseInt(wordsInLine[3])
                    if (isNaN(value1)) {
                        if (wordsInLine[1] == "false") {
                            value1 = 0
                        } else if (wordsInLine[1] == "true") {
                            value1 = 1
                        } else {
                            var b1 = getVariables(variables, wordsInLine[1], pc)
                            var b2 = getConstant(constaints, wordsInLine[1], pc)
                            if (b1 != null && b2 == null) {
                                value1 = b1
                            } else if (b1 == null && b2 != null) {
                                value1 = b2
                            } else {
                                onRunError()
                                return false
                            }
                        }
                    }
                    if (isNaN(value2)) {
                        if (wordsInLine[3] == "false") {
                            value2 = 0
                        } else if (wordsInLine[3] == "true") {
                            value2 = 1
                        } else {
                            var b1 = getVariables(variables, wordsInLine[3], pc)
                            var b2 = getConstant(constaints, wordsInLine[3], pc)
                            if (b1 != null && b2 == null) {
                                value2 = b1
                            } else if (b1 == null && b2 != null) {
                                value2 = b2
                            } else {
                                onRunError()
                                return false
                            }
                        }
                    }
                    var op = wordsInLine[2]
                    switch (op) {
                        case "!=":
                            if (value1 != value2) {
                                pc += 1
                                if (!executeBlock(pc, breakLocation)) {
                                    onRunError()
                                    return false
                                }

                            }
                            programCounter = breakLocation
                            break
                        case "==":
                            if (value1 == value2) {
                                pc += 1
                                if (!executeBlock(pc, breakLocation)) {
                                    onRunError()
                                    return false
                                }
                            }
                            programCounter = breakLocation
                            break
                        case "<":
                            if (value1 < value2) {
                                pc += 1
                                if (!executeBlock(pc, breakLocation)) {
                                    onRunError()
                                    return false
                                }
                            }
                            programCounter = breakLocation
                            break
                        case ">":
                            if (value1 > value2) {
                                pc += 1
                                if (!executeBlock(pc, breakLocation)) {
                                    onRunError()
                                    return false
                                }
                            }
                            programCounter = breakLocation
                            break
                        case "<=":
                            if (value1 <= value2) {
                                pc += 1
                                if (!executeBlock(pc, breakLocation)) {
                                    onRunError()
                                    return false
                                }
                            }
                            programCounter = breakLocation
                            break
                        case ">=":
                            if (value1 >= value2) {
                                pc += 1
                                if (!executeBlock(pc, breakLocation)) {
                                    onRunError()
                                    return false
                                }

                            }
                            programCounter = breakLocation
                            break
                        default:
                            onRunError()
                            return false
                            break
                    }
                }
                break
            case "break":
                break
            case "while":
                if (wordsInLine.length != 4) {
                    onRunError()
                    return false
                } else if (wordsInLine[2] != "in" && wordsInLine[1] != "i" && !isNaN(parseInt(wordsInLine[3]))) {
                    onRunError()
                    return false
                } else {
                    var break_location = getBreakLocation(code, pc) + 1
                    var max = parseInt(wordsInLine[3])
                    if (isNaN(max)) {
                        onRunError()
                        return false
                    } else if (break_location == null) {
                        onRunError()
                        return false
                    } else {
                        variables = setVariables(variables, "i", 0)
                        if (variables == null) {
                            onRunError()
                            return false
                        }
                        pc += 1
                        for (var i = 0; i < max; i++) {
                            variables = setVariables(variables, "i", i)
                            if (!executeBlock(pc, break_location)) {
                                onRunError()
                                return false
                            }
                        }
                        pc = break_location
                        programCounter = break_location
                        variables = setVariables(variables, "i", 0)
                    }
                }
                break;
            case "display":
                displayGUI(display, displayRows)
                break;
            case "beep":
                beep()
                break;
            default:
                onRunError()
                return false
                break
        }
        return true
    }

    function executeBlock(start, end) {
        for (var i = start; i < end; i++)
            if (!executeLine(code[i], i))
                return false
        return true;
    }

    textArea.style.backgroundColor = "#FFFE"
    textArea.style.color = "#000E"
}

function onRunError() {
    console.log("runtime error");
    textArea.value = ""
    textArea.rows = 1
    textArea.style.color = "#FFFE"
    textArea.style.backgroundColor = "#E44E"
}

run_button.addEventListener('click', execute)