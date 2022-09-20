/* === Globals === */
let displayValue = '0';

/* === DOM Elements === */
const displayEle = document.getElementById("display");
const numberButtons = document.querySelectorAll('.operand');

/* === Functions === */
function updateDisplay() {
    // Gotcha: Round answers with long decimals 
    displayEle.innerText = displayValue.length > 9 ?
                           displayValue.substring(0, 9) :
                           displayValue;
}

function handleNumberBtnClick(e) {
    const num = e.target.value;
    if (displayValue === '0') {
        displayValue = num;
    } else {
        displayValue += num;
    }
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
numberButtons.forEach(btn => btn.addEventListener('click', handleNumberBtnClick));

/* === Invoke functions === */
updateDisplay();