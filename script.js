const url =
  "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300";
const result = document.querySelector("#render-result");
const num = document.querySelector("#num");
const sub = document.querySelector("#sub");
const numberLedOne = document.querySelector("#first-number");
const numberLedTwo = document.querySelector("#second-number");
const numberLedTree = document.querySelector("#third-number");
const aSegment = document.querySelector(".a");
const bSegment = document.querySelector(".b");
const cSegment = document.querySelector(".c");
const dSegment = document.querySelector(".d");
const eSegment = document.querySelector(".e");
const fSegment = document.querySelector(".f");
const gSegment = document.querySelector(".b");
const allSegments = document.querySelectorAll(".num-0, .num-1, .num-2, .num-3, .num-4, .num-5, .num-6, .num-7, .num-8, .num-9");
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
    .catch((error) => {
      console.log(error);
      getError();
      setLedNumbers();
    });
}

function getAnswer(number) {
  let yourNumber = Number(number.value);

  if (correctNumber === yourNumber) {
    result.innerHTML = "Você acertou!!!!!"
    result.style.color = '#5dba38'
  }

  if (yourNumber < correctNumber) {
    return (result.innerHTML = "É maior");
  }
  if (yourNumber > correctNumber) {
    return (result.innerHTML = "É menor");
  }
}

function getError() {
  objError = JSON.parse(errorValue);
  result.innerHTML = "ERRO";
  result.style.color = "#bf401f"
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

function changeColorSegments() {
  
  Array.from(allSegments).map((segment) => {
    console.log((segment.childNodes))
  })
}

function setLedNumbers() {
  if (arrayNumbers.length === 1) {
    numberLedOne.setAttribute("class", "num-" + arrayNumbers[0]);
    numberLedTwo.style.display = "none";
    numberLedTree.style.display = "none";
    changeColorSegments()
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
