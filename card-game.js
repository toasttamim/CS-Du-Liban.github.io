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
function initializeCards() {
  cardValues = Array(3)
    .fill(null)
    .map(() => {
      const effect = Math.random() < 0.6 ? 'damage' : 'heal'; // Higher chance for damage
      const isCritical = effect === 'damage' && Math.random() < 0.2; // 20% chance for critical damage
      const value = isCritical
        ? Math.floor(Math.random() * 30) + 20 // Critical damage: 20-50
        : effect === 'damage'
        ? Math.floor(Math.random() * 20) + 15 // Regular damage: 15-35
        : Math.floor(Math.random() * 15) + 5; // Heal: 5-20
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
    health -= value;
    health = Math.max(0, health); // Ensure health doesn't go below 0
    const randomPhrase = damagePhrases[Math.floor(Math.random() * damagePhrases.length)];
    message.innerHTML += `<p>${randomPhrase} You lost ${value} health.</p>`;
  } else {
    health += value;
    health = Math.min(100, health); // Cap health at 100
    const randomPhrase = healPhrases[Math.floor(Math.random() * healPhrases.length)];
    message.innerHTML += `<p>${randomPhrase} You gained ${value} health.</p>`;
  }

  updateHealthBar();

  // Disable interaction with all other cards
  document.querySelectorAll('.card').forEach(c => c.removeEventListener('click', revealCard));
  nextButton.disabled = false;
}

// Update health bar display dynamically
function updateHealthBar() {
  healthBarFill.style.width = `${health}%`;
  healthBarFill.style.background = `linear-gradient(to right, rgb(${255 - health * 2.55}, ${health * 2.55}, 0), red)`; // Gradient from green to red
}

// Prepare the next round
function nextPick() {
  picks++;
  if (picks === maxPicks || health === 0) {
    endGame(); // End the game only if health is 0 or picks are finished
  } else {
    message.textContent = 'Pick another card!';
    nextButton.disabled = true; // Disable the Next button until the next card is picked
    initializeCards(); // Reset cards for the next round
  }
}

// End the game
function endGame() {
  cardDeck.innerHTML = '';
  nextButton.style.display = 'none'; // Hide the Next button

  // Display endgame message
  if (health === 0) {
    message.textContent = 'yi 2labet to a business major meshkeltak seret unemployed!';
  } else {
    message.textContent = `Congratulations! Your final health is ${health}. seret bteshteghil blebnen bel sokhra 🥳.`;
  }

  picksCounter.style.display = 'none'; // Hide the picks counter
}

// Initialize the game
nextButton.addEventListener('click', nextPick);
initializeCards();
// Function to navigate between pages
function goToPage(page) {
  window.location.href = page;
}

// Function to go back
function goBack() {
  window.history.back();
}

// Open settings modal
function openSettings() {
  document.getElementById("settings-modal").style.display = "block";
}

// Close settings modal
function closeSettings() {
  document.getElementById("settings-modal").style.display = "none";
}
