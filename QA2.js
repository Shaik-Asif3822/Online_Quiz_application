let level=1
let retry_option=false

const quizData = [
  {
    question: '1. What is the average of the numbers 5, 10, 15, and 20?',
    options: ['10', '12', '15', '17'],
    answer: '12',
  },
  {
    question: '2.  A rectangle has a length of 8 cm and a width of 5 cm. What is its area?',
    options: ['20 cm sq', '30 cm sq', '40 cm sq', '50 cm sq'],
    answer: '40 cm sq',
  },
  {
    question: '3. If a person travels at 60 km/h for 3 hours, how far does he travel?',
    options: ['180 km', '140 km', '150 km', '160 km'],
    answer: '180 km',
  },
  {
    question: '4. Find the next number in the series: 2, 4, 8, 16, __?',
    options: ['32', '24', '64', '48'],
    answer: '32',
  },
  {
    question: '5. What is the ratio of 25 to 100?',
    options: ['1:2', '1:3', '1:4', '1:5'],
    answer: '1:4',
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

    score>=3 ?`You scored ${score} out of ${quizData.length}! and eligible for level3 <br><a href="QA3.html">Go for L3</a>`:(  `You scored ${score} out of ${quizData.length}!`);
  
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

    score>=3 ?`You scored ${score} out of ${quizData.length}! and eligible for level3 <br><a href="QA3.html">Go for L3</a>`:(  `You scored ${score} out of ${quizData.length}!`);
    
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
  // incorrectAnswersHtml+=`<br><button class="button"><a class="anchor" href="QA3.html">Next Level</a></button>`

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
  nextlevelButton.addEventListener('click',load)
  
}



submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);
// nextLevelButton.addEventListener('click', loadLevel2); // Updated to use loadLevel2 function

displayQuestion();