let level=1
let retry_option=false

const quizData = [
  {
    question: '1. What is the value of 15x12',
    options: ['170', '180', '190', '200'],
    answer: '180',
  },
  {
    question: '2. If a train travels 120 km in 2 hours, what is its speed in km/h?',
    options: ['40', '50', '60', '70'],
    answer: '60',
  },
  {
    question: '3. What is 40% of 80 ?',
    options: ['32', '40', '50', '60'],
    answer: '32',
  },
  {
    question: '4. What is the square root of 256?',
    options: ['12', '14', '16', '18'],
    answer: '16',
  },
  {
    question: '5. How many degrees are in the sum of the interior angles of a triangle?',
    options: ['90 degrees', '180 degrees', '270 degrees', '360 degrees'],
    answer: '180 degrees',
  },
  
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');
const nextlevelButton=document.getElementById('loadlevel');

nextlevelButton.style.display="none";


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

    score>=3 ?`You scored ${score} out of ${quizData.length}! and eligible for level2 <br><a href="QA2.html">Go for L2</a>`:(  `You scored ${score} out of ${quizData.length}!`);
  
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

    score>=3 ?`You scored ${score} out of ${quizData.length}! and eligible for level2 <br><a href="QA2.html">Go for L2</a>`:(  `You scored ${score} out of ${quizData.length}!`);
    
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

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
  // incorrectAnswersHtml+=`<br><button class="button"><a class="anchor" href="QA2.html">Next Level</a></button>`

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
  
}



submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);
// nextLevelButton.addEventListener('click', loadLevel2); // Updated to use loadLevel2 function

displayQuestion();