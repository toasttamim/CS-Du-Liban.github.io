 // results of the spinning game
 const segments = [
    "kenet shere stocks bi 2iment 10 000LL w wesil 2imta lal 1 000 000$ Mabrouk rbe7et ma3na safra 3a italya bas ba3dak bala shhede",
    "taraket el e5tisas w kamalet bmasla7et el 3ayle",
    "seret IT bi madrestak el adime",
    "fta7 ma7al shawarma w shu bedak fiya",
    "fetet bi semicolon academy w kamalet fiya",
    "nsit tfut bmajel el she8el adma karaset 7alak bdarsak",
    "dalet 3amb t3id el sene bel 3oloum adma 7emil mawed",
    "5tara3et coding language jdid, mabrouk 3a bara2et el e5tira bas heyde wen btesrefa?"
  ];

  const wheel = document.getElementById("wheel");
  const resultDiv = document.getElementById("result");
  const spinButton = document.getElementById("spin-btn");

  // Track current rotation
  let currentRotation = 0;
// JS fucntion to make the wheel spin in a random way
  spinButton.addEventListener("click", () => {
    // Generate a random rotation between 2-5 full spins plus an offset
    // total degrees = 360 * (full spins) + random offset 0-359
    const randomSpins = Math.floor(Math.random() * 3) + 2; 
    // offset to land on a specific slice
    const offset = Math.floor(Math.random() * 360);  
    // new rotation
    const newRotation = currentRotation + (randomSpins * 360) + offset;

    // Apply rotation
    wheel.style.transform = `rotate(${newRotation}deg)`;

    // Save the new rotation as current
    currentRotation = newRotation;

    // Disable button to prevent multiple clicks while spinning
    spinButton.disabled = true;
    resultDiv.textContent = "Spinning...";

    // Use the same duration as CSS transition (4s), plus a small buffer
    setTimeout(() => {
      // Determine which segment it lands on
      // Each segment covers 45 degrees. We find the correct segment by mod 360
      const normalizedRotation = newRotation % 360; 
      // 360 degrees / 8 segments = 45 deg per segment
      const segmentAngle = 45; 
      // Calculate the index: for example, 0-44 deg => segment 0, 45-89 deg => segment 1, etc.
      const segmentIndex = Math.floor(normalizedRotation / segmentAngle);
      // In conic-gradient, 0deg is top/center, but visually pointer is at top, so segmentIndex might need flipping
      // Let's invert the index so we read from 'segments' in correct order
      // Because 0deg in the gradient is at the top (and we go clockwise).
      // If we start from top slice = segments[0], that actually aligns with 0deg to 45deg
      // So we can use the index directly. But we might want to invert if it doesn't match your actual layout.
      
      const landedSegment = segments[segments.length - 1 - segmentIndex] || segments[0];

      // Display result
      resultDiv.textContent = `Result: ${landedSegment}`;

      // Re-enable the button
      spinButton.disabled = false;
    }, 4200); // 4s + a little buffer (4.2s)
  });
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
