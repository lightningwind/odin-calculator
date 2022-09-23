/* === Globals === */
let curNum = '';
let prevNum = '';
let operator = ''; 

/* === DOM Elements === */
const displayEle = document.getElementById("display");
const numberButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('.clear');
const decimalBtn = document.querySelector('.decimal');

/* === Functions === */
function updateDisplay() {
    displayEle.innerText = curNum; 
}

function handleNumberBtnClick(num) { 
    if (curNum.length < 9) { // Prevent overflow of display
        curNum += num; 
    }
    updateDisplay(); 
}

function handleOperatorBtnClick(op) {
    operator = op; 
    prevNum = curNum;
    curNum = ''; 
    updateDisplay();
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
numberButtons.forEach(btn => btn.addEventListener('click', e => handleNumberBtnClick(e.target.value)));
operatorButtons.forEach(btn => btn.addEventListener('click', e => handleOperatorBtnClick(e.target.value)));