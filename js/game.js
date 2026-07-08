import { createBoard, restartGame } from "./board.js";

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    const cardCountSelect = document.getElementById("card-count");
    const gameBoard = document.getElementById("game-board");
    const startMenu = document.getElementById("start-menu");
    const restartButton = document.getElementById("restart-button");

    startButton.addEventListener("click", () => {
        const cardCount = parseInt(cardCountSelect.value);
        console.log("cardCount:", cardCount);
        startMenu.style.display = "none";
        gameBoard.innerHTML = "";
        createBoard(cardCount);
    });

    restartButton.addEventListener("click", () => {
        restartGame();
        startMenu.style.display = "";
    });
});