const quizApp = {};

quizApp.questions = [
    {
        question: "Question1?",
        answers: {
            a: "Answer1",
            b: "Answer2",
            c: "Answer3",
            d: "Answer4"

        },
        correctAnswer: "a"
    },
    {
        question: "Question2?",
        answers: {
            a: "Answer1",
            b: "Answer2",
            c: "Answer3",
            d: "Answer4"

        },
        correctAnswer: "a"
    },
    {
        question: "Question3?",
        answers: {
            a: "Answer1",
            b: "Answer2",
            c: "Answer3",
            d: "Answer4"

        },
        correctAnswer: "a"
    },
    {
        question: "Question4?",
        answers: {
            a: "Answer1",
            b: "Answer2",
            c: "Answer3",
            d: "Answer4"

        },
        correctAnswer: "c"
    },
    {
        question: "Question5?",
        answers: {
            a: "Answer1",
            b: "Answer2",
            c: "Answer3",
            d: "Answer4"

        },
        correctAnswer: "b"
    }
];


//Selectors
quizApp.quizContainer = document.querySelector(".quizContainer");
quizApp.scoreContainer = document.querySelector(".scoreContainer");
quizApp.nextButton = document.getElementById('next');
quizApp.startButton = document.getElementById('start');
quizApp.submitButton = document.getElementById('submit');
quizApp.againButton = document.getElementById('again');


quizApp.correctAnswers = 0;

quizApp.generateQuiz = function () {
    
    quizApp.currentQuestion = 0;
    quizApp.display = [];
    quizApp.questions.forEach((currentQuestion, questionNumber) => {
        const answers = [];
        for (variant in currentQuestion.answers) {
        answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${variant}" class="radio">
                    ${variant} :
                    ${currentQuestion.answers[variant]}
                </label>`
        );
        }
        quizApp.display.push(
        `<div class="slide"><div class="question"> ${currentQuestion.question} 
            </div>
                    <div class="answers"> ${answers.join("")} </div>
                    </div>`
        );
    });

    quizApp.quizContainer.innerHTML = quizApp.display[quizApp.currentQuestion];
    quizApp.nextButton.style.display = "inline-block";
    quizApp.startButton.style.display = "none";

    

}

quizApp.checkAnswer = function() {
  const radios = Array.from(document.querySelectorAll(".radio"));
  console.log(radios);
  let radioValue;
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      radioValue = radios[i].value;
      console.log(radios[i].value);
    }
  }
  if (radioValue == null) {
    alert("Please select an answer!");
    quizApp.currentQuestion = quizApp.currentQuestion - 1;

    
  }

  if (radioValue === quizApp.questions[quizApp.currentQuestion].correctAnswer) {
    quizApp.correctAnswers++;
  }
  console.log(quizApp.questions[quizApp.currentQuestion].correctAnswer);
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



quizApp.finalScore = function () {

        let totalScore = (quizApp.correctAnswers / quizApp.questions.length) * 100;
        console.log(totalScore);
        $('.scoreContainer').text(`Your score is ${totalScore}%`);
        $('.scoreContainer').append('<p><button class="again" id="again">Try again</button></p>');
        
        $('.again').on("click", function () {
            $('input').empty();
            $('.scoreContainer').empty();
            quizApp.correctAnswers = 0;
            quizApp.quizContainer.style.display = 'inline-block';
            quizApp.questions.sort(() => Math.random() - 0.5);
            quizApp.generateQuiz();
        });

  
    }


    quizApp.submit = function () {

        quizApp.checkAnswer();
    
        quizApp.quizContainer.style.display = "none";
        quizApp.scoreContainer.style.display = "inline-block";
        quizApp.submitButton.style.display = "none";

        quizApp.finalScore();

    }




init = () => {
    
    $('.start').on("click", quizApp.generateQuiz);
    $('.next').on("click", quizApp.showNextQuestion);
    $(".submit").on("click", quizApp.submit);

}

$(document).ready(function () {
    init();
});
