const buttonNum = document.querySelectorAll(".btnNum");
const buttonOperator = document.querySelectorAll(".btnOperator");
const displayBottom = document.querySelector(".bottom-display");
const displayTop = document.querySelector(".top-display");
const equalsBtn = document.querySelector(".btnEquals");
const clearBtn = document.querySelector(".btnClear");
const backBtn = document.querySelector(".btnBack");

let firstNum = "";
let currentOperation = null;
let shouldResetScreen = false;
let secondNum = "";
equalsBtn.addEventListener("click", evaluate);
buttonNum.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

clearBtn.addEventListener("click", clearDisplay);
backBtn.addEventListener("click", backNumber);

buttonOperator.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);

function appendNumber(number) {
  if (displayBottom.textContent === "0" || shouldResetScreen) resetScreen();
  displayBottom.textContent += number;
}

function resetScreen() {
  displayBottom.textContent = "";
  shouldResetScreen = false;
}
function clearDisplay() {
  displayBottom.textContent = 0;
  displayTop.textContent = "";
  firstNum = "";
  secondNum = "";
  currentOperation = null;
}

function backNumber() {
  const display = displayBottom.textContent;

  const minusNumber = display.slice(0, -1);

  displayBottom.textContent = minusNumber;
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstNum = displayBottom.textContent;
  currentOperation = operator;
  displayTop.textContent = `${firstNum} ${currentOperation}`;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperation === null) return;
  if (currentOperation === "÷" && displayBottom.textContent === "0") {
    alert("You can't divide by 0!");
    return;
  }
  secondNum = displayBottom.textContent;
  displayBottom.textContent = operate(currentOperation, firstNum, secondNum);
  displayTop.textContent = `${firstNum} ${currentOperation} ${secondNum} =`;
  currentOperation = null;
}
function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "*":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}
