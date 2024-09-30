class Player {
    constructor(isComputer = false) {
      this.isComputer = isComputer;
      this.shots = [];
    }
  
    makeMove(opponentBoard, coordinates) {
      opponentBoard.receiveAttack(coordinates);
      this.shots.push(coordinates);
    }
  
    getRandomMove() {
      let x, y;
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      } while (this.shots.some(shot => shot[0] === x && shot[1] === y));
      return [x, y];
    }
  }
  
  module.exports = Player;
  