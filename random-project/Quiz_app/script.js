const questions = [
    {
        question: "What is the capital city of Japan?",
        answers: [
            { text: "Beijing", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Seoul", correct: false },
            { text: "Bangkok", correct: false },
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Mars", correct: true },
            { text: "Venus", correct: false },
        ]
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: [
            { text: "Leo Tolstoy", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Mark Twain", correct: false },
            { text: "Charles Dickens", correct: false },
        ]
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Carbon Dioxide", correct: true },
            { text: "Nitrogen", correct: false },
            { text: "Hydrogen", correct: false },
        ]
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: [
            { text: "Iron", correct: false },
            { text: "Gold", correct: false },
            { text: "Diamond", correct: true },
            { text: "Granite", correct: false },
        ]
    }
];

const question_element = document.getElementById("question");
const answer_button = document.getElementById("answer-buttons");
const next_button = document.getElementById("next-btn");

let current_question_index = 0;
let score = 0;

function start_quiz(){
    current_question_index = 0;
    score = 0;
    next_button.innerHTML = "Next";
    show_question();
}
function show_question(){
    reset_state(); 
    let current_question = questions[current_question_index];
    let question_no = current_question_index + 1;
    question_element.innerHTML = question_no + ". " + current_question.question;

    current_question.answers.forEach(answer=>{ // here 'answer' is the current object in the list of objects
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answer_button.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", select_answer);
    })
}



function reset_state(){
    next_button.style.display = 'none';
    while(answer_button.firstChild){
        answer_button.removeChild(answer_button.firstChild)
    }
}



function select_answer(e){
    const selected_btn = e.target;
    const is_correct = selected_btn.dataset.correct === 'true';
    if(is_correct){
        selected_btn.classList.add("correct");
        score++;
    }
    else{
        selected_btn.classList.add("incorrect");
    }
    Array.from(answer_button.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    next_button.style.display = "block";
}

function show_score(){
    reset_state();
    question_element.innerHTML = `You scored ${score} out of ${questions.length}`;
    next_button.innerHTML = "Play again";
    next_button.style.display = "block"
}

function handle_next_button(){
    current_question_index++;
    if(current_question_index <questions.length){
        show_question();
    }
    else{
        show_score();
    }
}


next_button.addEventListener("click", () => {
  if(current_question_index < questions.length){
    handle_next_button();
  }
  else{
    start_quiz();
  }
}
)

start_quiz()