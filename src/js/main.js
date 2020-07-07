import shuffledTiles from "./shuffler.js";

let clickCount = 0;
let globalClicks = 0;
let currectChoices = 0;
const MAX_CLICKS_ALLOWED = 2;
const MAX_GLOBAL_CLICKS = 1;
let previousTileID = null;
let currentTileID = null;

function initBoard() {
  shuffledTiles.forEach((tileObj) => {
    const tileScreen = document.querySelector(".tileScreen");
    const tileContainer = document.createElement("div");
    const tile = document.createElement("div");
    tileContainer.classList.add("tileContainer");

    tile.classList.add("tile");
    tile.classList.add("tileHide");
    tile.setAttribute("id", tileObj.name);

    tile.innerText = tileObj.emoji;

    tileContainer.appendChild(tile);
    tileScreen.appendChild(tileContainer);
    tileContainer.addEventListener("click", handleBoardClicks);
  });
}

function handleBoardClicks(event) {
  const emoji = event.target.innerText;
  const tileID = event.target.id;
  if (globalClicks > MAX_GLOBAL_CLICKS) {
    // stop over clicking STUPID
    return;
  }
  clickCount++;
  globalClicks++;
  currentTileID = tileID;

  if (clickCount === MAX_CLICKS_ALLOWED) {
    // reset the board
    resetBoard();
    clickCount = 0;
    currentTileID = null;
    // resultScreen.innerText = "\u{1F6D1}";
  }

  currentTileID = tileID;
  if (
    currentTileID === previousTileID + 2 ||
    currentTileID + 2 === previousTileID
  ) {
    // MATCHED
    const resultScreen = document.querySelector(".results");
    resultScreen.innerText = emoji;
    console.log("MATCHED");
    previousTileID = null;
    currentTileID = null;
    tilesMatched(emoji);
  }
  event.target.classList.add("tileVisible");
  previousTileID = currentTileID;
}

// reset all the tiles
function resetBoard() {
  setTimeout(() => {
    const allTiles = document.querySelectorAll(".tile");
    allTiles.forEach((tile) => {
      tile.classList.remove("tileVisible");
    });
    previousTileID = null;
    globalClicks = 0;
  }, 1000);
}

function tilesMatched(tileEmoji) {
  currectChoices++;
  const allTiles = document.querySelectorAll(".tile");
  if (currectChoices === allTiles.length / 2) {
    console.log("YOU WIN!");
    win();
  }
  allTiles.forEach((tile) => {
    if (tile.innerText === tileEmoji) {
      tile.classList.remove("tileHide");
      tile.classList.add("matched");
      tile.parentElement.removeEventListener("click", handleBoardClicks);
    }
  });
}

function win() {
  const winnerMessage = document.createElement("div");
  winnerMessage.classList.add("winner");
  winnerMessage.innerText = "Winner Winner Vegan Dinner!";
  const theBody = document.querySelector("body");
  theBody.appendChild(winnerMessage);
  winnerMessage.addEventListener("click", () => {
    theBody.removeChild(winnerMessage);
    restartGame();
    console.log("RESTARTING!!!");
  });
}

function restartGame() {
  window.location.reload(false);
}

initBoard();
