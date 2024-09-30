const Ship = require('./ship');

test('Ship has correct length and no hits initially', () => {
  const ship = new Ship(3);
  expect(ship.length).toBe(3);
  expect(ship.hits).toBe(0);
});

test('Ship should register hits', () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.hits).toBe(1);
  ship.hit();
  expect(ship.hits).toBe(2);
});

test('Ship is sunk after receiving hits equal to its length', () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test('Ship is not sunk if hits are less than length', () => {
  const ship = new Ship(4);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});
