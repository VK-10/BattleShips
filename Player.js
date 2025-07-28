import { GameBoard } from "./gameBoard";


class Player {
    constructor (isComputer = false) {
        this.board = new GameBoard();
        this.isComputer = isComputer;
        this.previousMoves = new Set();
    }

    makeMove(opponentBoard, x, y) {

        if (this.previousMoves.size >= opponentBoard.rows * opponentBoard.cols) {
            return "no moves left"; // or force game over
        }

        if (this.isComputer || x === undefined || y === undefined) {
            [x, y] = this.getRandomMove(opponentBoard.rows, opponentBoard.cols);
        }

        const key = `${x},${y}`
        if (this.previousMoves.has(key)) {
            return this.makeMove(opponentBoard);
        }
        

        this.previousMoves.add(key);
        return opponentBoard.recieveAttack(x, y);
    }

    getRandomMove(maxRows, maxCols) {
        const x = Math.floor(Math.random() * maxRows);
        const y = Math.floor(Math.random() * maxCols);
        return [x, y];
    }
}

export { Player }