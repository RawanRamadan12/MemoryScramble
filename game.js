const ICONS = ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼',
               '🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐔',
               '🐧','🐦','🦆','🦅','🦉','🦇','🐺','🐗'];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let totalPairs = 0;
let timerInterval = null;

function generateBoard(rows, cols) {
  totalPairs = (rows * cols) / 2;
  matchedPairs = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  const selectedIcons = ICONS.slice(0, totalPairs);
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
}

function flipCard(card) {
  if (lockBoard) return;
  if (card.classList.contains('flipped')) return;
  if (card.classList.contains('matched')) return;
  card.classList.add('flipped');
  if (!firstCard) {
    firstCard = card;
    return;
  }
  secondCard = card;
  lockBoard = true;
  checkMatch();
}

function checkMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs++;
    resetTurn();
    if (matchedPairs === totalPairs) winGame();
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
  lockBoard = false;
}

function startTimer(seconds) {
  let remaining = seconds;
  const display = document.getElementById('timer');
  display.textContent = '⏱ ' + remaining + 's';
  timerInterval = setInterval(() => {
    remaining--;
    display.textContent = '⏱ ' + remaining + 's';
    if (remaining <= 0) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

function gameOver() {
  document.getElementById('game-board').style.pointerEvents = 'none';
  const msg = document.getElementById('message');
  msg.textContent = "💀 Game Over! Time's up!";
  msg.style.display = 'block';
}

function winGame() {
  clearInterval(timerInterval);
  const msg = document.getElementById('message');
  msg.textContent = "🎉 You Win! All pairs matched!";
  msg.style.display = 'block';
}

function startGame() {
  clearInterval(timerInterval);
  const msg = document.getElementById('message');
  msg.textContent = '';
  msg.style.display = 'none';
  const config = getConfig();
  const rows = config.rows;
  const cols = config.cols;
  const timeLimit = config.timeLimit;
  if (!validateConfig(rows, cols)) return;
  generateBoard(rows, cols);
  startTimer(timeLimit);
}