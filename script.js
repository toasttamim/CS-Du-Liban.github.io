const cardDeck = document.getElementById('card-deck');
const message = document.getElementById('message');
const healthBarFill = document.getElementById('health-bar-fill');
const nextButton = document.getElementById('next-button');

let health = 100; 
let maxPicks = 5;
let picks = 0;
let cardValues = [];
let currentCardIndex = -1;

// Heal and damage phrases
const healPhrases = [
  "r2aset ma3 Heyfa Wehbe!",
  "nazalet windows 44 before gta 6 (windows 11 x4)!",
  "shtaret laptop refurbished bas teli3 jdid",
  "sra2et wifi men el jiran w hene mrakbin fiber optic.",
  "t5arajet 3oloum"
];

const damagePhrases = [
  "yi kasaret idak z3elet ktir :(",
  "5eyak el z8ir dalatlak account minecraft",
  "tala3lak alzheimer",
  "rakadit bseyntak w tfarkashit bel charger tayaretlak el laptop w tsha2af",
  "dalatet database bel internship BEL 8ALAT w ba3don 3amb yfatsho 3a min 3amala"
];

// Display remaining picks
const picksCounter = document.createElement('div');
picksCounter.id = 'picks-counter';
picksCounter.style.marginTop = '10px';
message.insertAdjacentElement('afterend', picksCounter);

function updatePicksCounter() {
  picksCounter.textContent = `Picks Left: ${maxPicks - picks}`;
}

// Generate random cards with effects
//chatgpt generated
function initializeCards() {
  cardValues = Array(3)
  //create 3 cards
    .fill(null)
    for(i=0;i<5;i++) {
      const effect = Math.random() < 0.6 ? 'damage' : 'heal'; // Higher chance for damage
      const isCritical = effect === 'damage' && Math.random() < 0.2; // 20% chance for critical damage
      const value = isCritical
        ? Math.floor(Math.random() * 30) + 20 // Critical damage: 20-50
        : effect === 'damage'
        ? Math.floor(Math.random() * 20) + 15 // Regular damage: 15-35
        : Math.floor(Math.random() * 15) + 5; // Heal: 5-20
      return { effect, value };
    };

  renderCards();
  updatePicksCounter();
}

// Render hidden cards
//chatgpt generated
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

  // Prevent re-clicking a revealed card
  if (card.classList.contains('revealed')) {
    return;
  }

  currentCardIndex = card.dataset.index;
  const { effect, value } = cardValues[currentCardIndex];

  // Show card content
  card.classList.add('revealed');
  card.innerHTML = `<img src="${effect === 'damage' ? 'lava.gif' : 'heal.gif'}" alt="${effect}">`;

  // Update health
  if (effect === 'damage') {
    health = health - value;
    const randomPhrase = damagePhrases[Math.floor(Math.random() * damagePhrases.length)];
    message.innerHTML += `<p>${randomPhrase} You lost ${value} health.</p>`;
  } else {
    health = health + value;
    health = Math.min(100, health); // Cap health at 100
    const randomPhrase = healPhrases[Math.floor(Math.random() * healPhrases.length)];
    message.innerHTML += `<p>${randomPhrase} You gained ${value} health.</p>`;
  }

  updateHealthBar();

  // Disable interaction with all other cards
  document.querySelectorAll('.card').forEach(c => c.removeEventListener('click', revealCard));
  nextButton.disabled = false;
}

// Update health bar display
function updateHealthBar() {
  healthBarFill.style.width = `${health}%`;
  healthBarFill.style.background = `rgb(${255 - (health * 2.55)}, ${health * 2.55}, 0)`; // Dynamic color from green to red
}

// Reset for the next pick
function nextPick() {
  // Add random health decay between picks
  const healthDecay = Math.floor(Math.random() * 5) + 5; // Decay: 5-10
  health = health - healthDecay;
  message.innerHTML += `<p>You feel weaker... You lost ${healthDecay} health.</p>`;

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
    message.textContent = '2alabet business major too bad :(';
  } else {
    message.textContent = `Congratulations! Your final health is ${health}. You earned the title "employed".`;
  }
  picksCounter.style.display = 'none'; // Hide the picks counter after the game ends
}

// Initialize game
nextButton.addEventListener('click', nextPick);
initializeCards();
