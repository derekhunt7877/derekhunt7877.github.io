// script.js

// Game setup
const gameBoard = document.getElementById("gameBoard");
const challengeText = document.getElementById("challengeText");
const rollDiceButton = document.getElementById("rollDice");
const diceResult = document.getElementById("diceResult");

// Generate board cells
const cells = [];
for (let i = 0; i < 25; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  // Add challenge cells and a goal cell
  if (i === 24) {
    cell.classList.add("goal");
    cell.textContent = "Goal";
  } else if (i % 5 === 0) {
    cell.classList.add("challenge");
    cell.textContent = "!";
  }

  cells.push(cell);
  gameBoard.appendChild(cell);
}

// Add player to the starting cell
let playerPosition = 0;
const player = document.createElement("div");
player.classList.add("player");
cells[playerPosition].appendChild(player);

// Challenges array
const challenges = [
  "Reflect on your greatest strength.",
  "Name one thing you're grateful for.",
  "Describe a belief that has shaped your life.",
  "How would you define happiness?",
  "What is one goal you want to achieve?"
];

// Roll dice and move player
rollDiceButton.addEventListener("click", () => {
  const diceRoll = Math.floor(Math.random() * 6) + 1; // Roll dice (1-6)
  diceResult.textContent = `Roll: ${diceRoll}`;

  // Calculate new position
  let newPosition = playerPosition + diceRoll;

  // Ensure player does not exceed the board
  if (newPosition >= cells.length) {
    newPosition = cells.length - 1;
    diceResult.textContent += " (You reached the goal!)";
  }

  // Move player
  cells[playerPosition].removeChild(player);
  cells[newPosition].appendChild(player);
  playerPosition = newPosition;

  // Trigger challenge if on a challenge cell
  if (cells[playerPosition].classList.contains("challenge")) {
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    challengeText.textContent = `Challenge: ${randomChallenge}`;
  } else {
    challengeText.textContent = "";
  }
});
