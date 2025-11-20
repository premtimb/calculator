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
  return a / b;
}


let firstNum = '';
let operator = '';
let secondNum = '';

function operate(op,num1,num2){ 
    switch(op){
        case "+":
            return add(num1,num2);
        case "-":
            return subtract(num1,num2);
        case "*":
            return multiply(num1,num2);
        case "/":
            return divide(num1,num2);
        default:
            return null;
    }

}

let display = document.querySelector('#display');
let buttons = document.querySelectorAll('.buttons button');
let clear = document.querySelector('.clear');
let backspace = document.querySelector('.backspace');

function updateDisplay(value){
    if(value === '' || value === null){
        display.textContent = '0';
    }else {
        display.textContent = value;
    }
}
updateDisplay('0');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent.trim();
        if(/\d/.test(value) || value === '.'){
            handleDigit(value);
        } else if ('*/+-'.includes(value)){
            handleOperator(value);
        } else if (value === '=') {
            handleEquals();
        }
    });
});

function handleDigit(digit){
    if(operator === ''){
        if(firstNum === '0' && digit !== '.'){
            firstNum = digit;
        } else {
            if(digit === '.' && firstNum.includes('.')) return;
            firstNum += digit;
        }
        updateDisplay(firstNum);
    } else {
        if(secondNum === '0' && digit !== '.'){
            secondNum = digit;
        } else {
            if(digit === '.' && secondNum.includes('.')) return;
            secondNum += digit;
        } 
        updateDisplay(secondNum);
    }
}

function handleOperator(op){
    if(firstNum === '') return;

    if(secondNum !== ''){
        const result = operate(operator,Number(firstNum),Number(secondNum))
        firstNum = String(result);
        secondNum = '';
        updateDisplay(firstNum);
    }
    operator = op;
}

function handleEquals(){
    if(firstNum === '' || operator === '' || secondNum === '') return;
    const result = operate(operator, Number(firstNum), Number(secondNum));
    updateDisplay(result);

    firstNum = String(result);
    operator = '';
    secondNum = '';
}

clear.addEventListener('click', () => {
    firstNum = '';
    operator = '';
    secondNum = '';
    updateDisplay('0');
});

backspace.addEventListener('click', () => {
    if(operator === ''){
        if(firstNum.length > 0){
            firstNum = firstNum.slice(0,-1);
            updateDisplay(firstNum);
        } else {
            updateDisplay('');
        }
    } else if (secondNum !== ''){
            secondNum = secondNum.slice(0,-1);
            updateDisplay(secondNum);
    } else {
        operator = '';
        updateDisplay(firstNum);
    }
});