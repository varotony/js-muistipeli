import { createCardElement, flipCard } from "./card.js";

const allCards = [
    "🍎",
    "🍐",
    "🍒",
    "🍉",
    "🍇",
    "🍓",
    "🍌",
    "🍍",
    "🥝",
    "🥥",
    "🍑",
    "🍈",
    "🍋",
    "🍊",
    "🍏",
    "🍅",
];
const gameBoard = document.getElementById("game-board");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let playerTries = 0;
let pairsFound = 0;
let totalPairs = 0;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

export function createBoard(cardCount) {
    totalPairs = cardCount / 2;
    const selectedCards = allCards.slice(0, cardCount / 2);
    const cards = [...selectedCards, ...selectedCards];
    shuffle(cards);
    cards.forEach((card) => {
        const cardElement = createCardElement(card);
        const handler = () => {
            if (lockBoard) return;
            if (secondCard) return;
            flipCard(cardElement, handleCardFlip);
        };
        cardElement._clickHandler = handler;
        gameBoard.appendChild(cardElement);
        cardElement.addEventListener("click", handler);
    });
}

function handleCardFlip(cardElement) {
    if (lockBoard) return;
    if (cardElement === firstCard) return;
    if (secondCard) return;

    playerTries++;

    cardElement.classList.add("flipped");
    cardElement.textContent = cardElement.dataset.card;

    if (!firstCard) {
        firstCard = cardElement;
        return;
    }

    secondCard = cardElement;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    if (isMatch) {
        pairsFound++;
        disableCards();
        if (pairsFound === totalPairs) {
            setTimeout(() => {
                alert(`Voitit! Yrityksiä: ${playerTries}`);
                resetBoard();
            }, 500);
        } else {
            resetBoard();
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    lockBoard = true;
    firstCard.removeEventListener("click", firstCard._clickHandler);
    secondCard.removeEventListener("click", secondCard._clickHandler);
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard.textContent = "";
        secondCard.textContent = "";
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

export function restartGame() {
    resetBoard();
    totalPairs = 0;
    gameBoard.innerHTML = "";
}