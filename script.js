function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
} 

function operate(x, y, operator) {
    return operator === add
        ? add(x, y)
        : operator === subtract
        ? subtract(x, y)
        : operator === multiply
        ? multiply(x, y)
        : operator === divide
        ? divide(x, y)
        : "ERROR: Invalid operator";
}