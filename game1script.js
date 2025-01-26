function revealCard(event) {
  const card = event.target;
  currentCardIndex = card.dataset.index;
  const { effect, value } = cardValues[currentCardIndex];

  // Dynamically set the image source based on the effect
  const imagePath = effect === 'damage' ? 'damage.png' : 'heal.png';

  // Show card content with the appropriate image
  card.classList.add('revealed');
  card.innerHTML = `<img src="${imagePath}" alt="${effect} Effect">`;

  // Update health based on the card's effect
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
