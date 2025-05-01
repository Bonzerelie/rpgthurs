const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const noteButtonsDiv = document.getElementById("note-buttons");
const scoreDisplay = document.getElementById("score");
const nextButton = document.getElementById("next-button");
const noteModeBtn = document.getElementById("noteModeBtn");
const degreeModeBtn = document.getElementById("degreeModeBtn");

let currentNotes = [];
let correctNote = "";
let displayMode = "note";
let score = 0;
let total = 0;
let fullOctaveMode = false;

const noteMap = ["C", "D", "E", "F", "G", "A", "B"];
const scaleDegrees = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th"];

function startGame(noteCount) {
  fullOctaveMode = (noteCount === 8);
  currentNotes = fullOctaveMode ? 
    ["c4", "d4", "e4", "f4", "g4", "a4", "b4", "c5"] : 
    noteMap.slice(0, noteCount).map(n => n.toLowerCase() + "4");

  score = 0;
  total = 0;
  updateScore();
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  setDisplayMode(displayMode);
  nextNote();
}

function playNote() {
  const audio = new Audio(`audio/${correctNote}.mp3`);
  audio.play();
}

function playReferenceNote() {
  const audio = new Audio("audio/c4.mp3");
  audio.play();
}

function nextNote() {
  const randomIndex = Math.floor(Math.random() * currentNotes.length);
  correctNote = currentNotes[randomIndex];
  playNote();
  generateNoteButtons();
  nextButton.disabled = true;
}

function generateNoteButtons() {
  noteButtonsDiv.innerHTML = "";
  const options = fullOctaveMode ? noteMap : noteMap.slice(0, currentNotes.length);
  options.forEach((note, i) => {
    const button = document.createElement("button");
    button.textContent = displayMode === "note" ? note : scaleDegrees[i];
    button.onclick = () => handleAnswer(note);
    noteButtonsDiv.appendChild(button);
  });
}

function handleAnswer(selected) {
  const correctName = correctNote.startsWith("c5") ? "C" : correctNote[0].toUpperCase();
  const correctDisplay = displayMode === "note" ? correctName : scaleDegrees[noteMap.indexOf(correctName)];
  const selectedDisplay = displayMode === "note" ? selected : scaleDegrees[noteMap.indexOf(selected)];

  if (selected === correctName) {
    alert(`Correct! That was ${correctDisplay}`);
    score++;
  } else {
    alert(`Incorrect. That was ${correctDisplay}`);
  }
  total++;
  updateScore();
  nextButton.disabled = false;
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score} / ${total}`;
}

function resetScore() {
  score = 0;
  total = 0;
  updateScore();
}

function goBack() {
  gameScreen.style.display = "none";
  startScreen.style.display = "block";
}

function setDisplayMode(mode) {
  displayMode = mode;
  noteModeBtn.classList.toggle("active", mode === "note");
  degreeModeBtn.classList.toggle("active", mode === "degree");
  generateNoteButtons();
}
