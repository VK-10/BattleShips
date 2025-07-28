import { Cell } from "./cell";
import { Ship } from "./ship";

class GameBoard {
    constructor(rows = 10, cols = 10) {
        this.rows = rows;
        this.cols = cols;
        this.gameBoard = []
        this.ships = []

        for (let i = 0; i < rows; i++) {
            this.gameBoard[i] = [];
            for (let j = 0; j < cols; j++) {
                this.gameBoard[i].push(new Cell());
            }
        }

    }

place() {
    const ship = new Ship(3); // Example ship length (can make this dynamic)
    this.ships.push(ship);
    const size = ship.length;

    const randomInt = (min, max) => 
        Math.floor(Math.random() * (max - min + 1)) + min;

    let placed = false;

    while (!placed) {
        const isHorizontal = Math.random() < 0.5;
        // const isHorizontal = true;

        // Generate valid starting coordinates so ship doesn't go out of bounds
        let row, col;
        if (isHorizontal) {
            row = randomInt(0, this.rows - 1);
            col = randomInt(0, this.cols - size);
        } else {
            row = randomInt(0, this.rows - size);
            col = randomInt(0, this.cols - 1);
        }

        // Check if all cells along the path are free
        let canPlace = true;
        for (let i = 0; i < size; i++) {
            const r = row + (isHorizontal ? 0 : i);
            const c = col + (isHorizontal ? i : 0);
            if (this.gameBoard[r][c].getValue() !== null) {
                canPlace = false;
                break;
            }
        }

        // If valid placement, put the *ship reference* in each cell
        if (canPlace) {
            for (let i = 0; i < size; i++) {
                const r = row + (isHorizontal ? 0 : i);
                const c = col + (isHorizontal ? i : 0);
                this.gameBoard[r][c].setValue(ship); // Store the ship object
            }
            placed = true; // Exit loop
        }
    }
}


recieveAttack (x,y) {
    const cell = this.gameBoard[x][y];
        if (cell.isAttacked()) return "already attacked";
        cell.markAttacked();

        if (cell.getValue() instanceof Ship) {
            const ship = cell.getValue();
            ship.hit();

            if (ship.isSunk()) {
                return "sunk";
            }

            return "hit";
        } else {
            return "miss";
        }
    }

isGameOver() {
    return this.ships.every(ship => ship.isSunk());
}

    
    
}

export {
    GameBoard
}