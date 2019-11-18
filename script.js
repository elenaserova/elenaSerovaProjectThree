const quizApp = {};

quizApp.questions = [
  {
    question: "Which is the correct CSS syntax?",
    answers: {
      a: "{h1:color=yellow(p)}",
      b: "h1 {color:yellow};",
      c: "{h1;color:yellow}",
      d: "h1:color=yellow"
    },
    correctAnswer: "b"
  },
  {
    question: "Which snippet of CSS do you use to center website horizontally?",
    answers: {
      a: "margin: 0 auto;",
      b: "padding: 0 auto;",
      c: "margin: auto 0;",
      d: "padding: auto 0;"
    },
    correctAnswer: "a"
  },
  {
    question:
      "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
    answers: {
      a: "src",
      b: "alt",
      c: "title",
      d: "attr"
    },
    correctAnswer: "b"
  },
  {
    question:
      "Which of the following would be used to create an ID called mainContainer which has a width of 600px, a height of 100px and the color of the text is red?",
    answers: {
      a: "#mainContainer {height:100px; width: 600px; text:black;}",
      b: ".mainContainer {height:100px; width: 600px; colour:black;}",
      c: "#mainContainer {height:100px; width: 600px; color:black;}",
      d: ".mainContainer {height:100px; width: 600px; color:black;}"
    },
    correctAnswer: "c"
  },
  {
    question: "Which tag is used to let control over the viewport?",
    answers: {
      a: "address",
      b: "meta",
      c: "link",
      d: "acronym"
    },
    correctAnswer: "b"
  }
];

//Selectors
quizApp.quizContainer = document.querySelector(".quizContainer");
quizApp.scoreContainer = document.querySelector(".scoreContainer");
quizApp.nextButton = document.getElementById("next");
quizApp.startButton = document.getElementById("start");
quizApp.submitButton = document.getElementById("submit");
quizApp.againButton = document.getElementById("again");

quizApp.correctAnswers = 0;

quizApp.generateQuiz = function() {
  $(".rules").hide();
  quizApp.currentQuestion = 0;
  quizApp.display = [];
  quizApp.questions.forEach((currentQuestion, questionNumber) => {
    const answers = [];
    for (variant in currentQuestion.answers) {
      answers.push(
        `<div class="qaContainer" tabindex="0"><label for = "question${questionNumber}"><input id = "question${questionNumber}" type="radio" name="question${questionNumber}" value="${variant}" class="radio"/>${currentQuestion.answers[variant]}</label></div>`
      );
    }

    quizApp.display.push(
      `<div class="slide"><div class="question"> ${currentQuestion.question} 
            </div>
                    <div class="answers"> ${answers.join("")} </div>
                    </div>`
    );
  });

  let sec = 60;
  quizApp.time = setInterval(myTimer, 1000);
  function myTimer() {
    document.getElementById("timer").innerHTML =
      "⏰ Time left: " + sec + " sec";
    sec--;
    if (sec == -1) {
      clearInterval(quizApp.time);
      swal("Time out!! :(");
      quizApp.nextButton.style.display = "none";
      quizApp.quizContainer.style.display = "none";
      quizApp.finalScore();
    }
  }

  quizApp.quizContainer.innerHTML = quizApp.display[quizApp.currentQuestion];
  quizApp.nextButton.style.display = "inline-block";
  quizApp.startButton.style.display = "none";
  myTimer();
};

quizApp.checkAnswer = function() {
  const radios = Array.from(document.querySelectorAll(".radio"));
  let radioValue;
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      radioValue = radios[i].value;
    }
  }
  if (radioValue == null) {
    swal("Please select an answer!");
    quizApp.currentQuestion = quizApp.currentQuestion - 1;
    return;
  }

  if (radioValue === quizApp.questions[quizApp.currentQuestion].correctAnswer) {
    quizApp.correctAnswers++;
  }
};

quizApp.showNextQuestion = function() {
  quizApp.checkAnswer();

  quizApp.quizContainer.innerHTML = "";
  quizApp.currentQuestion = quizApp.currentQuestion + 1;
  $(quizApp.quizContainer).append(quizApp.display[quizApp.currentQuestion]);

  if (quizApp.currentQuestion === quizApp.display.length - 1) {
    quizApp.nextButton.style.display = "none";
    quizApp.submitButton.style.display = "inline-block";
  } else {
    quizApp.nextButton.style.display = "inline-block";
    quizApp.submitButton.style.display = "none";
  }
};

quizApp.finalScore = function() {
  document.getElementById("timer").style.display = "none";
  let totalScore = (quizApp.correctAnswers / quizApp.questions.length) * 100;

  if (totalScore === 0) {
    $(".scoreContainer").append(
      `<p class="score">Your score is <span class="totalScore">${totalScore}</span>%</p><p>Try again...maybe?😉</p><p><button class="again" id="again">Try again</button></p>`
    );
  }

  if (totalScore === 20) {
    $(".scoreContainer").append(
      `<p class="score">Your score is <span class="totalScore">${totalScore}</span>%</p><p>Not bad!🤓</p><p><button class="again" id="again">Try again</button></p>`
    );
  }

  if (totalScore === 40) {
    $(".scoreContainer").append(
      `<p class="score">Your score is <span class="totalScore">${totalScore}</span>%</p><p>Keep working on it, you’re improving!😁</p><p><button class="again" id="again">Try again</button></p>`
    );
  }

  if (totalScore === 60) {
    $(".scoreContainer").append(
      `<p class="score">Your score is <span class="totalScore">${totalScore}</span>%</p><p>Good job!👍</p><p><button class="again" id="again">Try again</button></p>`
    );
  }

  if (totalScore === 80) {
    $(".scoreContainer").append(
      `<p class="score">Your score is <span class="totalScore">${totalScore}</span>%</p><p>Beautiful! Well done!👏</p><p><button class="again" id="again">Try again</button></p>`
    );
  }

  if (totalScore === 100) {
    $(".scoreContainer").append(
      `<p class="score">Your score is <span class="totalScore">${totalScore}</span>%</p><p>Super! You're a rockstar!😎</p><p><button class="again" id="again">Try again</button></p>`
    );
  }

  $(".again").on("click", function() {
    $("input").empty();
    $(".scoreContainer").empty();
    quizApp.correctAnswers = 0;
    quizApp.quizContainer.style.display = "inline-block";
    quizApp.questions.sort(() => Math.random() - 0.5);
    quizApp.generateQuiz();
    document.getElementById("timer").style.display = "inline-block";
  });
};

quizApp.submit = function() {
  clearInterval(quizApp.time);
  quizApp.checkAnswer();
  quizApp.quizContainer.style.display = "none";
  quizApp.scoreContainer.style.display = "inline-block";
  quizApp.submitButton.style.display = "none";

  quizApp.finalScore();
};

init = () => {
  $(".start").on("click", quizApp.generateQuiz);
  $(".next").on("click", quizApp.showNextQuestion);
  $(".submit").on("click", quizApp.submit);
};

$(document).ready(function() {
  init();
});
