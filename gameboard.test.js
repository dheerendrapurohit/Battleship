const Gameboard = require('./gameboard');
const Ship = require('./ship');

test('Gameboard can place a ship at specific coordinates', () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  board.placeShip(ship, [0, 0]);
  expect(board.board[0][0]).toBe(ship);
});

test('Gameboard registers attacks and hits a ship', () => {
  const board = new Gameboard();
  const ship = new Ship(2);
  board.placeShip(ship, [0, 0]);
  board.receiveAttack([0, 0]);
  expect(ship.hits).toBe(1);
});

test('Gameboard registers missed attacks', () => {
  const board = new Gameboard();
  board.receiveAttack([1, 1]);
  expect(board.missedShots).toContainEqual([1, 1]);
});

test('Gameboard reports when all ships are sunk', () => {
  const board = new Gameboard();
  const ship1 = new Ship(1);
  const ship2 = new Ship(1);
  board.placeShip(ship1, [0, 0]);
  board.placeShip(ship2, [1, 1]);

  board.receiveAttack([0, 0]);
  board.receiveAttack([1, 1]);

  expect(board.allShipsSunk()).toBe(true);
});
