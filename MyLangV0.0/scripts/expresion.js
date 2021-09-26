function calculateExpresion(expresion, variables, constants, pc) {
    var data = expresion
    var buffer = parseInt(expresion[0])
    if (isNaN(buffer)) {
        var b1 = getConstant(constants, data[0], pc)
        var b2 = getVariables(variables, data[0], pc)
        if (b1 == null && b2 == null) {
            return null
        } else if (b1 != null)
            buffer = b1
        else if (b2 != null)
            buffer = b2
        if (expresion[0] == true) {
            buffer = 1
        } else if (expresion[0] == false) {
            buffer = 0
        }
        if (buffer == null)
            buffer = getConstant(constants, expresion[0], pc)
        if (buffer == null)
            return null
    }
    if (expresion.length % 2 != 1)
        return null

    for (var i = 0; i < ((data.length - 1) / 2); i++) {
        var index = i * 2 + 1
        var value = parseInt(data[index + 1]);
        if (isNaN(value)) {
            if (data[index + 1] == false)
                value = 0
            else if (data[index + 1] == true)
                value = 1
            else {
                var b1 = getConstant(constants, data[index + 1], pc)
                var b2 = getVariables(variables, data[index + 1], pc)
                if (b1 == null && b2 == null) {
                    return null
                } else if (b1 != null)
                    value = b1
                else if (b2 != null)
                    value = b2
            }
        }
        switch (data[index]) {
            case "**":
                buffer **= value
                break
            case "*":
                buffer *= value
                break
            case "/":
                buffer /= value
                break
            case "+":
                buffer += value
                break
            case "-":
                buffer -= value
                break
            default:
                return null
                break
        }
    }
    console.log(buffer);
    return buffer
}