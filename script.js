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

/* === Functions === */
function updateDisplay(value) {
    displayEle.textContent = value.length < 10 ? value : value.slice(0, 9); 
}

function handleNumberBtnClick(num) { 
    if (curNum.length < 9) { // Prevent overflow of display
        curNum += num; 
    }
    updateDisplay(curNum); 
}

function handleOperatorBtnClick(op) {
    operator = op; 
    prevNum = curNum; // Store first operand in a variable
    curNum = ''; 
    updateDisplay(curNum);
}

function handleEqualsBtnClick() {
    prevNum = +prevNum;
    curNum = +curNum;
    operate();
    prevNum = prevNum.toString(); 
    curNum = ''; 
    operator = ''; 
    updateDisplay(prevNum);
}

function operate() {
    switch(operator) {
        case '+':
            prevNum += curNum;
            break;
        case '-':
            prevNum -= curNum;
            break;
        case '*':
            prevNum *= curNum;
            break;
        case '/':
            prevNum = curNum === 0 ? "ERROR" : prevNum / curNum; 
            break; 
        default:
            prevNum = "ERROR";
    }
    if (prevNum !== "ERROR") {
        prevNum = roundNum(prevNum);
    }
}

function roundNum(num) { // Rounds to 5 decimal places
    return Math.round(num * 100000) / 100000; 
}

/* === Event listeners === */
numberButtons.forEach(btn => btn.addEventListener('click', e => handleNumberBtnClick(e.target.value)));
operatorButtons.forEach(btn => btn.addEventListener('click', e => handleOperatorBtnClick(e.target.value)));
equalsBtn.addEventListener('click', handleEqualsBtnClick)