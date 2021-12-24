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
        ? "ERROR!"
        : x / y;
} 

function operate(x, y, operator) {
    return operator === 'add'
        ? add(x, y)
        : operator === 'subtract'
        ? subtract(x, y)
        : operator === 'multiply'
        ? multiply(x, y)
        : operator === 'divide'
        ? divide(x, y)
        : "ERROR!";
}

/* Main body of script */
const numberButtons = document.querySelectorAll(".number-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
const equalButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");
const mainDisplay = document.querySelector(".main-display");
const subDisplay = document.querySelector(".sub-display");

let leftOperand;
let rightOperand
let operator;
let result;
let operatorChosen;
let resultCalculated;

clear();
listen();

function clear() {
    leftOperand = '';
    rightOperand = '';
    result = null;
    operatorChosen = false;
    resultCalculated = false;
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

    if (resultCalculated && !operatorChosen) {
        clear();
    }

    //reset main display
    if (operatorChosen) {
        mainDisplay.innerText = '';
        operatorChosen = false;
        resultCalculated = false;
    } 

    if (mainDisplay.innerText === '0') {
        if (input === '.') {
            mainDisplay.innerText = '0.';
        } else {
            mainDisplay.innerText = input;
        }
    } else if (input === '.') {
        if (!mainDisplay.innerText.includes('.')) {
            mainDisplay.innerText = mainDisplay.innerText + '.';
        }
    } else {
        mainDisplay.innerText = mainDisplay.innerText + input;
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
    resultCalculated = true;
}

//helper functions
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

function debug() {
    console.log(`leftOperand : ${leftOperand}`);
    console.log(`rightOperand : ${rightOperand}`);
    console.log(`operator : ${operator}`);
    console.log(`result : ${result}`);
    console.log(`operatorChosen : ${operatorChosen}`);
    console.log(`resultCalculated : ${resultCalculated}`);
    console.log('---------------------------------------');
}