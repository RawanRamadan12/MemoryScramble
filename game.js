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
  
  // If the grid needs more matches than available emojis, generate standard number targets instead
  if (pairsNeeded <= ICONS.length) {
    selectedIcons = ICONS.slice(0, pairsNeeded);
  } else {
    selectedIcons = [...ICONS];
    for (let i = ICONS.length + 1; i <= pairsNeeded; i++) {
      selectedIcons.push(i.toString());
    }
  }

  // Duplicate cards to make matching pairs, then randomize order
  const cardValues = [...selectedIcons, ...selectedIcons];
  cardValues.sort(() => Math.random() - 0.5);

  const board = document.getElementById('game-board');
  board.innerHTML = '';
  board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  board.style.pointerEvents = 'auto';

  // Build the card elements into HTML container
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

  updateMovesCounter();
}

function flipCard(card) {
  // Ignore clicks if 2 cards are already flipping or card is already face up
  if (isChecking) return;
  if (card.classList.contains('flipped')) return;
  if (card.classList.contains('matched')) return;

  card.classList.add('flipped');

  // Assign first picked card
  if (!firstCard) {
    firstCard = card;
    return;
  }

  // Assign second picked card and compare them
  secondCard = card;
  isChecking = true;
  moves++;
  updateMovesCounter();
  checkMatch();
}

function checkMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    // Correct match found
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs++;
    updateMovesCounter();
    resetTurn();
    if (matchedPairs === pairsNeeded) winGame();
  } else {
    // If cards don't match, give player 1 second to look before flipping them back down
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

function updateMovesCounter() {
  const counter = document.getElementById('moves-counter');
  if (pairsNeeded > 0) {
    counter.textContent = `Pairs: ${matchedPairs} / ${pairsNeeded}   |   Moves: ${moves}`;
  }
}

function startTimer(seconds) {
  let remaining = seconds;
  const display = document.getElementById('timer');

  display.style.color = '#f5a623';
  display.textContent = '⏱ ' + remaining + 's';

  timerInterval = setInterval(() => {
    remaining--;
    display.textContent = '⏱ ' + remaining + 's';

    // Change clock text color to neon red if time is running out
    if (remaining <= 10) {
      display.style.color = '#e94560';
    }

    if (remaining <= 0) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

function gameOver() {
  document.getElementById('game-board').style.pointerEvents = 'none';
  document.getElementById('message-text').textContent = "💀 Game Over! Time's up!";
  document.getElementById('message').style.display = 'flex';
}

function winGame() {
  clearInterval(timerInterval);
  document.getElementById('message-text').textContent = "🎉 You Win! " + moves + " moves";
  document.getElementById('message').style.display = 'flex';
}

function startGame() {
  clearInterval(timerInterval);
  document.getElementById('message').style.display = 'none';
  document.getElementById('message-text').textContent = '';
  const config = getConfig();
  const rows = config.rows;
  const cols = config.cols;
  const timeLimit = config.timeLimit;
  if (!validateConfig(rows, cols)) return;
  generateBoard(rows, cols);
  startTimer(timeLimit);
}