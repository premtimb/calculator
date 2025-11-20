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
    if(value === '' || value === null || value === undefined){
        value = '0';
    }

    const str = value.toString();
    display.textContent = str;

    if (str.length <= 8) {
        display.style.fontSize = '3rem';      
    } else if (str.length <= 12) {
        display.style.fontSize = '2.4rem';   
    } else {
        display.style.fontSize = '1.8rem';  
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

function formatNumber(num){ 
    if(!isFinite(num)) return 'ERROR';

    const rounded = Math.round(num * 1e10) / 1e10;
    let str = rounded.toString();

    if(str.length > 12){
        str = rounded.toExponential(6);
    }
    return str;
}

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

    if(operator !== '' && secondNum === ''){
        operator = op;
        return ;
    }
    if(secondNum !== ''){
        const rawResult= operate(operator,Number(firstNum),Number(secondNum))
        const result = formatNumber(rawResult);
        firstNum = String(result);
        secondNum = '';
        updateDisplay(firstNum);
    }
    operator = op;
}

function handleEquals(){
    if(firstNum === '' || operator === '' || secondNum === '') return;
    if(operator === '/' && Number(secondNum) === 0){
        updateDisplay('ERROR');
        firstNum ='';
        operator ='';
        secondNum='';
        return;
    }
    const rawResult = operate(operator, Number(firstNum), Number(secondNum));
    const result = formatNumber(rawResult);
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