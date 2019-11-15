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
    // console.log("display", display)
    // quizContainer.innerHTML = display.join("");
    // const slides = document.querySelectorAll(".slide");
    quizApp.quizContainer = document.querySelector(".quizContainer");
    quizApp.quizContainer.innerHTML = quizApp.display[quizApp.currentSlide];
    // console.log("slides", slides);
    // displaySlide(slides, currentSlide);
}



// let quizApp.numCorrect = 0;
// function finalScore() {
//     const answersContainer = quizContainer.querySelectorAll('.answers');
    
//     quizApp.questions.forEach((currentQuestion, questionNumber) => {
//         let answerContainer = answersContainer[questionNumber];
//         const selected = 'input[name=question' + questionNumber + ']:checked';
//         const userAnswer = (answerContainer.querySelector(selected) || {}).value;
//         if (userAnswer === currentQuestion.correctAnswer) {
//             quizApp.correctAnswers++;

//         }
//         $('.scoreContainer').text(`Your score is ${quizApp.numCorrect} out of ${quizApp.questions.length}`);
        
    

//     });
// }


// const slides = document.querySelectorAll(".slide");
// console.log(slides);
// let currentSlide = 0;

// function showSlide(n) {
    
//     slides[currentSlide].classList.remove('activeSlide');
//     slides[n].classList.add('activeSlide');
//     currentSlide = n;
//     if (currentSlide === slides.length - 1) {
//         nextButton.style.display = 'none';
//         submitButton.style.display = 'inline-block';
//     }
//     else {
//         nextButton.style.display = 'inline-block';
//         submitButton.style.display = 'none';
//     }
// }



quizApp.showNextSlide = function(){
    quizApp.currentSlide = quizApp.currentSlide +1;
    quizApp.quizContainer.innerHTML = quizApp.display[quizApp.currentSlide]
    if (quizApp.currentSlide === quizApp.display.length) {
        quizApp.nextButton.style.display = 'none';
        quizApp.submitButton.style.display = 'inline-block';
    }
    else {
        quizApp.nextButton.style.display = 'inline-block';
        quizApp.submitButton.style.display = 'none';
    }

    }

// const quizContainer = document.getElementById("quiz");
// const scoreContainer = document.getElementById("score");
// const submitButton = document.getElementById("submit");



// const nextButton = document.getElementById("next");
// showSlide(0);


init = () => {
    $('.start').on("click", quizApp.generateQuiz);
    // $('.submit').on("click", finalScore);
    $('.next').on("click", quizApp.showNextSlide);
}

$(document).ready(function () {
    init();
})



// $(".next").click(function () {
//     $(".slide").animate({
//         opacity: 0
//     }, 50, function () {
//     });
// });






        //     1.	User clicks “Start the quiz” button, then Q1 appears
        //     2.	display question 1 and the set of choices to that question
        //     3.	user should make a choice(click the button)
        //     4.	if the choice is correct( === correct answer), then add  1 point to the finalScore, else add 0 to the finalPoint
        //     5.	once the choice is made(button clicked), current Q disappears(hide method)
        //     6.	if current Question < questionArray.length then move to the next question and set of choices, else display section with total score in %
        //         7.	offer to start again(button)

