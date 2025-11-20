function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

console.log(add(3,5));
console.log(subtract(2,1));
console.log(multiply(2,2));
console.log(divide(6,3));

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

console.log(operate("+",3,5));
console.log(operate('-',4,2));
console.log(operate('*',4,4));
console.log(operate('/',3,2));

let buttons = document.querySelectorAll('.buttons button');
let display = document.querySelector('#display');


buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if(display.textContent === '0'){
            display.textContent = value;
        } else {
            display.textContent += value;
        }
    });
});

function updateDisplay(value){
    if(value === '' || value === null){
        display.textContent = '0';
    }else {
        display.textContent = value;
    }
}

let clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
    firstNum = '';
    operator = '';
    secondNum = '';
    display.textContent = '0';
});

let backspace = document.querySelector('.backspace');
backspace.addEventListener('click', () => {
    let current = display.textContent;
    if(current.length > 1){
        updateDisplay(current.slice(0, -1));
    }else {
        updateDisplay('0');
    }
});