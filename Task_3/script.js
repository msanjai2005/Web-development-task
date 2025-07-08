// Quiz Logic
const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tabular Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS"],
    answer: "CSS"
  },
  {
    question: "Which is used for web development?",
    options: ["Python", "JavaScript", "C"],
    answer: "JavaScript"
  }
];

let currentIndex = 0;
let score = 0;

function loadQuestion() {
  const q = questions[currentIndex];
  document.getElementById("question").textContent = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === questions[currentIndex].answer) {
    score++;
  }
  document.getElementById("score").textContent = `Score: ${score}`;
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("quiz-container").innerHTML = `<h3>Quiz Finished! Final Score: ${score}/${questions.length}</h3>`;
  }
}

loadQuestion(); // Initial call

// Fetch Joke from API
function getJoke() {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => {
      document.getElementById("joke").textContent = `${data.setup} - ${data.punchline}`;
    })
    .catch(err => {
      document.getElementById("joke").textContent = "Failed to load joke.";
    });
}
