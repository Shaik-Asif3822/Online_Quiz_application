let level=1
let retry_option=false

const quizData = [
  {
    question: '1. What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    answer: 'Paris',
  },
  {
    question: '2. What is the largest planet in our solar system?',
    options: ['Mars', 'Saturn', 'Jupiter', 'Neptune'],
    answer: 'Jupiter',
  },
  {
    question: '3. Which country won the FIFA World Cup in 2018?',
    options: ['Brazil', 'Germany', 'France', 'Argentina'],
    answer: 'France',
  },
  {
    question: '4. What is the tallest mountain in the world?',
    options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
    answer: 'Mount Everest',
  },
  {
    question: '5. Which is the largest ocean on Earth?',
    options: ['Pacific Ocean', 'Indian Ocean', 'Atlantic Ocean', 'Arctic Ocean'],
    answer: 'Pacific Ocean',
  },
  // {
  //   question: '6. What is the chemical symbol for gold?',
  //   options: ['Au', 'Ag', 'Cu', 'Fe'],
  //   answer: 'Au',
  // },
  // {
  //   question: '7. Who painted the Mona Lisa?',
  //   options: ['Pablo Picasso', 'Vincent van Gogh', 'Leonardo da Vinci', 'Michelangelo'],
  //   answer: 'Leonardo da Vinci',
  // },
  // {
  //   question: '8. Which planet is known as the Red Planet?',
  //   options: ['Mars', 'Venus', 'Mercury', 'Uranus'],
  //   answer: 'Mars',
  // },
  // {
  //   question: '9. What is the largest species of shark?',
  //   options: ['Great White Shark', 'Whale Shark', 'Tiger Shark', 'Hammerhead Shark'],
  //   answer: 'Whale Shark',
  // },
  // {
  //   question: '10. Which animal is known as the King of the Jungle?',
  //   options: ['Lion', 'Tiger', 'Elephant', 'Giraffe'],
  //   answer: 'Lion',
  // },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');
const nextlevelButton=document.getElementById('loadlevel');
const searchlevelButton=document.getElementById('searchlevel')

nextlevelButton.style.display="none";
searchlevelButton.style.display="none";

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

// Function to shuffle the answer options
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];
  
  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;
  
  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML =

    score>=3 ?`You scored ${score} out of ${quizData.length}! and eligible for level2 <br><a href="Gk2.html">Go for L2</a>`:(  `You scored ${score} out of ${quizData.length}!`);
  
}

function retryQuiz() {
  location.reload()
  retry_option=true;
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'inline-block';
  nextLevelButton.style.display = 'none'; // Hide the "Next Level" button
  resultContainer.innerHTML = '';
  displayQuestion();
}
function load(){
  resultContainer.innerHTML =

    score>=3 ?`You scored ${score} out of ${quizData.length}! and eligible for level2 <br><a href="Gk2.html">Go for L2</a>`:(  `You scored ${score} out of ${quizData.length}!`);
    
}

function loads(){
  resultContainer.innerHTML =

    score>=3 ?`You scored ${score} out of ${quizData.length}! and eligible for level2 <br><a href="search.html">Go for L2</a>`:(  `You scored ${score} out of ${quizData.length}!`);
    
}


// const scored = score;
// const beverage = scored >= 3 ? "Beer" : "Juice";
// console.log(beverage); // "Beer"

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  // showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }
  const scored = score;
  const beverage = scored >= 3 ? incorrectAnswersHtml+=`<br><button class="button"><a class="anchor" href="Gk2.html">Next Level</a></button>`  : "None";
  
  const scoreds = score;
  const beverages = scoreds >= 3 ? incorrectAnswersHtml+=`<br><button class="button"><a class="anchor" href="search.html">search option</a></button>`  : "None";

  // incorrectAnswersHtml+=`<br><button class="button"><a class="anchor" href="Gk2.html">Next Level</a></button>`
  

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
  
  nextlevelButton.addEventListener('click',load)
  searchlevelButton.addEventListener('click',loads)

}




submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);


displayQuestion();
