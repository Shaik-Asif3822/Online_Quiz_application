const quizData = [
    {
      question: '1.What is the capital of Australia?',
      options: ['Sydney', 'Melbourne', 'Brisbane', 'Canberra'],
      answer: 'Canberra',
    },
    {
      question: '2.Who is known as the Father of Computers?',
      options: ['Charles Babbage', 'Alan Turing', 'Bill Gates', 'Steve Jobs'],
      answer: 'Charles Babbage',
    },
    {
      question: '3.Which language is the most spoken worldwide?',
      options: ['Spanish', 'English', 'Mandarin Chinese', 'Hindi'],
      answer: 'Mandarin Chinese',
    },
    {
      question: '4.In which country is the Eiffel Tower located?',
      options: ['Italy', 'Spain', 'France', 'Germany'],
      answer: 'France',
    },
    {
      question: '5.What is the capital city of Canada?',
      options: [
        'Toronto',
        'Ottawa',
        'Vancouver',
        'Montreal',
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
    resultContainer.innerHTML = score>=3 ?`You scored ${score} out of ${quizData.length}! and eligible for level3 <br><a href="Gk3.html">Go for L3</a>`:(  `You scored ${score} out of ${quizData.length}!`);
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
  function load(){
    resultContainer.innerHTML =
  
      score>=3 ?`You scored ${score} out of ${quizData.length}! and eligible for level2 <br><a href="Gk3.html">Go for L3</a>`:(  `You scored ${score} out of ${quizData.length}!`);
      
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
    const scored = score;
  const beverage = scored >= 3 ? incorrectAnswersHtml+=`<br><button class="button"><a class="anchor" href="Gk3.html">Next Level</a></button>`  : "None";

  const scoreds = score;
  const beverages = scoreds >= 3 ? incorrectAnswersHtml+=`<br><button class="button"><a class="anchor" href="search.html">search option</a></button>`  : "None";
    // incorrectAnswersHtml+=`<br><button class="button"><a class="anchor" href="Gk3.html">Next Level</a></button>`
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
    
    nextlevelButton.addEventListener('click',load)
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