import shuffledTiles from "./shuffler.js";

let clickCount = 0;
let globalClicks = 0;
let currectChoices = 0;
let playerClicks = 0;
const MAX_CLICKS_ALLOWED = 2;
const MAX_GLOBAL_CLICKS = 1;
let previousTileID = null;
let currentTileID = null;

function initBoard() {
  shuffledTiles.forEach((tileObj) => {
    const tileScreen = document.querySelector(".tileScreen");
    const tileContainer = document.createElement("div");
    const resultScreen = document.querySelector(".results");
    const tile = document.createElement("div");

    // this is for the ? mark at the start of the game
    resultScreen.innerText = "\u{2754}";

    // all the css classes to style and hide the tiles and containers
    tileContainer.classList.add("tileContainer");
    tile.classList.add("tile");
    tile.classList.add("tileHide");

    // tile names passed as id attributes to each node.
    // this is needed for tile comparison later
    tile.setAttribute("id", tileObj.name);

    // tile emojis added to board
    tile.innerText = tileObj.emoji;

    tileContainer.appendChild(tile);
    tileScreen.appendChild(tileContainer);

    // Event Listerner attached to each tileContainer
    tileContainer.addEventListener("click", handleBoardClicks);
  });
}

function handleBoardClicks(event) {
  /**
   * Func handles the main game logic
   */
  const emoji = event.target.innerText;
  const tileID = event.target.id;
  if (globalClicks > MAX_GLOBAL_CLICKS) {
    // This stops over clicking
    return;
  }
  clickCount++;
  globalClicks++;
  playerClicks++;
  updatePlayerClicks(playerClicks);

  currentTileID = tileID;

  if (clickCount === MAX_CLICKS_ALLOWED) {
    // reset the board
    resetBoard();
    clickCount = 0;
    currentTileID = null;
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

function updatePlayerClicks(totalClicksSoFar) {
  const clickCounter = document.querySelector(".playerClicks");
  clickCounter.innerText = "Total Clicks: " + totalClicksSoFar;
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
  const theBody = document.querySelector("body");
  winnerMessage.classList.add("winner");
  winnerMessage.innerText =
    "Winner Winner Chicken Dinner! " + "\n" + "\u{1F3C6}";
  theBody.appendChild(winnerMessage);
  winnerMessage.addEventListener("click", () => {
    theBody.removeChild(winnerMessage);
    restartGame();
  });
}

function restartGame() {
  window.location.reload(false);
}

initBoard();
