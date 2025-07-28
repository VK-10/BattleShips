
import { Player } from "./Player";

class GameController {
    constructor() {
        this.player = new Player(false)
        this.computer = new Player(true)

        this.player.board.place();
        this.computer.board.place();

        this.currentTurn = "player";
        this.isGameOver = false;
    }
    playTurn(x, y) {
        if (this.checkWinner()) return;
        if (this.currentTurn === "player") {
            this.player.makeMove(this.computer.board,x,y);
            this.currentTurn = "computer"
        }else {
            this.computer.makeMove(this.player.board,x,y)
            this.currentTurn = "player"
        }
    }

    checkWinner() {
        if (this.player.board.isGameOver()) {
            this.isGameOver = true;
            return "computer";
        } 
        if (this.computer.board.isGameOver()) {
            this.isGameOver = true;
            return "player";
        }

        return null
    }

    resetGame() {
        this.player = new Player(false);
        this.computer = new Player(true);
        this.player.board.place();
        this.computer.board.place();
        this.currentTurn = "player";
        this.isGameOver = false;
    }
}

export { GameController };