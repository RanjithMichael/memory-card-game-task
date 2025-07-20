const cards = [
{
        "image": "./assets/apple.png",
        "name": "apple"
    },
    {
        "image": "./assets/cherries.png",
        "name": "cherries"
    },
    {
        "image": "./assets/grapes.png",
        "name": "grapes"
    },
    {
        "image": "./assets/lemon.png",
        "name": "lemon"
    },
    {
        "image": "./assets/orange.png",
        "name": "orange"
    },
    {
        "image": "./assets/pineapple.png",
        "name": "pineapple"
    },
    {
        "image": "./assets/strawberry.png",
        "name": "strawberry"
    },
    {
        "image": "./assets/pomegranate.png",
        "name": "pomegranate"
    },
    {
        "image": "./assets/watermelon.png",
        "name": "watermelon"
    }
];

const gameBoard = document.getElementById('game-board');
const restartBtn = document.getElementById('restart');

let flippedCards = [];
let lockBoard = false;


function startGame() {
  gameBoard.innerHTML = "";
  const shuffled = shuffle([...cards]);

  shuffled.forEach(symbol => {
    const card = createCard(symbol);
    gameBoard.appendChild(card);
  });
}


function shuffle(array) {
  let current = array.length, temp, random;
  while (current !== 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}

function createCard(symbol) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front"></div>
      <div class="card-back">${symbol}</div>
    </div>
  `;

  card.addEventListener('click', () => flipCard(card, symbol));
  return card;
}

function flipCard(card, symbol) {
  if (lockBoard || card.classList.contains('matched') || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  flippedCards.push({ card, symbol });

  if (flippedCards.length === 2) {
    lockBoard = true;
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [first, second] = flippedCards;

  if (first.symbol === second.symbol) {
    first.card.classList.add('matched');
    second.card.classList.add('matched');
  } else {
    first.card.classList.remove('flipped');
    second.card.classList.remove('flipped');
  }

  flippedCards = [];
  lockBoard = false;
}

restartBtn.addEventListener('click', startGame);


startGame();
