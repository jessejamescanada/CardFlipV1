const cards = document.querySelectorAll(".memory-card");
const modal = document.querySelector(".modal");
const playBTN = document.querySelector(".btn");
const movesModal = document.querySelector(".moves");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchCount = 0;
let moves = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.toggle("flip");
  moves++;

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    secondCard = this;

    checkForMatch();
  }
}

function checkForMatch() {
  // do cards match
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
  matchCount++;
  if (matchCount >= 6) {
    moves = moves / 2;
    movesModal.innerHTML = `It took you <strong>${moves}</strong> moves!`;
    openModal();
  }
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1200);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

function openModal() {
  modal.style.display = "block";
}

function resetGame() {
  modal.style.display = "none";
  cards.forEach(card => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });
  shuffle();
  matchCount = 0;
  moves = 0;
}

window.addEventListener("DOMContentLoaded", shuffle);
cards.forEach(card => card.addEventListener("click", flipCard));
playBTN.addEventListener("click", resetGame);
