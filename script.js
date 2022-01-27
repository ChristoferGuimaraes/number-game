const url =
  "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300";
const result = document.querySelector("#render-result");
const num = document.querySelector("#num");
const sub = document.querySelector("#sub");
const numberLedOne = document.querySelector("#first-number");
const numberLedTwo = document.querySelector("#second-number");
const numberLedTree = document.querySelector("#third-number");
let errorValue;
let arrayNumbers = []
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
      console.log(data.value);
    })
    .catch((error) => {
      console.log(error);
      getError();
      setLedNumbers()
    });
}

function getAnswer(number) {
  let yourNumber = Number(number.value);

  correctNumber === yourNumber && (result.innerHTML = "Você acertou!!!!!");

  if (yourNumber < correctNumber) {
    return (result.innerHTML = "É maior");
  }
  if (yourNumber > correctNumber) {
    return (result.innerHTML = "É menor");
  }
}

function getError() {
  objError = JSON.parse(errorValue);
  result.innerHTML = 'ERRO'
  splitToDigit(objError.StatusCode);
}

function getNumber() {
  arrayNumbers = [];

  splitToDigit(num.value);
  setLedNumbers();
  getAnswer(num);
}

function splitToDigit(number) {
  (number + "").split("").map((num) => {
    arrayNumbers.push(num);
  });
}

function setLedNumbers() {
  if (arrayNumbers.length === 1) {
    numberLedOne.setAttribute("class", "num-" + arrayNumbers[0]);
    numberLedTwo.style.display = "none";
    numberLedTree.style.display = "none";
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

getData();
