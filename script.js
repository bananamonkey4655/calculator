/* Calculator operation functions*/
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
    return y === 0
        ? "ERROR! Dividing by zero"
        : x / y;
} 

function operate(x, y, operator) {
    x = Math.round(x * 10000000) / 10000000;
    y = Math.round(y * 10000000) / 10000000;

    console.log(x, y);

    return operator === 'add'
        ? add(x, y)
        : operator === 'subtract'
        ? subtract(x, y)
        : operator === 'multiply'
        ? multiply(x, y)
        : operator === 'divide'
        ? divide(x, y)
        : "ERROR! Invalid operator";
}

/* Main body of script */
const numberButtons = document.querySelectorAll(".number-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");
const mainDisplay = document.querySelector(".main-display");
const subDisplay = document.querySelector(".sub-display");

let leftOperand;
let rightOperand
let operator;
let prevOperator;
let result;
let operatorChosen;

clear();
listen();

function clear() {
    leftOperand = '';
    rightOperand = '';
    result = null;
    operatorChosen = false;
    mainDisplay.innerText = '0';
    subDisplay.innerText = '';
}

function listen() {
    numberButtons.forEach((numBtn) => {
        numBtn.addEventListener("click", (event) => populateDisplay(event));
    });
    operatorButtons.forEach((oprtBtn) => {
        oprtBtn.addEventListener("click", (event) => callOperator(event));
    });
    equalButton.addEventListener("click", () => {
        if (leftOperand !== '' && mainDisplay.innerText !== '') {
            getSolution();
        }
    });
    clearButton.addEventListener("click", clear);
    backspaceButton.addEventListener("click", () => {
        mainDisplay.innerText = mainDisplay.innerText.slice(0, -1); 
    });
}

function populateDisplay(event) {
    const input = event.target.innerText;
    const mainDisplayValue = mainDisplay.innerText;

    //reset main display
    if (operatorChosen) {
        mainDisplay.innerText = '';
        operatorChosen = false;
    }

    if (mainDisplayValue === '0') {
        if (input === '.') {
            mainDisplay.innerText = '0.';
        } else {
            mainDisplay.innerText = input;
        }
    } else if (input === '.') {
        if (!mainDisplayValue.includes('.')) {
            mainDisplay.innerText = mainDisplayValue + '.';
        }
    } else {
        mainDisplay.innerText = mainDisplayValue + input;
    }
}

function callOperator(event) {
    if (result !== null) {
        leftOperand = result;
        result = null;
    } else if (leftOperand === '') {
        leftOperand = mainDisplay.innerText;
    } else if (mainDisplay.innerText !== '') {
        leftOperand = operate(Number(leftOperand), Number(mainDisplay.innerText), operator);
    }

    operator = event.target.id;   

    operatorChosen = true;

    mainDisplay.innerText = '';
    displayEquation('half');
}

function getSolution() {
    rightOperand = mainDisplay.innerText;
    result = operate(Number(leftOperand), Number(rightOperand), operator);
    mainDisplay.innerText = result;
    displayEquation('full');
    leftOperand = result;
    rightOperand = '';
}

function displayEquation(type) {
    if (type === 'half') {
        subDisplay.innerText = `${leftOperand} ${getSymbol(operator)}`;
    } else {
        subDisplay.innerText = `${leftOperand} ${getSymbol(operator)} ${rightOperand} =`;
    }
}

function getSymbol(opr) {
    return opr === 'add'
        ? '+'
        : opr === 'subtract'
        ? '−'
        : opr === 'multiply'
        ? '×'
        : '÷';
}