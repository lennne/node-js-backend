function add(a, b) {
    return a + b
}

function substract(a, b){
    return a - b
}

function divide(a, b ) {
    if (b === 0 ) {
        throw new Error("Cannot divide by 0")
    }
    return a / b
}