// import { Ship } from "./ship";
import { Ship } from "./ship.js";
test("Ship sinks after enough hits", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});


test("Ship registers hits correctly", () => {
  const ship = new Ship(3, 0);
  ship.hit();
  expect(ship.numberHit).toBe(1);
});

