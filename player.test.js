import { Player } from "./Player.js";
import { GameBoard } from "./gameBoard.js";

test("Player has a GameBoard", () => {
    const player = new Player();
    expect(player.board).toBeInstanceOf(GameBoard);
});

test("Player can make a move on opponent board", () => {
    const player1 = new Player();
    const player2 = new Player();

    player2.board.place(); // place a ship to hit

    const result = player1.makeMove(player2.board, 0, 0);
    expect(["hit", "miss", "sunk", "already attacked"]).toContain(result);
});

test("Computer makes random valid moves", () => {
    const human = new Player();
    const computer = new Player(true);

    const result = computer.makeMove(human.board); // no x,y passed, random
    expect(["hit", "miss", "sunk", "already attacked"]).toContain(result);
});

test("Player doesn't repeat moves", () => {
    const player = new Player();
    const opponent = new Player();

    const first = player.makeMove(opponent.board, 0, 0);
    const second = player.makeMove(opponent.board, 0, 0); // tries same spot

    // Second move should retry automatically
    expect(player.previousMoves.size).toBeGreaterThan(1);
});
