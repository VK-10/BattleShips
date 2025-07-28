import { GameController } from "./GameController.js";
import { jest } from '@jest/globals';


test("GameController initializes correctly", () => {
    const controller = new GameController();

    // Should have player and computer
    expect(controller.player).toBeDefined();
    expect(controller.computer).toBeDefined();

    // Boards should not be empty (ships placed)
    const playerCells = controller.player.board.gameBoard.flat();
    const computerCells = controller.computer.board.gameBoard.flat();

    expect(playerCells.some(cell => cell.getValue() !== null)).toBe(true);
    expect(computerCells.some(cell => cell.getValue() !== null)).toBe(true);
});

test("playTurn alternates turns", () => {
    const controller = new GameController();

    expect(controller.currentTurn).toBe("player");
    controller.playTurn(0, 0);
    expect(controller.currentTurn).toBe("computer");

    controller.playTurn(); // computer moves automatically
    expect(controller.currentTurn).toBe("player");
});

test("checkWinner returns correct winner when all ships are sunk", () => {
    const controller = new GameController();

    // Manually sink all ships on the computer's board
    controller.computer.board.ships.forEach(ship => {
        while (!ship.isSunk()) ship.hit();
    });

    const winner = controller.checkWinner();
    expect(winner).toBe("player");
});

test("resetGame resets the state", () => {
    const controller = new GameController();
    controller.currentTurn = "computer";
    controller.isGameOver = true;

    controller.resetGame();

    expect(controller.currentTurn).toBe("player");
    expect(controller.isGameOver).toBe(false);

    // Ensure boards got new ships
    const playerCells = controller.player.board.gameBoard.flat();
    expect(playerCells.some(cell => cell.getValue() !== null)).toBe(true);
});



describe("GameController", () => {
    test("GameController initializes correctly", () => {
        const controller = new GameController();

        expect(controller.player).toBeDefined();
        expect(controller.computer).toBeDefined();

        const playerCells = controller.player.board.gameBoard.flat();
        const computerCells = controller.computer.board.gameBoard.flat();

        expect(playerCells.some(cell => cell.getValue() !== null)).toBe(true);
        expect(computerCells.some(cell => cell.getValue() !== null)).toBe(true);
    });

    test("playTurn alternates turns and calls correct makeMove()", () => {
        const controller = new GameController();

        // Spy on makeMove for both players
        const playerSpy = jest.spyOn(controller.player, "makeMove");
        const computerSpy = jest.spyOn(controller.computer, "makeMove");

        expect(controller.currentTurn).toBe("player");

        // Player moves first
        controller.playTurn(0, 0);
        expect(playerSpy).toHaveBeenCalledWith(controller.computer.board, 0, 0);
        expect(controller.currentTurn).toBe("computer");

        // Computer moves next
        controller.playTurn(); // no coords passed, should randomize
        expect(computerSpy).toHaveBeenCalledWith(controller.player.board, undefined, undefined);
        expect(controller.currentTurn).toBe("player");

        playerSpy.mockRestore();
        computerSpy.mockRestore();
    });

    test("checkWinner returns correct winner when all computer ships sunk", () => {
        const controller = new GameController();

        controller.computer.board.ships.forEach(ship => {
            while (!ship.isSunk()) ship.hit();
        });

        expect(controller.checkWinner()).toBe("player");
    });

    test("resetGame resets state", () => {
        const controller = new GameController();
        controller.currentTurn = "computer";
        controller.isGameOver = true;

        controller.resetGame();

        expect(controller.currentTurn).toBe("player");
        expect(controller.isGameOver).toBe(false);

        const playerCells = controller.player.board.gameBoard.flat();
        expect(playerCells.some(cell => cell.getValue() !== null)).toBe(true);
    });
});
