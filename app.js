// display elements
const tileDisplay = document.querySelector(".tile-container");
const keyboardDisplay = document.querySelector(".key-container");
const messageDisplay = document.querySelector(".message-container");

// for testing
const wordle = "SUPER";

// variables
let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

const rows = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Enter",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "≪",
];

// iterate and create each element
rows.forEach((row, rowIndex) => {
  const rowElement = document.createElement("div");
  rowElement.setAttribute("id", "row" + rowIndex);

  row.forEach((guess, guessIndex) => {
    const tileElement = document.createElement("div");
    tileElement.setAttribute("id", "row" + rowIndex + "tile" + guessIndex);
    tileElement.classList.add("tile");
    rowElement.append(tileElement);
  });
  tileDisplay.append(rowElement);
});

keys.forEach((key) => {
  const keyElement = document.createElement("button");
  keyElement.textContent = key;
  keyElement.setAttribute("id", key);
  keyElement.addEventListener("click", () => handleClick(key));
  keyboardDisplay.append(keyElement);
});

//functions
const handleClick = (key) => {
  if (key === "≪") {
    deleteLetter();
    return;
  }
  if (key === "Enter") {
    checkRow();
    return;
  }
  addLetter(key);
};

const addLetter = (letter) => {
  if (currentTile < 5 && currentRow < 6) {
    const tile = document.getElementById(
      "row" + currentRow + "tile" + currentTile
    );
    tile.textContent = letter;
    rows[currentRow][currentTile] = letter;
    tile.setAttribute("data", letter);
    currentTile++;
    console.log("rows", rows);
  }
};

const deleteLetter = () => {
  if (currentTile > 0) {
    currentTile--;
    const tile = document.getElementById(
      "row" + currentRow + "tile" + currentTile
    );
    tile.textContent = "";
    rows[currentRow][currentTile] = "";
    tile.setAttribute("data", "");
  }
};

const checkRow = () => {
  const guess = rows[currentRow].join("");

  if (currentTile > 4) {
    console.log("guessed:", guess);
    flipTile();
    if (wordle == guess) {
      showMessage("CORRECT");
      isGameOver = true;
      return;
    } else {
      if (currentRow >= 5) {
        isGameOver = false;
        showMessage("Game Over");
        return;
      }
      if (currentRow < 5) {
        currentRow++;
        currentTile = 0;
      }
    }
  }
};

const showMessage = (message) => {
  const messageElement = document.createElement("p");
  console.log(message);
  messageElement.textContent = message;
  messageDisplay.append(messageElement);
  setTimeout(() => messageDisplay.removeChild(messageElement), 2000);
};

const addColorToKey = (keyLetter, color) => {
  const key = document.getElementById(keyLetter);
  key.classList.add(color);
};

const flipTile = () => {
  const rowTiles = document.querySelector("#row" + currentRow).childNodes;
  rowTiles.forEach((tile, index) => {
    const dataLetter = tile.getAttribute("data");

    setTimeout(() => {
      // add flip css effects
      tile.classList.add("flip");

      if (dataLetter == wordle[index]) {
        tile.classList.add("green");
        addColorToKey(dataLetter, "green");
      } else if (wordle.includes(dataLetter)) {
        tile.classList.add("yellow");
        addColorToKey(dataLetter, "yellow");
      } else {
        tile.classList.add("grey");
        addColorToKey(dataLetter, "grey");
      }
    }, 500 * index);
  });
};
