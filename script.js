'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--1');
const current1El = document.getElementById('current--2');
const holdButton = document.querySelector('.btn--hold');
const turnPlayer1 = document.querySelector('.player--0');
const turnPlayer2 = document.querySelector('.player--1');
const resetButton = document.querySelector('.btn--new');

const diceEl = document.querySelector('.dice');
const diceRoll = document.querySelector('.btn--roll');
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
var audio = new Audio('winner.mp3');

let currentScore = 0;
let playerScore1 = 0;
let playerScore2 = 0;
let playerTurn = 1;
let playing = true;

const Reset = function () {
  score0El.textContent = currentScore;
  current0El.textContent = 0;
  score1El.textContent = currentScore;
  current1El.textContent = 0;
  if (score0El.classList.contains('player--winner')) {
    score0El.classList.remove('player--winner');
  } else {
    score1El.classList.toggle('player--winner');
  }
};

const newGame = function () {
  current0El.textContent = 0;
  score0El.textContent = 0;
  current1El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
};

const Winner = function () {
  if (score0El.textContent >= 30) {
    turnPlayer1.classList.toggle('player--winner');
    audio.play();

    playing = false;
  } else if (score1El.textContent >= 30) {
    turnPlayer2.classList.toggle('player--winner');
    audio.play();

    playing = false;
  }
};

const changeTurn = function () {
  if (playerTurn === 1) {
    console.log('player 1');
    playerTurn = 2;
    turnPlayer2.classList.add('player--active');
    turnPlayer1.classList.remove('player--active');
  } else {
    console.log('player 2');
    playerTurn = 1;

    turnPlayer2.classList.remove('player--active');
    turnPlayer1.classList.add('player--active');
  }
};

diceRoll.addEventListener('click', function () {
  if (playing) {
    const random = Math.floor(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${random}.png`;

    if (random !== 1) {
      currentScore += random;
      document.getElementById(`current--${playerTurn}`).textContent =
        currentScore;
    } else {
      if (playerTurn === 2) {
        document.getElementById(`current--1`).textContent = 0;
        document.getElementById(`current--2`).textContent = 0;
      }
      currentScore = 0;

      changeTurn();
    }
  }
});

holdButton.addEventListener('click', function () {
  if (playing) {
    if (playerTurn === 1) {
      score0El.textContent = Number(score0El.textContent) + currentScore;

      current0El.textContent = 0;
      currentScore = 0;
      Winner();
      changeTurn();
    } else {
      score1El.textContent = Number(score1El.textContent) + currentScore;
      current1El.textContent = 0;
      current0El.textContent = 0;
      currentScore = 0;
      Winner();
      changeTurn();
    }
  }
});
resetButton.addEventListener('click', function () {
  newGame();
  if (turnPlayer2.classList.contains('player--winner')) {
    turnPlayer2.classList.toggle('player--winner');
    turnPlayer2.classList.remove('player--active');
    turnPlayer1.classList.add('player--active');
  } else {
    turnPlayer1.classList.toggle('player--winner');
  }
  playerTurn = 1;
  playing = true;
});
