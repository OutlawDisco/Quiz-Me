// Variables
const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz_box");
const optionList = document.querySelector(".option_list");
const timeCount = quizBox.querySelector(".timer .timer_sec");
let time = 30;

//If start button is clicked
startBtn.onclick = () => {
  infoBox.classList.add("activeInfo"); //show info box
};

//If No thanks button is clicked
exitBtn.onclick = () => {
  infoBox.classList.remove("activeInfo"); //hide info box
};

//If lets-go button is clicked
continueBtn.onclick = () => {
  infoBox.classList.remove("activeInfo"); //hide info box
  quizBox.classList.add("activeQuiz"); //Show Quiz Box
  showQuestions(0);
  queCounter(1);
  startTimer();
};

let queCount = 0;
let queNumb = 1;
let counter;
let userScore = 0;

const nextBtn = quizBox.querySelector(".next_btn");
const resultBox = document.querySelector(".result_box");
const reQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");

reQuiz.onclick = () => {
  quizBox.classList.add("activeQuiz");
  resultBox.classList.remove("activeResult");
  queCount = 0;
  queNumb = 1;
  userScore = 0;
  time = 30;
  showQuestions(queCount);
  queCounter(queNumb);
  clearInterval(counter);
  startTimer();
  nextBtn.style.display = "none";
};

quitQuiz.onclick = () => {
  window.location.reload();
};

nextBtn.onclick = () => {
  if (queCount < questions.length - 1) {
    queCount++;
    queNumb++;
    showQuestions(queCount);
    queCounter(queNumb);
    nextBtn.style.display = "none";
  } else {
    console.log("questions completed");
    showResults();
  }
};
//get questions and options from array
function showQuestions(index) {
  const queText = document.querySelector(".question_text");
  let queTag =
    "<span>" +
    questions[index].number +
    ". " +
    questions[index].question +
    "</span>";
  let optionTag =
    '<div class="option">' +
    questions[index].options[0] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[1] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[2] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[3] +
    "<span></span></div>";
  queText.innerHTML = queTag;
  optionList.innerHTML = optionTag;

  const option = optionList.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[queCount].answer;
  let allOptions = optionList.children.length;
  if (userAnswer == correctAnswer) {
    userScore += 1;
    answer.classList.add("correct");
    console.log("Answer is correct");
  } else {
    answer.classList.add("wrong");
    time -= 3;
    console.log("wrong!");
    // if answer is incorrect, show correct answer
    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }
  }
  //once answer is selected disable all options
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }
  nextBtn.style.display = "block";
}

function showResults() {
  infoBox.classList.remove("activeInfo"); //hide info box
  quizBox.classList.remove("activeQuiz"); //hide Quiz Box
  resultBox.classList.add("activeResult"); //Show results Box
  const scoreText = resultBox.querySelector(".score_text");
  if (userScore > 5) {
    let scoreTag =
      "<span>Yay! You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p> correct!</span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag =
      "<span>You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p> correct!</span>";
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer() {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";

      let correctAnswer = questions[queCount].answer;
      let allOptions = optionList.children.length;

      for (let i = 0; i < allOptions; i++) {
        if (optionList.children[i].textContent == correctAnswer) {
          optionList.children[i].setAttribute("class", "option correct");
        }
      }
      for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
      }
      nextBtn.style.display = "block";
    }
  }
}

function queCounter(index) {
  const btmCounter = quizBox.querySelector(".total_questions");
  let totalQuesCountTag =
    "<span><p>" + index + "</p>of<p>" + questions.length + "</p></span>";
  btmCounter.innerHTML = totalQuesCountTag;
}
