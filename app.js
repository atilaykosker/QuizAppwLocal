const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const showButton = document.getElementById("show-btn");
const container = document.getElementById("question-container");
const resultsContainer = document.getElementById("results-container");
let playerArr = [];
let currentQuestionIndex;
startButton.addEventListener("click", start);
showButton.addEventListener("click", results);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  nextQuestion();
});
function reloadStart() {
  location.reload();
  start();
}
function start() {
  setStorage();
  startButton.classList.add("hide");
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  nextButton.classList.remove("hide");
  showButton.classList.add("hide");
  nextQuestion();
}
function nextQuestion() {
  reset();
  showQuestion(questions[currentQuestionIndex]);
}
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.classList.add("btn");
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
function reset() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
function playerArray(selectedButton) {
  playerArr.splice(currentQuestionIndex, 0, selectedButton);
  console.log(playerArr);
  // playerArr=[]
  // playerArr.push=selectedButton
  // console.log(playerArr)
}
function selectAnswer(e) {
  const selectedButton = e.target.innerText;

  playerArray(selectedButton);

  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.addEventListener("click", reloadStart);
    startButton.innerText = "Tekrar Dene";
    startButton.classList.remove("hide");
    showButton.classList.remove("hide");
  }
}

function results() {
  newArr = playerArr.splice(currentQuestionIndex + 1);
  console.log(playerArr);
  container.classList.add("hide");
  localStorage.setItem("localAnswers", JSON.stringify(playerArr));
  localStorage.getItem("localAnswers");
  comparetion(playerArr);
}

function comparetion(localAnswers) {
  let trueCount = 0;
  let falseCount = 0;
  for (let i = 0; i < localCorrAnswers.length; i++) {
    const sonuc = localAnswers[i] == localCorrAnswers[i];

    stringSonuc = sonuc.toString();
    if (stringSonuc === "true") {
      stringSonuc = "Doğru";
      trueCount++;
    }
    if (stringSonuc === "false") {
      stringSonuc = "Yanlış";
      falseCount++;
    }
    const x = document.createElement("div");
    x.innerHTML =
      localQuestions[i].question +
      " Cevabınız: " +
      localAnswers[i] +
      " | " +
      " Doğru Cevap: " +
      localCorrAnswers[i] +
      " | " +
      stringSonuc;
    resultsContainer.appendChild(x);
  }
  const y = document.createElement("div");
  y.innerHTML =
    "Doğru Cevap Sayısı: " +
    trueCount.toString() +
    " | " +
    "Yanlış Cevap Sayısı: " +
    falseCount.toString();
  resultsContainer.appendChild(y);
}
