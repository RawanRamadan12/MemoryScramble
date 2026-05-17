const ICONS = ['🐶','🐱','🦄','🐹','🐰','🦊','🐻','🐼',
               '🐨','🐯','🦁','🐮','🐎','🐸','🐵','🐔',
               '🐧','🐍','🦆','🦍','🦉','🐈‍⬛','🪼','🐳'];

let firstCard = null;
let secondCard = null;
let isChecking = false;
let matchedPairs = 0;
let pairsNeeded = 0;
let moves = 0;
let timerInterval = null;

function generateBoard(rows, cols) {
  pairsNeeded = (rows * cols) / 2;
  matchedPairs = 0;
  moves = 0;
  firstCard = null;
  secondCard = null;
  isChecking = false;

  let selectedIcons = [];
  if (pairsNeeded <= ICONS.length) {
    selectedIcons = ICONS.slice(0, pairsNeeded);
  } else {
    selectedIcons = [...ICONS];
    for (let i = ICONS.length + 1; i <= pairsNeeded; i++) {
      selectedIcons.push(i.toString());
    }
  }

  const cardValues = [...selectedIcons, ...selectedIcons];
  cardValues.sort(() => Math.random() - 0.5);

  const board = document.getElementById('game-board');
  board.innerHTML = '';
  board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  board.style.pointerEvents = 'auto';

  cardValues.forEach((icon) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = icon;
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">❓</div>
        <div class="card-back">${icon}</div>
      </div>`;
    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
  });

  updateStats();
}

function flipCard(card) {
  if (isChecking) return;
  if (card.classList.contains('flipped')) return;
  if (card.classList.contains('matched')) return;

  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  isChecking = true;
  moves++;
  updateStats();
  checkMatch();
}

function checkMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs++;
    updateStats();
    resetTurn();
    if (matchedPairs === pairsNeeded) winGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  isChecking = false;
}

function updateStats() {
  document.getElementById('pairs').textContent = matchedPairs + ' / ' + pairsNeeded;
  document.getElementById('moves-counter').textContent = moves;
}

function startTimer(seconds) {
  let remaining = seconds;
  const display = document.getElementById('timer');
  display.textContent = remaining + 's';
  display.className = 'stat-value';

  timerInterval = setInterval(() => {
    remaining--;
    display.textContent = remaining + 's';
    if (remaining <= 10) {
      display.className = 'stat-value warning';
    }
    if (remaining <= 0) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

function gameOver() {
  document.getElementById('game-board').style.pointerEvents = 'none';
  const msg = document.getElementById('message');
  document.getElementById('message-text').textContent =
    "💀 Game Over! Time's up! You found " + matchedPairs + " of " + pairsNeeded + " pairs!";
  msg.className = '';
  msg.style.display = 'flex';
}

function winGame() {
  clearInterval(timerInterval);
  const msg = document.getElementById('message');
  document.getElementById('message-text').textContent =
    "🎉 You Win! All pairs matched in " + moves + " moves!";
  msg.className = 'win';
  msg.style.display = 'flex';
  document.getElementById('game-board').style.pointerEvents = 'none';
}

function startGame() {
  clearInterval(timerInterval);
  const msg = document.getElementById('message');
  msg.style.display = 'none';
  msg.className = '';
  document.getElementById('message-text').textContent = '';
  document.getElementById('stats').style.display = 'flex';

  const config = getConfig();
  const rows = config.rows;
  const cols = config.cols;
  const timeLimit = config.timeLimit;

  if (!validateConfig(rows, cols)) return;

  generateBoard(rows, cols);
  startTimer(timeLimit);
}