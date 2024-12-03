let level=1
let retry_option=false

const quizData = [
  {
    question: '1. What is the cube root of 27?',
    options: ['2', '3', '4', '5'],
    answer: '3',
  },
  {
    question: '2.  What is the perimeter of a square with a side length of 7 cm?',
    options: ['21 cm', '24 cm', '28 cm', '30 cm'],
    answer: '28 cm',
  },
  {
    question: '3. What is the least common multiple (LCM) of 4 and 6?',
    options: ['8', '10', '12', '18'],
    answer: '12',
  },
  {
    question: '4. If the length of a rectangle is doubled and the width is halved, what happens to the area?',
    options: ['It is halved', 'It is unchanged', 'It is doubled', 'It is quadrupled'],
    answer: 'It is unchanged',
  },
  {
    question: '5. What is 45% of 200?',
    options: ['80', '85', '90', '95'],
    answer: '90',
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

    score>=3 ?`You scored ${score} out of ${quizData.length}!  <br>`:(  `You scored ${score} out of ${quizData.length}!`);
  
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