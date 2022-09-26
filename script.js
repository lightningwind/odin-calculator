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
    if (curNum.length < 9) {
        curNum += num; 
    }
    updateDisplay(curNum); 
}

function handleOperatorBtnClick(op) { // TODO: Handle multiple operations 
    operator = op; 
    prevNum = curNum; // Save first operand in a variable
    // Clear display for second operand 
    curNum = ''; 
    updateDisplay(curNum);
}

function handleEqualsBtnClick() {
    prevNum = +prevNum;
    curNum = +curNum;
    if (operate()) {
        updateDisplay("ERROR");
        prevNum = '';
        curNum = ''; 
    } else {
        curNum = prevNum.toString(); 
        prevNum = '';
        updateDisplay(curNum);
    }
    operator = ''; 
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
            if (curNum === 0) {
                return 1; 
            }
            prevNum /= curNum; 
            break; 
        default:
            return 1; 
    }
    prevNum = roundNum(prevNum);
    return 0;
}

function roundNum(num) { // Rounds number <num> to 5 decimal places
    return Math.round(num * 100000) / 100000; 
}

/* === Event listeners === */
numberButtons.forEach(btn => btn.addEventListener('click', e => handleNumberBtnClick(e.target.value)));
operatorButtons.forEach(btn => btn.addEventListener('click', e => handleOperatorBtnClick(e.target.value)));
equalsBtn.addEventListener('click', handleEqualsBtnClick)