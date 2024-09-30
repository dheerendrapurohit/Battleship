class Gameboard {
    constructor() {
      this.board = Array(10).fill(null).map(() => Array(10).fill(null));
      this.ships = [];
      this.missedShots = [];
    }
  
    placeShip(ship, coordinates) {
      const [x, y] = coordinates;
      if (this.board[x][y] === null) {
        this.board[x][y] = ship;
        this.ships.push(ship);
      }
    }
  
    receiveAttack(coordinates) {
      const [x, y] = coordinates;
      const target = this.board[x][y];
      if (target) {
        target.hit();
      } else {
        this.missedShots.push(coordinates);
      }
    }
  
    allShipsSunk() {
      return this.ships.every(ship => ship.isSunk());
    }
  }
  
  module.exports = Gameboard;
  