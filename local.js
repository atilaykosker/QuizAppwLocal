const localQuestions = JSON.parse(localStorage.getItem("localQuestions"));
const localAnswers = JSON.parse(localStorage.getItem("localAnswers"));
const localCorrAnswers = JSON.parse(localStorage.getItem("localCorrAnswers"));
function setStorage() {
  localStorage.setItem("localQuestions", JSON.stringify(questions));
  localStorage.setItem("localCorrAnswers", JSON.stringify(corrAnswers));
}
