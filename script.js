// Define game modes
const modes = {
    mode1: { notes: ['C4', 'D4'], displayText: 'Notes C and D from one octave' },
    mode2: { notes: ['C4', 'D4', 'E4'], displayText: 'Notes C, D and E from one octave' },
    mode3: { notes: ['C4', 'D4', 'E4', 'F4'], displayText: 'Notes C, D, E and F from one octave' },
    mode4: { notes: ['C4', 'D4', 'E4', 'F4', 'G4'], displayText: 'Notes C, D, E, F and G from one octave' },
    mode5: { notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4'], displayText: 'Notes C, D, E, F, G and A from one octave' },
    mode6: { notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'], displayText: 'Notes C, D, E, F, G, A and B from one octave' },
    mode7: { notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'], displayText: 'One Octave (notes C4 to C5)' },
    mode8: { notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'], displayText: 'One Octave (notes C4 to C5)' }
};

let currentMode;
let currentScore = 0;
let currentNoteIndex = 0;
let currentNote;
let noteOptions = [];
let noteAnswerButtons = [];
let correctAnswer;

// Get elements from HTML
const backButton = document.getElementById('back-button');
const resetScoreButton = document.getElementById('reset-score');
const nextButton = document.getElementById('next-button');
const noteRangeText = document.getElementById('octave-label');
const noteOptionsDiv = document.getElementById('note-buttons-container');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const correctCountSpan = document.getElementById('correct-count');
const incorrectCountSpan = document.getElementById('incorrect-count');
const totalCountSpan = document.getElementById('total-count');
const accuracySpan = document.getElementById('accuracy');

let correctCount = 0;
let incorrectCount = 0;
let totalCount = 0;

// Function to show the start screen
function showStartScreen() {
    startScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
}

// Function to show the game screen
function showGameScreen() {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
}

// Function to start the game with a specific mode
function startGame(mode) {
    currentMode = mode;
    currentNoteIndex = 0;
    noteOptions = [...modes[mode].notes];
    correctAnswer = null;
    noteAnswerButtons = [];
    nextButton.disabled = true;
    updateNoteDisplay();
    showGameScreen();
    nextNote();
}

// Update the note display text according to the mode selected
function updateNoteDisplay() {
    noteRangeText.textContent = modes[currentMode].displayText;
}

// Handle logic for next note
function nextNote() {
    currentNote = noteOptions[Math.floor(Math.random() * noteOptions.length)];
    playNoteAudio(currentNote);
    generateAnswerOptions();
    nextButton.disabled = true;
}

// Generate the possible answer options
function generateAnswerOptions() {
    noteOptionsDiv.innerHTML = '';
    const allOptions = [...new Set([correctAnswer, ...shuffleArray(noteOptions).slice(0, 3)])];
    shuffleArray(allOptions);

    allOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'blue-button';
        button.textContent = option.replace(/[0-9]/g, ''); // Remove octave for display
        button.onclick = () => checkAnswer(option, button);
        noteOptionsDiv.appendChild(button);
        noteAnswerButtons.push(button);
    });
}

// Check if the selected answer is correct
function checkAnswer(selected, button) {
    disableAnswerButtons();
    if (selected === correctAnswer) {
        button.classList.add('correct');
        correctCount++;
    } else {
        button.classList.add('incorrect');
        incorrectCount++;
        // Highlight correct one
        noteAnswerButtons.forEach(btn => {
            if (btn.textContent === correctAnswer.replace(/[0-9]/g, '')) {
                btn.classList.add('correct');
            }
        });
    }
    totalCount++;
    updateScore();
    nextButton.disabled = false;
}

// Disable buttons after an answer is selected
function disableAnswerButtons() {
    noteAnswerButtons.forEach(btn => btn.disabled = true);
}

// Update score display
function updateScore() {
    correctCountSpan.textContent = correctCount;
    incorrectCountSpan.textContent = incorrectCount;
    totalCountSpan.textContent = totalCount;
    accuracySpan.textContent = totalCount > 0 ? ((correctCount / totalCount) * 100).toFixed(1) + '%' : '0.0%';
}

// Play note audio
function playNoteAudio(note) {
    const audio = new Audio(`audio/${note}.mp3`);
    audio.play();
    correctAnswer = note;
}

// Shuffle utility
function shuffleArray(array) {
    return array.slice().sort(() => Math.random() - 0.5);
}

// Handle start screen mode button clicks
document.querySelectorAll('.mode-button').forEach(button => {
    button.addEventListener('click', () => {
        const modeNumber = button.getAttribute('data-mode');
        const modeKey = 'mode' + modeNumber;
        startGame(modeKey);
    });
});

// Handle next button click
nextButton.addEventListener('click', () => {
    nextNote();
});

// Handle back button click
backButton.addEventListener('click', () => {
    resetGame();
    showStartScreen();
});

// Handle reset score button click
resetScoreButton.addEventListener('click', () => {
    resetGame();
    updateScore();
});

function resetGame() {
    correctCount = 0;
    incorrectCount = 0;
    totalCount = 0;
    noteAnswerButtons = [];
    noteOptionsDiv.innerHTML = '';
    nextButton.disabled = true;
}

// Initialize app
showStartScreen();
