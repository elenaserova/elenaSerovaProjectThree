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
quizApp.nextButton = document.getElementById('next');
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

    
    
}

quizApp.finalScore = function() {
    console.log(quizApp.quizContainer);
    const answerContainers = quizApp.quizContainer.querySelectorAll(".answers");
    
    console.log(answerContainers);
    let correctAnswers = 0;
    const testList = quizApp.questions;
    testList.forEach(function(currentQuestion, questionNumber) {
        console.log(questionNumber);
        let answerContainer = answerContainers[questionNumber];
        let selected = `input[name=question${questionNumber}]:checked`;
        console.log(answerContainer, selected);
        let userAnswer = (answerContainer.querySelector(selected)).value;
        if (userAnswer === currentQuestion.correctAnswer) {
            correctAnswers++;

        }
        $('.scoreContainer').text(`Your score is ${correctAnswers} out of ${quizApp.questions.length}`);
        // $('.scoreContainer').push(`<button class="again" id="again">Try again</button>`);


    });
}


quizApp.showNextSlide = function(){
    quizApp.currentSlide = quizApp.currentSlide +1;
    // quizApp.quizContainer.innerHTML = quizApp.display[quizApp.currentSlide] i need to hide each previous Q
    $(quizApp.quizContainer).append(quizApp.display[quizApp.currentSlide]);
    if (quizApp.currentSlide === quizApp.display.length - 1) {
        quizApp.nextButton.style.display = 'none';
        quizApp.submitButton.style.display = 'inline-block';
    }
    
    else {
        quizApp.nextButton.style.display = 'inline-block';
        quizApp.submitButton.style.display = 'none';
        quizApp.againButton.style.display = 'none';
    }

    }


init = () => {
    $('.start').on("click", quizApp.generateQuiz);
    $('.submit').on("click", quizApp.finalScore);
    $('.next').on("click", quizApp.showNextSlide);
    $('.again').on("click", quizApp.generateQuiz);
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

