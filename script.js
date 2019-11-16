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
        correctAnswer: "b"
    },
    {
        question: "Question2?",
        answers: {
            a: "Answer1",
            b: "Answer2",
            c: "Answer3",
            d: "Answer4"

        },
        correctAnswer: "d"
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

quizApp.currentSlide = 0;
quizApp.display = []

//Selectors
quizApp.quizContainer = document.querySelector(".quizContainer");
quizApp.scoreContainer = document.querySelector(".scoreContainer");
quizApp.nextButton = document.getElementById('next');
quizApp.startButton = document.getElementById('start');
quizApp.submitButton = document.getElementById('submit');
quizApp.againButton = document.getElementById('again');

quizApp.displaySlide = function(slides, currentSlide) {
    quizContainer.innerHTML = slides[currentSlide];
} 

quizApp.generateQuiz = function() {
    quizApp.questions.forEach((currentQuestion, questionNumber) => {
        const answers = [];
        for (variant in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${variant}">
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
    })
    
    quizApp.quizContainer = document.querySelector(".quizContainer");
    quizApp.quizContainer.innerHTML = quizApp.display[quizApp.currentSlide];

    quizApp.nextButtons = function () {
        quizApp.nextButton.style.display = 'inline-block';
        quizApp.startButton.style.display = 'none';


    }
    quizApp.nextButtons();
    
}



quizApp.finalScore = function() {
    
    const answerContainers = quizApp.quizContainer.querySelectorAll(".answers");
    
    
    let correctAnswers = 0;
    const testList = quizApp.questions;
    testList.forEach(function(currentQuestion, questionNumber) {
        
        let answerContainer = answerContainers[questionNumber];
        let selected = `input[name=question${questionNumber}]:checked`;
        
        let userAnswer = (answerContainer.querySelector(selected)).value;
        if (userAnswer === currentQuestion.correctAnswer) {
            correctAnswers++;

        }
        let totalScore = (correctAnswers / quizApp.questions.length) * 100;
        console.log (totalScore);
        $('.scoreContainer').text(`Your score is ${totalScore}%`);
        $('.scoreContainer').append('<p><button class="again" id="again">Try again</button></p>');
        $('.again').on("click", function () {
            $('input').empty();
            $('.scoreContainer').empty();
            quizApp.quizContainer.style.display = 'inline-block';
            quizApp.generateQuiz();
        });

        


    });
}


quizApp.showNextSlide = function(){
    quizApp.currentSlide = quizApp.currentSlide +1;
    $(quizApp.quizContainer).append(quizApp.display[quizApp.currentSlide]);
    
    // i need to hide each previous Q
    // $(quizApp.quizContainer).hide(quizApp.display[quizApp.previousSlide]);

    if (quizApp.currentSlide === quizApp.display.length - 1) {
        quizApp.nextButton.style.display = 'none';
        quizApp.submitButton.style.display = 'inline-block';
    }
    
    else {
        quizApp.nextButton.style.display = 'inline-block';
        quizApp.submitButton.style.display = 'none';
        
    }

    }


init = () => {
    $('.start').on("click", quizApp.generateQuiz);
    $('.submit').on("click", function(){
        quizApp.quizContainer.style.display = 'none';
        quizApp.scoreContainer.style.display = 'inline-block';
        quizApp.finalScore();
    });
    $('.next').on("click", quizApp.showNextSlide);
    // $('.again').on("click", quizApp.generateQuiz);
}

$(document).ready(function () {
    init();
})








        //     1.	User clicks “Start the quiz” button, then Q1 appears
        //     2.	display question 1 and the set of choices to that question
        //     3.	user should make a choice(click the button)
        //     4.	if the choice is correct( === correct answer), then add  1 point to the finalScore, else add 0 to the finalPoint
        //     5.	once the choice is made(button clicked), current Q disappears(hide method)
        //     6.	if current Question < questionArray.length then move to the next question and set of choices, else display section with total score in %
        //         7.	offer to start again(button)

