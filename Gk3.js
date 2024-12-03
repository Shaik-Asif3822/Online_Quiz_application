const quizData = [
    {
      question: 'The Great Wall of China was primarily built to protect against invasions from which group?',
      options: ['Mongols', 'Romans', 'Persians', 'Vikings'],
      answer: 'Mongols',
    },
    {
      question: '2.Which country gifted the Statue of Liberty to the United States?',
      options: ['Canada', 'France', 'England', 'Germany'],
      answer: 'France',
    },
    {
      question: '3.What is the main ingredient in traditional Japanese miso soup?',
      options: ['Rice', 'Seaweed', 'Soybean paste', 'Fish'],
      answer: 'Soybean paste',
    },
    {
      question: '4.In which year did World War II end?',
      options: ['1940', '1942', '1945', '1950'],
      answer: '1945',
    },
    {
      question: '5.Who is the author of the "Harry Potter" series?',
      options: [
        'J.R.R. Tolkien',
        'C.S. Lewis',
        'J.K. Rowling',
        'Stephen King',
      ],
      answer: 'Ottawa',
    },
    // {
    //   question: '6.What is the chemical symbol for water?',
    //   options: ['O2', 'H2o', 'Co2', 'Nacl'],
    //   answer: 'H2o',
    // },
    // {
    //   question: '7.How many continents are there on Earth?',
    //   options: [
    //     '5',
    //     '6',
    //     '7',
    //     '8',
    //   ],
    //   answer: '7',
    // },
    // {
    //   question: '8.Which country is known as the Land of the Rising Sun?',
    //   options: ['India', 'Japan', 'China', 'Thailand'],
    //   answer: 'China',
    // },
    // {
    //   question: '9.What is the smallest country in the world?',
    //   options: [
    //     'Monaco',
    //     'Vatican City',
    //     'san Marino',
    //     'Malta',
    //   ],
    //   answer: 'Vatican City',
    // },
    // {
    //   question: '10.Which element has the atomic number 1?',
    //   options: ['H', 'He', 'O', 'C'],
    //   answer: 'H',
    // },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  // const nextlevelButton=document.getElementById("level2");
  const nextlevelButton=document.getElementById('loadlevel');
  const searchlevelButton=document.getElementById('searchlevel')

  nextlevelButton.style.display="none";
  searchlevelButton.style.display="none";

 
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
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
    resultContainer.innerHTML = score>=3 ?`You scored ${score} out of ${quizData.length}! <br>`:(  `You scored ${score} out of ${quizData.length}!`);
  }
  
  
  
  
  
  function retryQuiz() {
    location.reload()
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }


function loads(){
  resultContainer.innerHTML =

    score>=3 ?`You scored ${score} out of ${quizData.length}! and eligible for level2 <br><a href="search.html">Go for L2</a>`:(  `You scored ${score} out of ${quizData.length}!`);
    
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
    
    const scoreds = score;
    const beverages = scoreds >= 3 ? incorrectAnswersHtml+=`<br><button class="button"><a class="anchor" href="search.html">search option</a></button>`  : "None";

    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
    
    searchlevelButton.addEventListener('click',loads)
  }
  
  // function level2(){
  //   // if score===parseInt(8){
  //     <p>good job</p>
  //     // nextlevelButton.style.display = 'inline-block';
  //   // }
  // }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  // nextlevelButton.addEventListener('click', level2)
  displayQuestion();