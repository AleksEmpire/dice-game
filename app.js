let scores;
let roundScore;
let activePlayer;
let gamePlaying;
let btnRoll = document.querySelector(".btn-roll");
let btnHold = document.querySelector(".btn-hold");
let player1Score = document.getElementById("score-0");
let player2Score = document.getElementById("score-1");
let playerName = document.querySelector("#name-" + activePlayer);
let player1Name = document.querySelector("#name-0");
let player2Name = document.querySelector("#name-1");
let dice = document.querySelector(".dice");
let playerPanel = document.querySelector(".player-" + activePlayer + "-panel");
let currentScorePlayer1 = document.getElementById("current-0");
let currentScorePlayer2 = document.getElementById("current-1");
let player1Panel = document.querySelector(".player-0-panel");
let player2Panel = document.querySelector(".player-1-panel");
let btnNew = document.querySelector(".btn-new");
init = () => {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";
  player1Score.textContent = "0";
  player2Score.textContent = "0";
  currentScorePlayer1.textContent = "0";
  currentScorePlayer2.textContent = "0";
  player1Name.textContent = "Player 1";
  player2Name.textContent = "Player 2";
  player1Panel.classList.remove("winner");
  player2Panel.classList.remove("winner");
  player1Panel.classList.remove("active");
  player2Panel.classList.remove("active");
  player1Panel.classList.add("active");
};
init();

btnRoll.addEventListener("click", () => {
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;

    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = `images/dice-${dice}.png`;

    if (dice !== 1) {
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= 10) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

//NEXT PLAYER

nextPlayer = () => {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  currentScorePlayer1.textContent = "0";
  currentScorePlayer2.textContent = "0";
  player1Panel.classList.toggle("active");
  player2Panel.classList.toggle("active");
  dice.style.display = "none";
};

btnNew.addEventListener("click", init);
