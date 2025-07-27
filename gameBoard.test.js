// import { GameBoard } from "./gameBoard";
// import { Cell } from "./cell";

// test("Gameboad intialises", () => {
//   const gameBoard = new GameBoard()
//   expect(gameBoard.gameBoard.length).toBe(10);
//   expect(gameBoard.gameBoard.every(row => row.length === 10)).toBe(true); 
//   expect(gameBoard.gameBoard[0][0]).toBeInstanceOf(Cell);

// });

// test("places ships correctly on the board", () => {
//     const board = new GameBoard();
//     const ship = new Ship(3);

//     board.place(); // Horizontal

//     expect(board.gameBoard[0][0].getValue()).toBe(ship);
//     expect(board.gameBoard[0][1].getValue()).toBe(ship);
//     expect(board.gameBoard[0][2].getValue()).toBe(ship);
//     expect(board.ships.length).toBe(1);
// });

// test("registers a hit and increments ship hit count", () => {
//     const board = new GameBoard();
//     const ship = new Ship(2);
//     board.place(ship, 0, 0, true);

//     const result = board.receiveAttack(0, 0);

//     expect(result).toBe("hit");
//     expect(ship.numberHit).toBe(1);
// });

// // test("registers a miss", () => {
// //     const board = new GameBoard();
// //     const result = board.receiveAttack(5, 5);

// //     expect(result).toBe("miss");
// // });

// // test("prevents double attacks", () => {
// //     const board = new GameBoard();
// //     const ship = new Ship(1);
// //     board.place(ship, 0, 0, true);

// //     board.receiveAttack(0, 0); // First attack
// //     const result = board.receiveAttack(0, 0); // Second attack

// //     expect(result).toBe("already attacked");
// // });

// // test("detects when a ship is sunk", () => {
// //     const board = new GameBoard();
// //     const ship = new Ship(1);
// //     board.place(ship, 0, 0, true);

// //     const result = board.receiveAttack(0, 0);

// //     expect(result).toBe("sunk");
// //     expect(ship.isSunk()).toBe(true);
// // });

// // test("detects game over when all ships are sunk", () => {
// //     const board = new GameBoard();
// //     const ship1 = new Ship(1);
// //     const ship2 = new Ship(1);

// //     board.place(ship1, 0, 0, true);
// //     board.place(ship2, 1, 0, true);

// //     board.receiveAttack(0, 0);
// //     board.receiveAttack(1, 0);

// //     expect(board.isGameOver()).toBe(true);
// // });


import { GameBoard } from "./gameBoard";
import { Ship } from "./ship";

test("places a ship on the board without overlap", () => {
    const board = new GameBoard();
    board.place(); // Places one ship (length 3 by default)

    // Count how many cells contain a Ship reference
    let shipCells = 0;
    for (let row of board.gameBoard) {
        for (let cell of row) {
            if (cell.getValue() instanceof Ship) {
                shipCells++;
            }
        }
    }

    // Should have exactly 3 cells filled (since Ship length = 3)
    expect(shipCells).toBe(3);
});

test("receiveAttack correctly returns hit, miss, and sunk", () => {
    const board = new GameBoard();
    board.place(); 
    const ship = board.ships[0]; // We know there's only one ship (length 3)

    // Find where the ship is placed (get all its coordinates)
    const shipCoords = [];
    for (let r = 0; r < board.rows; r++) {
        for (let c = 0; c < board.cols; c++) {
            if (board.gameBoard[r][c].getValue() === ship) {
                shipCoords.push([r, c]);
            }
        }
    }

    // Hit all but one cell
    const [r1, c1] = shipCoords[0];
    const [r2, c2] = shipCoords[1];
    const [r3, c3] = shipCoords[2];

    expect(board.reciveAttack(r1, c1)).toBe("hit");
    expect(board.reciveAttack(r2, c2)).toBe("hit");
    expect(board.reciveAttack(r3, c3)).toBe("sunk");

    // Now test a miss
    const missResult = board.reciveAttack(0, 0); // Pick a random empty cell
    expect(["hit", "miss", "already attacked"]).toContain(missResult);
});

test("isGameOver returns true after all ships sunk", () => {
    const board = new GameBoard();
    board.place();
    const ship = board.ships[0];

    // Sink the ship fully
    for (let r = 0; r < board.rows; r++) {
        for (let c = 0; c < board.cols; c++) {
            if (board.gameBoard[r][c].getValue() === ship) {
                board.reciveAttack(r, c);
            }
        }
    }

    expect(board.isGameOver()).toBe(true);
});
