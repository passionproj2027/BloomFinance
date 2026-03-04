// Progress tracking
let progress = 0;
let modulesCompleted = {};

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

// Home page
function showHome() {
  document.getElementById("content").innerHTML = `
    <div class="card">
      <h2>Welcome to BloomFinance</h2>
      <p>BloomFinance empowers students to grow their financial knowledge.</p>
      <p>Learn, track progress, and master real-world money skills.</p>
    </div>
  `;
}

// Modules page
function showModules() {
  document.getElementById("content").innerHTML = `
    ${createModuleCard(
      "Budgeting Basics",
      "Learn how to plan your spending and savings to stay in control of your money.",
      ["Set a monthly budget", "Track your expenses", "Identify unnecessary spending"],
      "budgeting"
    )}
    ${createModuleCard(
      "Compound Interest",
      "Understand how money grows over time with interest compounding.",
      ["Invest early", "Calculate future value", "Watch small amounts grow"],
      "compound"
    )}
    ${createModuleCard(
      "Credit & Debt",
      "Learn responsible borrowing and how to manage credit.",
      ["Credit scores", "Interest rates", "Paying off debt"],
      "credit"
    )}
  `;
}

// Create module cards with mini-quiz
function createModuleCard(title, description, quizQuestions, id) {
  let completed = modulesCompleted[id] ? "✅ Completed" : "";
  let questionsHTML = "";
  quizQuestions.forEach((q, i) => {
    questionsHTML += `<button onclick="answerQuestion('${id}', ${i})">${q}</button>`;
  });
  return `
    <div class="card">
      <h2>${title} ${completed}</h2>
      <p>${description}</p>
      <div class="quiz">${questionsHTML}</div>
    </div>
  `;
}

// Handle quiz answers
function answerQuestion(moduleId, questionIndex) {
  if (!modulesCompleted[moduleId]) {
    modulesCompleted[moduleId] = 0;
  }
  modulesCompleted[moduleId] += 1;

  // Each module has 3 questions max
  if (modulesCompleted[moduleId] >= 3) {
    modulesCompleted[moduleId] = 3;
    progress += 33; // approximate progress per module
    alert("Module completed!");
    showModules(); // refresh module cards
  }
}

// Dashboard page
function showDashboard() {
  document.getElementById("content").innerHTML = `
    <div class="card">
      <h2>Your Progress</h2>
      <div class="progress-bar">
        <div class="progress" style="width:${progress}%"></div>
      </div>
      <p>${progress}% Completed</p>
      <p>Modules Completed: ${Object.keys(modulesCompleted).length}/3</p>
    </div>
  `;
}

// Initial load
showHome();
