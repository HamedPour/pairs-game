import rawTiles from "./tileAssets.js";

function duplicateTileArray(aTileSet) {
  let newTileSet = [];
  aTileSet.forEach((tileObject) => {
    newTileSet.push(tileObject);
    newTileSet.push({
      name: tileObject.name + "2",
      emoji: tileObject.emoji,
    });
  });
  return newTileSet;
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function DurstenfeldShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledTiles = DurstenfeldShuffle(duplicateTileArray(rawTiles));

export default shuffledTiles;
