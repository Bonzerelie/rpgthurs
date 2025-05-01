const allNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const allFilenames = ['c4', 'd4', 'e4', 'f4', 'g4', 'a4', 'b4', 'c5'];

let noteSet = [];
let fileSet = [];
let labelMode = 'note';
let currentAnswer = '';
let score = 0;
let total = 0;

function startGame(count) {
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');

  noteSet = allNotes.slice(0, count === 8 ? 7 : count); // 8 = full octave with c5
  fileSet = allFilenames.slice(0, count);

  generateButtons();
  nextQuestion();
}

function generateButtons() {
  const container = document.getElementById('note-buttons');
  container.innerHTML = '';

  noteSet.forEach((note, index) => {
    const btn = document.createElement('button');
    btn.textContent = labelMode === 'note' ? note : `${index + 1}ᵗʰ`;
    btn.onclick = () => handleAnswer(note);
    btn.dataset.note = note;
    container.appendChild(btn);
  });
}

function handleAnswer(note) {
  const correct = isCorrectAnswer(note);
  document.getElementById('feedback').textContent = correct ? 'Correct!' : `Wrong! It was ${currentAnswer}`;
  if (correct) score++;
  total++;
  document.getElementById('score').textContent = `Score: ${score}/${total}`;

  disableButtons();
  document.getElementById('next-btn').disabled = false;
  document.getElementById('next-btn').classList.remove('disabled');
}

function isCorrectAnswer(note) {
  return note === currentAnswer;
}

function disableButtons() {
  document.querySelectorAll('#note-buttons button').forEach(btn => {
    btn.disabled = true;
  });
}

function nextQuestion() {
  document.getElementById('feedback').textContent = '';
  document.getElementById('next-btn').disabled = true;
  document.getElementById('next-btn').classList.add('disabled');

  document.querySelectorAll('#note-buttons button').forEach(btn => {
    btn.disabled = false;
  });

  const randomIndex = Math.floor(Math.random() * fileSet.length);
  const file = fileSet[randomIndex];
  currentAnswer = file === 'c5' ? 'C' : file[0].toUpperCase(); // Treat c5 as C

  const audio = new Audio(`audio/${file}.mp3`);
  audio.play();
}

function playReference() {
  const audio = new Audio('audio/c4.mp3');
  audio.play();
}

function playCurrentNote() {
  const file = fileSet.find(f => f[0].toUpperCase() === currentAnswer || (f === 'c5' && currentAnswer === 'C'));
  if (file) {
    const audio = new Audio(`audio/${file}.mp3`);
    audio.play();
  }
}

function setLabelMode(mode) {
  labelMode = mode;
  document.getElementById('noteBtn').classList.toggle('active', mode === 'note');
  document.getElementById('degreeBtn').classList.toggle('active', mode === 'degree');
  generateButtons();
}

function resetScore() {
  score = 0;
  total = 0;
  document.getElementById('score').textContent = `Score: 0/0`;
}

function goBack() {
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('start-screen').classList.remove('hidden');
  resetScore();
}
