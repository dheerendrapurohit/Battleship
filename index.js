
import Player from './player';
import Gameboard from './gameboard';
import Ship from './ship';


const Game = (() => {
    let player, computer, playerBoardElement, computerBoardElement;
  
    // Initialize the game
    const init = () => {
      player = new Player();
      computer = new Player(true);
      player.gameboard = new Gameboard();
      computer.gameboard = new Gameboard();
  
      // Place player ships (can be expanded with drag/drop or manual placement later)
      player.gameboard.placeShip(new Ship(4), [0, 0]);
      player.gameboard.placeShip(new Ship(3), [2, 2]);
      
      // Randomly place ships for the computer
      computer.gameboard.placeShip(new Ship(4), [5, 5]);
      computer.gameboard.placeShip(new Ship(3), [7, 7]);
  
      // Get board elements
      playerBoardElement = document.getElementById('player-board');
      computerBoardElement = document.getElementById('computer-board');
  
      // Render the boards
      renderBoard(player.gameboard, playerBoardElement, true);
      renderBoard(computer.gameboard, computerBoardElement, false);
  
      // Add event listeners for attacks
      addAttackListeners();
  
      // Reset game
      document.getElementById('reset-btn').addEventListener('click', resetGame);
    };
  
    // Render the board on the UI
    const renderBoard = (gameboard, boardElement, isPlayer = false) => {
      boardElement.innerHTML = ''; // Clear the board
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const cell = document.createElement('div');
          const ship = gameboard.board[i][j];
  
          if (ship && isPlayer) {
            cell.classList.add('ship'); // Show ships only for the player
          }
  
          boardElement.appendChild(cell);
        }
      }
    };
  
    // Add event listeners to the computer board for attacks
    const addAttackListeners = () => {
      const cells = computerBoardElement.querySelectorAll('div');
      cells.forEach((cell, index) => {
        const row = Math.floor(index / 10);
        const col = index % 10;
        cell.addEventListener('click', () => {
          playerTurn([row, col]);
        });
      });
    };
  
    // Handle player attack
    const playerTurn = (coordinates) => {
      player.makeMove(computer.gameboard, coordinates);
      renderBoard(computer.gameboard, computerBoardElement, false);
      checkGameOver();
  
      // Computer's turn to attack
      setTimeout(computerTurn, 500);
    };
  
    // Handle computer's attack
    const computerTurn = () => {
      const move = computer.getRandomMove();
      computer.makeMove(player.gameboard, move);
      renderBoard(player.gameboard, playerBoardElement, true);
      checkGameOver();
    };
  
    // Check if the game is over
    const checkGameOver = () => {
      if (player.gameboard.allShipsSunk()) {
        alert('Computer wins!');
        resetGame();
      } else if (computer.gameboard.allShipsSunk()) {
        alert('Player wins!');
        resetGame();
      }
    };
  
    // Reset the game
    const resetGame = () => {
      init();
    };
  
    return { init };
  })();
  
  // Start the game
  document.addEventListener('DOMContentLoaded', Game.init);
  