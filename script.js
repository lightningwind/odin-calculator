/* === Globals === */
let curNum = '';
let prevNum = '';
let operator = ''; 

/* === DOM Elements === */
const displayEle = document.querySelector("#display");
const numberButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('.clear');
const decimalBtn = document.querySelector('.decimal');
const signBtn = document.querySelector('.sign');

/* === Functions === */

/* === Event Handlers === */

function handleNumber(num) { 
    if (curNum.length < 9) {
        curNum += num; 
    }
    updateDisplay(curNum); 
}

function handleOperator(op) { 
    if (prevNum != '' && curNum != '') {
        calculate(); 
    } 
    prevNum = curNum; // Save first operand in a variable 
    curNum = ''; // Clear display for second operand
    updateDisplay(curNum);
    operator = op; 
}

function calculate() { 
    if (prevNum.length === 0 || curNum.length === 0 || operator.length === 0) {
        return;
    }
    prevNum = +prevNum;
    curNum = +curNum;
    if (operate()) {
        resetCalculator("ERROR");
    } else {
        updateDisplay(curNum);
        prevNum = '';
        operator = ''; 
    }
}

function resetCalculator(displayValue) {
    prevNum = '';
    curNum = '';
    operator = '';
    updateDisplay(displayValue);
}

function handleSign() {
    curNum = -curNum;
    curNum = curNum.toString();
    updateDisplay(curNum);
}

function addDecimal() {
    if (!curNum.includes('.')) {
        curNum += '.';
        updateDisplay(curNum);
    }
}

function handleKeyPress(e) {
    if (0 <= e.key && e.key <= 9) {
        handleNumber(e.key);
    }
    switch (e.key) {
        case '+':
        case '-':
        case '/':
        case '*':
            handleOperator(e.key);
            break;
        case '.':
            addDecimal();
            break;
        case '=':
        case 'Enter':
            calculate();
            break;
        case 'Backspace':
            resetCalculator('0');
    }
}

/* === Utility functions === */

function operate() {
    let res; 
    switch(operator) {
        case '+':
            res = prevNum + curNum;
            break;
        case '-':
            res = prevNum - curNum;
            break;
        case '*':
            res = prevNum * curNum;
            break;
        case '/':
            if (curNum === 0) {
                return 1; // Signal an error
            }
            res = prevNum / curNum; 
            break; 
        default:
            return 1; 
    }
    res = roundNum(res);
    curNum = res.toString();
    return 0;
}

function roundNum(num) { // Rounds number <num> to 5 decimal places
    return Math.round(num * 100000) / 100000; 
}

function updateDisplay(value) {
    displayEle.textContent = value.length < 10 ? value : value.slice(0, 9); 
}

/* === Event listeners === */
window.addEventListener('keydown', handleKeyPress);
numberButtons.forEach(btn => btn.addEventListener('click', e => handleNumber(e.target.value)));
operatorButtons.forEach(btn => btn.addEventListener('click', e => handleOperator(e.target.value)));
equalsBtn.addEventListener('click', calculate);
clearBtn.addEventListener('click', () => resetCalculator('0')); 
signBtn.addEventListener('click', () => {
    if (curNum != '') {
        handleSign();
    }
})
decimalBtn.addEventListener('click', addDecimal); 