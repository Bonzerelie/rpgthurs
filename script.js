const noteMap = {
  'C': ['c4', 'c5'],
  'D': ['d4'],
  'E': ['e4'],
  'F': ['f4'],
  'G': ['g4'],
  'A': ['a4'],
  'B': ['b4']
};

const degreeMap = {
  'C': '1st',
  'D': '2nd',
  'E': '3rd',
  'F': '4th',
  'G': '5th',
  'A': '6th',
  'B': '7th'
};

let currentNotes = [];
let currentAnswer = '';
let audio = new Audio();
let showDegrees = false;
let currentMode = 7;
let isAnswered = false;

let correct = 0;
let incorrect = 0;

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const noteButtonsContainer = document.getElementById('note-buttons-container');
const nextButton = document.getElementById('next-button');
const resetScoreBtn = document.getElementById('reset-score');
const backButton = document.getElementById('back-button');
const displayNotesBtn = document.getElementById('display-notes');
const displayDegreesBtn = document.getElementById('display-degrees');
const promptText = document.getElementById('prompt');
const correctCount = document.getElementById('correct-count');
const incorrectCount = document.getElementById('incorrect-count');
const totalCount = document.getElementById('total-count');
const accuracyDisplay = document.getElementById('accuracy');

function getNoteName(file) {
  for (const [name, files] of Object.entries(noteMap)) {
    if (files.includes(file)) return name;
  }
  return '';
}

function getRandomNote() {
  const index = Math.floor(Math.random() * currentNotes.length);
  return currentNotes[index];
}

function playNote(note) {
  audio.src = `audio/${note}.mp3`;
  audio.play();
}

function setupGame() {
  const keys = Object.keys(noteMap).slice(0, currentMode === 8 ? 7 : currentMode);
  currentNotes = keys.map(k => noteMap[k][0]);
  if (currentMode === 8) currentNotes.push('c5');

  buildNoteButtons(keys);
  newRound();
}

function buildNoteButtons(keys) {
  noteButtonsContainer.innerHTML = '';
  keys.forEach(note => {
    const btn = document.createElement('button');
    btn.className = 'blue-button';
    btn.setAttribute('data-note', note);
    btn.textContent = showDegrees ? degreeMap[note] : note;
    btn.addEventListener('click', () => handleAnswer(note, btn));
    noteButtonsContainer.appendChild(btn);
  });
}

function handleAnswer(note, btn) {
  if (isAnswered) return;

  const correctNoteName = getNoteName(currentAnswer);
  const isCorrect = note === correctNoteName;

  btn.classList.add(isCorrect ? 'correct' : 'incorrect');
  Array.from(noteButtonsContainer.children).forEach(b => {
    b.disabled = true;
    if (b.getAttribute('data-note') === correctNoteName) {
      b.classList.add('correct');
    }
  });

  if (isCorrect) {
    correct++;
  } else {
    incorrect++;
  }

  updateScore();
  isAnswered = true;
  nextButton.disabled = false;
}

function newRound() {
  isAnswered = false;
  nextButton.disabled = true;
  Array.from(noteButtonsContainer.children).forEach(b => {
    b.disabled = false;
    b.classList.remove('correct', 'incorrect');
  });

  currentAnswer = getRandomNote();
  playNote(currentAnswer);
}

function updateScore() {
  const total = correct + incorrect;
  const accuracy = total ? ((correct / total) * 100).toFixed(1) : '0.0';
  correctCount.textContent = correct;
  incorrectCount.textContent = incorrect;
  totalCount.textContent = total;
  accuracyDisplay.textContent = `${accuracy}%`;
}

document.querySelectorAll('.mode-button').forEach(btn => {
  btn.addEventListener('click', () => {
    currentMode = parseInt(btn.getAttribute('data-mode'));
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    setupGame();
  });
});

nextButton.addEventListener('click', newRound);
resetScoreBtn.addEventListener('click', () => {
  correct = 0;
  incorrect = 0;
  updateScore();
});
backButton.addEventListener('click', () => {
  gameScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  noteButtonsContainer.innerHTML = '';
  correct = incorrect = 0;
  updateScore();
});

document.getElementById('play-reference').addEventListener('click', () => {
  playNote('c4');
});
document.getElementById('replay-note').addEventListener('click', () => {
  playNote(currentAnswer);
});

displayNotesBtn.addEventListener('click', () => {
  showDegrees = false;
  displayNotesBtn.classList.add('selected');
  displayDegreesBtn.classList.remove('selected');
  updateButtonLabels();
});
displayDegreesBtn.addEventListener('click', () => {
  showDegrees = true;
  displayDegreesBtn.classList.add('selected');
  displayNotesBtn.classList.remove('selected');
  updateButtonLabels();
});

function updateButtonLabels() {
  Array.from(noteButtonsContainer.children).forEach(btn => {
    const note = btn.getAttribute('data-note');
    btn.textContent = showDegrees ? degreeMap[note] : note;
  });
}
