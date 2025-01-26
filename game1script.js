const cardDeck = document.getElementById('card-deck');
const message = document.getElementById('message');
const healthBarFill = document.getElementById('health-bar-fill');
const nextButton = document.getElementById('next-button');

let health = 100;
let maxPicks = 5;
let picks = 0;
let cardValues = [];
let currentCardIndex = -1;

// Display remaining picks
const picksCounter = document.createElement('div');
picksCounter.id = 'picks-counter';
picksCounter.style.marginTop = '10px';
message.insertAdjacentElement('afterend', picksCounter);

function updatePicksCounter() {
  picksCounter.textContent = `Picks Left: ${maxPicks - picks}`;
}

// Generate random cards with effects
function initializeCards() {
  cardValues = Array(3)
    .fill(null)
    .map(() => {
      const effect = Math.random() < 0.5 ? 'damage' : 'heal';
      const value = Math.floor(Math.random() * 20) + 10; // Random value between 10-30
      return { effect, value };
    });

  renderCards();
  updatePicksCounter();
}

// Render hidden cards
function renderCards() {
  cardDeck.innerHTML = '';
  cardValues.forEach((_, index) => {
    const card = document.createElement('div');
    card.className = 'card hidden';
    card.dataset.index = index;
    card.addEventListener('click', revealCard);
    cardDeck.appendChild(card);
  });
}

// Reveal card content
function revealCard(event) {
  const card = event.target;
  currentCardIndex = card.dataset.index;
  const { effect, value } = cardValues[currentCardIndex];

  // Show card content
  card.classList.add('revealed');
  card.innerHTML = `<img src="${effect === 'damage' ? 'damage.png' : 'heal.png'}" alt="${effect}">`;

  // Update health
  if (effect === 'damage') {
    health -= value;
  } else {
    health += value;
    health = Math.min(100, health); // Cap health at 100
  }
  updateHealthBar();

  // Disable further clicks and enable the next button
  document.querySelectorAll('.card').forEach(c => c.removeEventListener('click', revealCard));
  nextButton.disabled = false;

  // Show result message
  message.textContent = `${effect === 'damage' ? 'Ouch! You lost' : 'Great! You gained'} ${value} health.`;
}

// Update health bar display
function updateHealthBar() {
  healthBarFill.style.width = `${health}%`;
}

// Reset for the next pick
function nextPick() {
  picks++;
  if (picks === maxPicks || health <= 0) {
    endGame();
  } else {
    message.textContent = 'Pick another card!';
    nextButton.disabled = true;
    initializeCards();
  }
}

// End the game
function endGame() {
  cardDeck.innerHTML = '';
  nextButton.style.display = 'none';

  if (health <= 0) {
    message.textContent = 'You are dead! Better luck next time.';
  } else {
    message.textContent = `Congratulations! Your final health is ${health}. You earned the title "Survivor".`;
  }
  picksCounter.style.display = 'none'; // Hide the picks counter after the game ends
}

// Initialize game
nextButton.addEventListener('click', nextPick);
initializeCards();
