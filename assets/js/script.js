'use strict';

const diceImage = document.querySelector('.dice');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const nameOne = document.querySelector('#name--0');
const nameTwo = document.querySelector('#name--1');
nameOne.textContent = prompt('Enter player 1 name:');
nameTwo.textContent = prompt('Enter player 2 name:');
if (!nameOne.textContent) {
  nameOne.textContent = 'Player 1';
}
if (!nameTwo.textContent) {
  nameTwo.textContent = 'player 2';
}
let randomDice = () => Math.trunc(Math.random() * 6) + 1;
const players = {
  0: [0, 0],
  1: [0, 0],
};
diceImage.style.display = 'none';
function checkStatus() {
  if (
    playerOne.classList.contains('player--winner') ||
    playerTwo.classList.contains('player--winner')
  ) {
    return true;
  }
  return false;
}
function rollDice() {
  if (checkStatus()) {
    return;
  }
  diceImage.style.display = 'block';
  let player = playerOne.classList.contains('player--active') ? '0' : '1';
  let randomNumber = randomDice();
  let curr = players[player][0];
  diceImage.src = `./assets/images/dice-${randomNumber}.png`;
  if (randomNumber !== 1) {
    curr += randomNumber;
    players[player][0] = curr;
    document.querySelector(`#current--${player}`).textContent =
      players[player][0];
  } else {
    curr = 0;
    players[player][0] = curr;
    switchPlayers(player);
    document.querySelector(`#current--${player}`).textContent =
      players[player][0];
  }
}
function holdScore() {
  if (checkStatus()) {
    return;
  }
  let player = playerOne.classList.contains('player--active') ? '0' : '1';
  players[player][1] += players[player][0];
  players[player][0] = 0;
  if (players[player][1] >= 100) {
    if (player == '0') {
      playerOne.classList.add('player--winner');
    } else {
      playerTwo.classList.add('player--winner');
    }
    diceImage.style.display = 'none';
    document.querySelector(`#score--${player}`).textContent =
      players[player][1];
    document.querySelector(`#current--${player}`).textContent = 0;
    return;
  }
  switchPlayers(player);

  document.querySelector(`#score--${player}`).textContent = players[player][1];
  document.querySelector(`#current--${player}`).textContent =
    players[player][0];
}
function switchPlayers(player) {
  document
    .querySelector(`.player--${player}`)
    .classList.remove('player--active');
  document
    .querySelector(`.player--${player === '0' ? '1' : '0'}`)
    .classList.add('player--active');
}
function resetGame() {
  diceImage.style.display = 'none';
  players['0'][0] = players['0'][1] = 0;
  players['1'][0] = players['1'][1] = 0;
  document.querySelector('#current--0').textContent = '0';
  document.querySelector('#current--1').textContent = '0';
  document.querySelector('#score--0').textContent = '0';
  document.querySelector('#score--1').textContent = '0';
  if (playerTwo.classList.contains('player--active')) {
    playerTwo.classList.remove('player--active');
    playerOne.classList.add('player--active');
  }
  if (playerOne.classList.contains('player--winner')) {
    playerOne.classList.remove('player--winner');
  }
  if (playerTwo.classList.contains('player--winner')) {
    playerTwo.classList.remove('player--winner');
  }
}
roll.addEventListener('click', rollDice);
hold.addEventListener('click', holdScore);
newGame.addEventListener('click', resetGame);
