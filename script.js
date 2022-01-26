const res = document.querySelector("#render-results");
const url =
  "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300";
const num = document.querySelector("#num");
const sub = document.querySelector("#sub");
const numberLedOne = document.querySelector("#first-number");
const numberLedTwo = document.querySelector("#second-number");
const numberLedTree = document.querySelector("#third-number");
let errorValue;
let arrayNumbers = [];

async function getData() {
  await fetch(url)
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(text);
        });
      } else {
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      errorValue = [error];

      console.log(errorValue);
    });
}

function getError(err) {
  console.error(err);
}

function getNumber() {
  arrayNumbers = [];

  splitToDigit(num);
  setLedNumbers();
}

function splitToDigit(number) {
  (number.value + "").split("").map((num) => {
    arrayNumbers.push(num);
    //arrayNumber.length > 1 ? document.querySelector("#first-number").setAttribute("class","num-"`${num}`) : ''
  });
  console.log(arrayNumbers);
}

function setLedNumbers() {
  if (arrayNumbers.length === 1) {
    numberLedOne.setAttribute("class", "num-" + arrayNumbers[0]);
    numberLedTwo.style.display = "none";
    numberLedTree.style.display = "none";
  }

  if (arrayNumbers.length > 1) {
    numberLedOne.setAttribute("class", "num-" + arrayNumbers[0]);
    numberLedTwo.setAttribute("class", "num-" + arrayNumbers[1]);
    numberLedTwo.style.display = "inline-flex";
  }

  if (arrayNumbers.length > 2) {
    numberLedOne.setAttribute("class", "num-" + arrayNumbers[0]);
    numberLedTwo.setAttribute("class", "num-" + arrayNumbers[1]);
    numberLedTree.setAttribute("class", "num-" + arrayNumbers[2]);
    numberLedTree.style.display = "inline-flex";
  }
}

getData();
