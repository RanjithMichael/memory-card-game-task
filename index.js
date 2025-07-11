const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let matchedPairs = 0;

document.querySelector(".score").textContent = score;

// Fetch cards.json data
fetch("./data/cards.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load card data.");
    return res.json();
  })
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  })
  .catch((error) => {
    console.error("Error loading cards:", error);
  });

function shuffleCards() {
  let currentIndex = cards.length, randomIndex, temporaryValue;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  gridContainer.innerHTML = ""; // clear existing cards
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src="${card.image}" onerror="this.src='fallback.jpg'" />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  score++;
  document.querySelector(".score").textContent = score;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matchedPairs++;

  if (matchedPairs === cards.length / 2) {
    setTimeout(() => alert("🎉 You won the game!"), 300);
  }

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

// Restart Game
function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  matchedPairs = 0;
  document.querySelector(".score").textContent = score;
  generateCards();
}

// Attach restart button
document.querySelector(".restart-button").addEventListener("click", restart);
