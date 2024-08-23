import { Game, Direction } from "./src/game/Game";
import ReactDOM from 'react-dom';

function consoleGame() {
    const game = new Game(4);
    process.stdout.write('\x1Bc');
    process.stdout.write(game.toString() + "\nScore: " + game.score);
    
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', (data) => {
    
        if (data.length === 1 && data[0] === 113)
            process.exit(0);
        
        if (data.length === 3 && data[0] === 27 && data[1] === 91) {
    
            let direction : Direction;
    
            switch (data[2]) {
                case 68: direction = Direction.left; break;
                case 67: direction = Direction.right; break;
                case 65: direction = Direction.up; break;
                case 66: direction = Direction.down; break;
                default: return;
            }
    
            let moved = game.move(direction);
    
            if (moved) {
                process.stdout.write('\x1Bc');
                process.stdout.write(game.toString() + "\nScore: " + game.score);
            }
    
            if (game.isGameOver) {
                process.stdout.write("Game over!\n");
                process.exit(0);
            }
        }
    });
}


consoleGame();