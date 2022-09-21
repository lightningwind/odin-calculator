/* === Globals === */
let displayValue = '0';
let firstOperand = '';
let secondOperand = '';
let firstOperator = '';
let secondOperator = '';
let res = '';

/* === DOM Elements === */
const displayEle = document.getElementById("display");
const numberButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('.equals');

/* === Functions === */
function updateDisplay() {
    // Gotcha: Prevent display overflow  
    displayEle.innerText = displayValue.length > 9 ?
                           displayValue.substring(0, 9) :
                           displayValue;
}

function handleNumberBtnClick(e) { // TODO: Investigate logic in Chrome debugger
    const num = e.target.value;
    if (!firstOperator) { // Handle input to first operand 
        if (+displayValue === 0 || displayValue === firstOperand) { 
            displayValue = num;
        } else {
            displayValue += num;
        }
    } else { // Handle input to second operand 
        if (displayValue === firstOperand) {
            displayValue = num;
        } else {
            displayValue += num; 
        }
    }
    updateDisplay();
}

function handleOperatorBtnClick(e) {
    const operator = e.target.value; 

    if (firstOperand && !secondOperand) {
        // Handle second operator input

    } 

    if (!(firstOperand || secondOperand)) {
        // Handle first operator input 
        firstOperator = operator; 
        firstOperand = displayValue;
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        console.error("Cannot divide by zero");
        return;
    }
    return a / b;
}

function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b); 
        default:
            console.error("Invalid operator");
    }
}

/* === Event listeners === */
numberButtons.forEach(btn => btn.addEventListener('click', handleNumberBtnClick));
operatorButtons.forEach(btn => btn.addEventListener('click', handleOperatorBtnClick));

/* === Invoke functions === */
updateDisplay();