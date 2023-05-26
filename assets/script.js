// Variables
var infoBox = document.querySelector(".start-box");

var quizEl = document.querySelector(".quiz-box");

var startBtn = document.getElementById("start-btn");

var questions = [
  {
    question: "What are humans?",
    answers: [
      "muggles",
      "silly creatures from outerspace ",
      "cbone-bags",
      "normies",
    ],
    correct: [1],
  },
  {
    question: "Who is not a fraggle?",
    answers: ["Gobo", "Mokey", "Wembley", "Gorg"],
    correct: [3],
  },
  {
    question: "What is a fraggles favorite snack?",
    answers: ["apples", "carrots", "doozer buildings", "socks"],
    correct: [2],
  },
  {
    question: "Every Fraggle has a job, what is Boomers?",
    answers: ["laundry", "picking radished", "depression", "singing"],
    correct: [0],
  },
  {
    question: "Who is Marjory?",
    answers: [
      "a heap of trash",
      "a wise voice of reason",
      "a great singer",
      "all of the above",
    ],
    correct: [3],
  },
  {
    question: "Uncle Traveling Matt sends postcards to who?",
    answers: ["Red", "Mokey", "Gobo", "Wembley"],
    correct: [2],
  },
  {
    question: "Who is the best swimmer?",
    answers: ["Red", "Gobo", "Wembley", "Boomer"],
    correct: [0],
  },
  {
    question: "Where do fraggles live?",
    answers: ["Detroit", "Fraggle Rock", "Boston", "LA"],
    correct: [1],
  },
];
var questionEl = document.getElementById("question");
var answerBtn = document.getElementById("answer-buttons");

let currentQuestIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuest = questions[currentQuestIndex];
  let questNum = (currentQuestIndex = 1);
  questionEl.innerHTML = questNum + ". " + currentQuest.question;

  currentQuest.answers.forEach((answer) => {
    var button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtn.appendChild(button);
  });
}
startBtn.addEventListener("click", function () {
  infoBox.classList.add("hide");
  //execute timer function

  startQuiz();
});
function resetState() {
  while (answerBtn.firstChild) answerBtn.removeChild(answer.firstChild);
}
