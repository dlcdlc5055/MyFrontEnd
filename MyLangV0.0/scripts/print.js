function processPrint(display,variables, constants, value, ln,pc) {
    var buffer = display
    if (value == "true")
        buffer += "true"
    else if (value == "false")
        buffer += "false"
    else if (!isNaN(parseInt(value, 10)))
        buffer += value
    else {
        var found = false
        for (v of variables)
            if (v[0] == value && v[2] <= pc) {
                buffer += v[1].toString()
                found = true
            }
        for (c of constants)
            if (c[0] == value && c[2] <= pc) {
                buffer += c[1].toString()
                found = true
            }
        if (!found)
            return null
    }
    if (ln)
        buffer += "\n"
    return buffer
}