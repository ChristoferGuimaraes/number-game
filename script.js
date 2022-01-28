const url =
  "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300";
const result = document.querySelector("#render-result");
const num = document.querySelector("#num");
const sub = document.querySelector("#sub");
const numberLedOne = document.querySelector("#first-number");
const numberLedTwo = document.querySelector("#second-number");
const numberLedTree = document.querySelector("#third-number");
const rematch = document.querySelector("#rematch-btn");

const allSegments = document.querySelectorAll(
  ".num-0, .num-1, .num-2, .num-3, .num-4, .num-5, .num-6, .num-7, .num-8, .num-9"
);
let errorValue;
let arrayNumbers = [];
let correctNumber;
let objError;

async function getData() {
  await fetch(url)
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error((errorValue = text));
        });
      } else {
        return res.json();
      }
    })
    .then((data) => {
      correctNumber = data.value;
    })
    .catch(() => {
      getError();
      setLedNumbers();
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
  rematch.style.display = "block";
}

function getError() {
  objError = JSON.parse(errorValue);
  result.innerHTML = "ERRO";
  result.style.color = "#bf401f";
  rematch.style.display = "block";
  splitToDigit(objError.StatusCode);
  disableInputs();
  console.log(`Error: ${objError.StatusCode} - ${objError.Error}`);
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

function changeColorSegments() {
  Array.from(allSegments).map((segment) => {
    console.log(segment.childNodes);
  });
}

function setLedNumbers() {
  if (arrayNumbers.length === 1) {
    numberLedOne.setAttribute("class", "num-" + arrayNumbers[0]);
    numberLedTwo.style.display = "none";
    numberLedTree.style.display = "none";
    changeColorSegments();
  }

  if (arrayNumbers.length > 1 && arrayNumbers.length <= 2) {
    numberLedOne.setAttribute("class", "num-" + arrayNumbers[0]);
    numberLedTwo.setAttribute("class", "num-" + arrayNumbers[1]);
    numberLedTwo.style.display = "inline-flex";
    numberLedTree.style.display = "none";
  }

  if (arrayNumbers.length > 2) {
    numberLedOne.setAttribute("class", "num-" + arrayNumbers[0]);
    numberLedTwo.setAttribute("class", "num-" + arrayNumbers[1]);
    numberLedTree.setAttribute("class", "num-" + arrayNumbers[2]);
    numberLedTree.style.display = "inline-flex";
    numberLedTwo.style.display = "inline-flex";
  }
}

function playAgain() {
  result.innerHTML = "";
  result.style.color = "#d5793d";
  rematch.style.display = "none";
  numberLedTwo.style.display = "none";
  numberLedTree.style.display = "none";
  numberLedOne.setAttribute("class", "num-0");
  numberLedTwo.setAttribute("class", "num-0");
  numberLedTree.setAttribute("class", "num-0");
  initGame();
  enableInputs();
}

function initGame() {
  getData();
}

initGame();
