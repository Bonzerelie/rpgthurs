const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const noteButtonsContainer = document.getElementById('note-buttons-container');
const promptText = document.getElementById('prompt');
const playRefBtn = document.getElementById('play-reference');
const replayNoteBtn = document.getElementById('replay-note');
const nextBtn = document.getElementById('next-button');
const resetScoreBtn = document.getElementById('reset-score');
const backButton = document.getElementById('back-button');
const displayNotesBtn = document.getElementById('display-notes');
const displayDegreesBtn = document.getElementById('display-degrees');
const scaleLabel = document.getElementById('scale-label');
const octaveLabel = document.getElementById('octave-label');
const correctCount = document.getElementById('correct-count');
const incorrectCount = document.getElementById('incorrect-count');
const totalCount = document.getElementById('total-count');
const accuracyDisplay = document.getElementById('accuracy');

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

let currentNote = '';
let audio = new Audio();
let correct = 0;
let incorrect = 0;
let isAnswered = false;
let showDegrees = false;
let currentMode = 7;
let currentNotes = [];

function getNoteName(filename) {
  for (const [name, files] of Object.entries(noteMap)) {
    if (files.includes(filename)) return name;
  }
  return '';
}

function playNote(noteFile) {
  audio.src = `audio/${noteFile}.mp3`;
  audio.play();
}

function updateNoteButtonLabels() {
  const buttons = noteButtonsContainer.querySelectorAll('.blue-button');
  buttons.forEach(btn => {
    const note = btn.getAttribute('data-note');
    btn.textContent = showDegrees ? degreeMap[note] : note;
  });
}

function buildNoteButtons() {
  noteButtonsContainer.innerHTML = '';
  const keys = Object.keys(noteMap).slice(0, currentMode === 8 ? 7 : currentMode);
  currentNotes = keys.map(key => noteMap[key][0]);

  if (currentMode === 8) {
    currentNotes.push('c5');
  }

  keys.forEach
::contentReference[oaicite:21]{index=21}
 
