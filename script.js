const url =
  "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300";
const result = document.querySelector("#render-result");
const num = document.querySelector("#num");
const sub = document.querySelector("#sub");
const numberLedOne = document.querySelector("#first-number");
const numberLedTwo = document.querySelector("#second-number");
const numberLedTree = document.querySelector("#third-number");
const rematch = document.querySelector("#rematch-btn");
const rootCss = document.querySelector(":root");

let arrayNumbers = [];
let correctNumber;
let err = false;
let errorValue;
let objError;

function getData() {
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error((errorValue = text));
        });
      }
      return res.json();
    })
    .then((data) => {
      correctNumber = data.value;
    })
    .catch((error) => {
      console.error(error);
      getError();
    });
}

function getAnswer(number) {
  let selectedNumber = Number(number.value);

  if (correctNumber === selectedNumber) {
    return getCorrectAnswer();
  }

  if (selectedNumber < correctNumber) {
    return (result.innerHTML = "É maior");
  }
  
  if (selectedNumber > correctNumber) {
    return (result.innerHTML = "É menor");
  }
}

function getCorrectAnswer() {
  disableInputs();
  result.innerHTML = "Você acertou!!!!!";
  result.style.color = "#5dba38";
  rootCss.style.setProperty("--smoothblack", "#5dba38");
  rematch.style.display = "block";
}

function getError() {
  arrayNumbers = [];
  err = true;
  objError = JSON.parse(errorValue);
  result.innerHTML = "ERRO";
  result.style.color = "#bf401f";
  rematch.style.display = "block";
  rootCss.style.setProperty("--smoothblack", "#bf401f");
  splitToDigit(objError.StatusCode);
  setLedNumbers();
  disableInputs();
}

function disableInputs() {
  num.disabled = true;
  sub.disabled = true;
  sub.style.cursor = "not-allowed";
  sub.style.background = "#dddddd";
  num.style.background = "#f5f5f5";
}

function enableInputs() {
  num.disabled = false;
  sub.disabled = false;
  sub.style.cursor = "pointer";
  sub.style.background = "linear-gradient(#da722d, #b7723a)";
  num.style.background = "#ffffff";
}

function getNumber() {
  arrayNumbers = [];
  splitToDigit(num.value);
  setLedNumbers();
  getAnswer(num);
  num.value = "";
}

function splitToDigit(number) {
  (number + "").split("").map((num) => {
    arrayNumbers.push(num);
  });
}

function setLedNumbers() {
  switch (arrayNumbers.length) {
    case 1:
      numberLedOne.setAttribute("class", "num-" + arrayNumbers[0]);
      numberLedTwo.style.display = "none";
      numberLedTree.style.display = "none";
      break;

    case 2:
      numberLedOne.setAttribute("class", "num-" + arrayNumbers[0]);
      numberLedTwo.setAttribute("class", "num-" + arrayNumbers[1]);
      numberLedTwo.style.display = "inline-flex";
      numberLedTree.style.display = "none";
      break;

    case 3:
      numberLedOne.setAttribute("class", "num-" + arrayNumbers[0]);
      numberLedTwo.setAttribute("class", "num-" + arrayNumbers[1]);
      numberLedTree.setAttribute("class", "num-" + arrayNumbers[2]);
      numberLedTree.style.display = "inline-flex";
      numberLedTwo.style.display = "inline-flex";
      break;
  }
}

function resetDisplayLed() {
  numberLedOne.setAttribute("class", "num-0");
  numberLedTwo.setAttribute("class", "num-0");
  numberLedTree.setAttribute("class", "num-0");
}

function playAgain() {
  initGame();
  if (!err) {
    result.innerHTML = "";
    result.style.color = "#d5793d";
    numberLedTwo.style.display = "none";
    numberLedTree.style.display = "none";
    rootCss.style.setProperty("--smoothblack", "#272b32");
    enableInputs();
    resetDisplayLed();
    rematch.style.display = "none";
  }
}

function initGame() {
  err = false;
  getData();
}

initGame();
