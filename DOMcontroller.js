import { GameController } from "./GameController";

class DomController {
    constructor() {
        this.game = new GameController();
        this.initUI();

    }

    handlePlayerMove(r, c, cellDiv) {
        if (this.game.isGameOver) return;

        const result = this.game.playTurn(r,c);

        this.markCell(cellDiv, result);

        if (this.game.checkWinner()) {
            alert("Player Wins!");
            this.game.isGameOver = true;
            return;
        }

        setTimeout(() => this.triggerComputermove(), 500);
    }

    triggerComputermove() {
        const result = this.game.playTurn();
        console.log("Computer move result : ", result);

        if (this.game.checkWineer()) {
            alert("Computer wins!")
            this.game.isGameOver = true;
        }

        this.updateUI();
    }

    markCell(cellDiv, result) {
        if (result === "hit" || result === "sunk") {
            cellDiv.classList.add("hit");
        } else if (result === "miss") {
            cellDiv.classList.add("miss");
        }
    }

    initUI() {
        // const player = this.game.player.board;
        // const comp = this.game.computer.board;

        const playerContainer = document.getElementById("player-board");
        const computerContainer = document.getElementById("computer-board");

        const createGrid = (board, container, isComputer = false) => {
            for (let r =0; r < board.length; r++) {
                const rowDiv = document.createElement("div");
                rowDiv.classList.add("row");
                for (let c =0; c < board[r].length; c++) {
                    const cellDiv = document.createElement("div");
                    cellDiv.classList.add("cell");
                    cellDiv.dataset.row = r;
                    cellDiv.dataset.col = c;

                    if (isComputer) {
                        cellDiv.addEventListener("click", () => {
                            this.handlePlayerMove(r,c, cellDiv);
                        })
                    }
                    rowDiv.appendChild(cellDiv);
                }

                container.appendChild(rowDiv);
            }
        }

        createGrid(this.game.player.board.gameBoard, playerContainer);
        createGrid(this.game.computer.board.gameBoard, computerContainer, true);

        this.updateUI();
    }

    // addEventListener() {
    // }

    updateUI() {
        // Redraw boards after each move
        this.refreshBoard(this.game.player.board.gameBoard, this.playerContainer, false);
        this.refreshBoard(this.game.computer.board.gameBoard, this.computerContainer, true);
    }

    refreshBoard(board, container, isComputer) {
        const cells = container.querySelectorAll(".cell");
        cells.forEach((cellDiv) => {
            const r = parseInt(cellDiv.dataset.row);
            const c = parseInt(cellDiv.dataset.col);
            const cell = board[r][c];

            cellDiv.className = "cell";

            if (cell.isAttacked()) {
                if (cell.getValue()) {
                    cellDiv.classList.add("hit");
                } else {
                    cellDiv.classList.add("miss");
                }
            } else if (!isComputer && cell.getValue()) {
                cellDiv.classList.add("ship");
            }
        })
    }
}

export { DomController };