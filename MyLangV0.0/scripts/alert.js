function processAlert(value, variables, constants, pc) {
    if (value == "true")
        alert("true")
    else if (value == "false")
        alert("false")
    else if (!isNaN(parseInt(value, 10)))
        alert(parseInt(value, 10))
    else {
        var found = false
        for (v of variables)
            if (v[0] == value && v[2] <= pc) {
                alert(v[1])
                found = true
            }
        for (c of constants)
            if (c[0] == value && c[2] <= pc) {
                alert(c[1])
                found = true
            }
        return found
    }
    return true
}