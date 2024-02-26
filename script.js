const gameContainer = document.getElementById("game");
const mainSection = document.querySelector('.main')
let numAttempts = 0;

// retrieves saved scores array from local starage
const savedScores = JSON.parse(localStorage.getItem('score')) || []


// Finds the lowest score from the array of saved scores
let bestScore = savedScores[0]
for (let score of savedScores) {
  if (score < bestScore) {
    bestScore = score
  }
}

// Initially sets attempts to zero and best score to empty. 
let bestScoreElem = document.querySelector('.bestScore')
bestScoreElem.innerText = "Best Score:"
// this fuction is called every time start is clicked to display the previous best score
function updateBestScore(bestScore){
  bestScoreElem.innerText = `Best Score: ${bestScore}`
}
let attemptsElem = document.querySelector('.attempt');
attemptsElem.innerText = "Attempts:"
// this function is called every time numAttempts increases so that it updates it on the screen
function updateNumberAttempts (numAttempts) {
  attemptsElem.innerText = `Attempts: ${numAttempts}`;
} 

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "teal",
  "teal"
];

// calls shuffle function to shuffle colors, which returns an array of shuffled colors
let shuffledColors = shuffle(COLORS);

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}



let startButton = document.querySelector('.button.start')
// Adds start button and when it is clicked a restart button is created as well
startButton.addEventListener('click', function (e) {
  startButton.remove();
  createDivsForColors(shuffledColors);
  let endingSection = document.createElement('section')
  endingSection.classList.add('ending')
  let restartContainer = document.createElement('div')
  restartContainer.classList.add('button', 'restart')
  restartContainer.addEventListener('click', restart)
  let restartH2 = document.createElement('h2')
  restartH2.innerText = "Restart"
  restartContainer.append(restartH2)
  endingSection.append(restartContainer)
  mainSection.append(endingSection)

  // attempts is initialized to zero in the beginning
  attemptsElem.innerText = "Attempts: 0";

  // checks through the saved scores and finds the minimum
  if (savedScores.length > 0) {
    let min = savedScores[0]
      for (let score of savedScores) {
        if (score < min) {
          min = score;
        }
      }
      // function call to update the best score on the screen
      updateBestScore(min)
  }
  
})


// when restart button is clicked, this fuction is called which resets the background color on every card
function restart() {
  let allCards = document.querySelectorAll('.cards');
  for (let card of allCards) {
    card.style.backgroundColor = "";
  }
  numAttempts = 0;
  updateNumberAttempts(numAttempts)
}



// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    newDiv.classList.add('cards')
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// this function is called any time a new card is able to be clicked changes its color
function changeCards(event) {
  // change background color of clicked card
  let selectedCard = event.target
  let cardColor = selectedCard.classList[1]
  selectedCard.style.backgroundColor = cardColor;
  // assign the clicked card to the target card and remeber the last clicked card
  if (target != event.target) {
    previousTarget = target;
    target = event.target;
    counter++;
  }
  if (counter == 2) {
    numAttempts++;
    updateNumberAttempts(numAttempts);
  }
  // if two cards are flipped and they are not the same, then flip them over after a second.
  if ((counter == 2) && (previousTarget.style.backgroundColor !== target.style.backgroundColor)) {
    setTimeout (function () {
      previousTarget.style.backgroundColor = "";
      target.style.backgroundColor = "";
    }, 1000);
  }
  // if two cards are flipped and they are the same, then reset memory of the flipped cards and set counter to zerp so that new cards can still be clicked immediately after
  else if (counter == 2) {
    counter = 0
    previousTarget = null;
    target = null;
    cardsFlipped += 2;
  }
}



let counter = 0;
let cardsFlipped = 0;
let target = null;
let previousTarget = null;
// TODO: Implement this function!
function handleCardClick(event) {
    // As long as less than two cards have been clicked on, allow to click on a non flipped card
    if (event.target.style.backgroundColor === "" && counter < 2) {
      changeCards(event);
    }
    // when counter bedcomes 2, it means that two different cards were clicked, so another card cannot be clicked until they are both flipped over
    else if ((counter === 2) && (previousTarget.style.backgroundColor === "") && (target.style.backgroundColor === "")) {
      counter = 0;
      previousTarget = null;
      target = null;
      changeCards(event);
    }
    // If all the cards are flipped, then alert the user that they won.
    if (cardsFlipped == COLORS.length) {
      cardsFlipped = 0;
      setTimeout(function() {
        alert("You Win");
      }, 500)

      // Every time a win occurs, add the score to a local storage array of saved scores
      savedScores.push(numAttempts)
      localStorage.setItem('score', JSON.stringify(savedScores))
    } 

}






