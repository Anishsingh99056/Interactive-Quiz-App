// =========================================
// Quiz Questions
// =========================================

const quizData = [
    {
        question: "Which keyword is used to declare a block-scoped variable that cannot be reassigned?",
        options: ["var", "let", "const", "assign"],
        correct: 2
    },
    {
        question: "What is the correct data type output of 'typeof null' in JavaScript?",
        options: ["null", "object", "undefined", "string"],
        correct: 1
    },
    {
        question: "Which built-in method adds one or more elements to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: 0
    },
    {
        question: "What type of equality operator (===) checks both value and data type?",
        options: [
            "Loose equality",
            "Assignment equality",
            "Strict equality",
            "Relational equality"
        ],
        correct: 2
    },
    {
        question: "How do you write a single-line comment cleanly in JavaScript?",
        options: [
            "<!-- Comment -->",
            "/* Comment */",
            "# Comment",
            "// Comment"
        ],
        correct: 3
    },
    {
        question: "Which of these functions is executed instantly after it is defined?",
        options: [
            "Callback Function",
            "IIFE (Immediately Invoked Function Expression)",
            "Arrow Function",
            "Anonymous Function"
        ],
        correct: 1
    },
    {
        question: "What is the primary purpose of Array.prototype.map()?",
        options: [
            "Filters items out",
            "Creates a new array with transformed elements",
            "Reduces array to a single value",
            "Sorts items alphabetically"
        ],
        correct: 1
    },
    {
        question: "Which statement properly checks if a property exists directly inside an object?",
        options: [
            "obj.hasProperty()",
            "exists()",
            "prop in obj",
            "obj.hasOwnProperty()"
        ],
        correct: 3
    },
    {
        question: "What value does a JavaScript function return by default if no return statement is written?",
        options: [
            "null",
            "0",
            "undefined",
            "false"
        ],
        correct: 2
    },
    {
        question: "Which web API mechanism allows data to persist across browser reloads without expiring?",
        options: [
            "sessionStorage",
            "cookies",
            "localStorage",
            "IndexedDB"
        ],
        correct: 2
    }
];

// =========================================
// Global Variables
// =========================================

let currentQuestionIndex = 0;
let runningScore = 0;
let isAnswered = false;

let studentName = "";
let enrollmentId = "";

let totalTimeInSeconds = 30 * 60;
let countdownIntervalId = null;

// =========================================
// DOM Elements
// =========================================

const welcomeView = document.getElementById("welcome-view");
const quizView = document.getElementById("quiz-view");
const resultsView = document.getElementById("results-view");

const registrationForm = document.getElementById("registration-form");

const timerBanner = document.getElementById("global-timer");
const timerClock = document.getElementById("timer-clock");

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");

const nextButton = document.getElementById("next-button");

const questionCounter = document.getElementById("question-counter");
const liveScoreDisplay = document.getElementById("live-score-display");
const progressBar = document.getElementById("progress-bar");

const studentSummary = document.getElementById("student-summary");
const finalMarks = document.getElementById("final-marks");
const finalScoreText = document.getElementById("final-score-text");
const feedbackContainer = document.getElementById("feedback-container");

const restartButton = document.getElementById("restart-button");

const themeCheckbox = document.getElementById("theme-toggle-checkbox");
const themeText = document.getElementById("theme-text");

// =========================================
// Theme Toggle
// =========================================

themeCheckbox.addEventListener("change", function () {

    if (this.checked) {

        document.body.classList.add("light-mode");
        themeText.textContent = "Light Mode";

    } else {

        document.body.classList.remove("light-mode");
        themeText.textContent = "Dark Mode";

    }

});
// =========================================
// Registration
// =========================================

function handleRegistration(e) {

    studentName = document
        .getElementById("student-name")
        .value
        .trim();

    enrollmentId = document
        .getElementById("enrollment-id")
        .value
        .trim();

    if (studentName === "" || enrollmentId === "") {
        return;
    }

    // Hide Welcome Screen
    welcomeView.classList.add("hide");

    // Show Quiz Screen
    quizView.classList.remove("hide");

    // Show Timer
    timerBanner.classList.remove("hide");

    // Start Quiz
    startTimerClock();

    renderQuestion();
}

// =========================================
// Timer Functions
// =========================================

function startTimerClock() {

    clearInterval(countdownIntervalId);

    updateTimerDisplay();

    countdownIntervalId = setInterval(() => {

        totalTimeInSeconds--;

        updateTimerDisplay();

        // Last Minute Warning
        if (totalTimeInSeconds === 60) {
            timerBanner.classList.add("timer-warning");
        }

        // Time Finished
        if (totalTimeInSeconds <= 0) {

            clearInterval(countdownIntervalId);

            renderFinalResults(true);

        }

    }, 1000);

}

// =========================================
// Update Timer
// =========================================

function updateTimerDisplay() {

    const minutes = Math.floor(totalTimeInSeconds / 60);

    const seconds = totalTimeInSeconds % 60;

    timerClock.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

// =========================================
// Display Question
// =========================================

function renderQuestion() {

    isAnswered = false;

    nextButton.disabled = true;

    const currentQuestion = quizData[currentQuestionIndex];

    questionCounter.textContent =
        `Question ${currentQuestionIndex + 1} of ${quizData.length}`;

    liveScoreDisplay.textContent =
        `Score: ${runningScore}`;

    const progress =
        (currentQuestionIndex / quizData.length) * 100;

    progressBar.style.width = progress + "%";

    questionElement.textContent =
        currentQuestion.question;

    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.classList.add("option-btn");

        button.textContent = option;

        button.addEventListener("click", () => {

            handleOptionSelection(index, button);

        });

        optionsContainer.appendChild(button);

    });

}
// =========================================
// Handle Answer Selection
// =========================================

function handleOptionSelection(selectedIndex, clickedButton) {

    // Prevent multiple answers
    if (isAnswered) return;

    isAnswered = true;

    const currentQuestion = quizData[currentQuestionIndex];
    const correctIndex = currentQuestion.correct;

    const optionButtons =
        optionsContainer.querySelectorAll(".option-btn");

    // Correct Answer
    if (selectedIndex === correctIndex) {

        clickedButton.classList.add("correct");

        runningScore++;

        liveScoreDisplay.textContent =
            `Score: ${runningScore}`;

    }
    // Wrong Answer
    else {

        clickedButton.classList.add("incorrect");

        optionButtons[correctIndex]
            .classList.add("correct");

    }

    // Disable all buttons
    optionButtons.forEach(button => {

        button.disabled = true;

    });

    // Enable Next Button
    nextButton.disabled = false;

}

// =========================================
// Next Question
// =========================================

function handleNextNavigation() {

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {

        renderQuestion();

    } else {

        clearInterval(countdownIntervalId);

        renderFinalResults(false);

    }

}
// =========================================
// Display Final Results
// =========================================

function renderFinalResults(wasTimeout = false) {

    // Complete Progress Bar
    progressBar.style.width = "100%";

    // Hide Quiz
    quizView.classList.add("hide");

    // Hide Timer
    timerBanner.classList.add("hide");

    // Show Result Screen
    resultsView.classList.remove("hide");

    // Student Information
    studentSummary.textContent =
        `Participant: ${studentName} (${enrollmentId})`;

    // Marks
    finalMarks.textContent =
        `${runningScore}/${quizData.length}`;

    if (wasTimeout) {

        finalScoreText.innerHTML =
            `<span style="color:var(--color-incorrect);font-weight:700;">
            Time Expired!
            </span><br>
            Quiz Auto Submitted.`;

    } else {

        finalScoreText.textContent =
            "Quiz Completed Successfully!";

    }

    // Remove Previous Feedback Classes
    feedbackContainer.className = "feedback-box";

    // =====================================
    // Feedback According to Score
    // =====================================

    if (runningScore <= 4) {

        feedbackContainer.classList.add("feedback-bad");

        feedbackContainer.innerHTML = `
            <strong>⚠️ Needs Improvement</strong><br><br>

            Hi <b>${studentName}</b>,
            your JavaScript fundamentals need more practice.

            Revise Variables, Arrays,
            Objects, Functions,
            Loops and DOM Manipulation.

            Keep practicing daily.
        `;

    }

    else if (runningScore <= 7) {

        feedbackContainer.classList.add("feedback-average");

        feedbackContainer.innerHTML = `
            <strong>👍 Good Work</strong><br><br>

            Nice job <b>${studentName}</b>!

            You understand most JavaScript concepts,
            but a little more practice will make
            you much stronger.
        `;

    }

    else {

        feedbackContainer.classList.add("feedback-excellent");

        feedbackContainer.innerHTML = `
            <strong>🌟 Excellent!</strong><br><br>

            Outstanding <b>${studentName}</b>!

            Your JavaScript fundamentals are excellent.

            Keep learning advanced topics like
            ES6+, Promises,
            Async/Await and APIs.
        `;

    }

}
// =========================================
// Reset Quiz
// =========================================

function resetTerminalSession() {

    // Stop Timer
    clearInterval(countdownIntervalId);

    // Reset Variables
    currentQuestionIndex = 0;
    runningScore = 0;
    isAnswered = false;

    studentName = "";
    enrollmentId = "";

    totalTimeInSeconds = 30 * 60;

    // Reset Timer UI
    timerBanner.classList.remove("timer-warning");
    timerBanner.classList.add("hide");

    // Reset Progress Bar
    progressBar.style.width = "0%";

    // Hide Result Screen
    resultsView.classList.add("hide");

    // Show Welcome Screen
    welcomeView.classList.remove("hide");

    // Clear Form
    registrationForm.reset();

    // Reset Theme (Optional)
    // document.body.classList.remove("light-mode");
    // themeCheckbox.checked = false;
    // themeText.textContent = "Dark Mode";

}

// =========================================
// Event Listeners
// =========================================

// Start Quiz
registrationForm.addEventListener(
    "submit",
    handleRegistration
);

// Next Question
nextButton.addEventListener(
    "click",
    handleNextNavigation
);

// Restart Quiz
restartButton.addEventListener(
    "click",
    resetTerminalSession
);

// =========================================
// Optional Keyboard Shortcuts
// =========================================

// Press Enter to move to the next question
document.addEventListener("keydown", function (event) {

    if (
        event.key === "Enter" &&
        !nextButton.disabled &&
        !quizView.classList.contains("hide")
    ) {

        handleNextNavigation();

    }

});

// =========================================
// End of Script
// =========================================

console.log(
    "Interactive JavaScript Quiz Loaded Successfully!"
);