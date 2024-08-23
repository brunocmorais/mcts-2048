import type { IGame } from "./IGame";

export type Cell = { value: number, merged: boolean; }

export class Game implements IGame<Game, Direction> {
    private readonly board : Cell[][];
    public readonly size : number;
    private _score = 0;

    constructor(size : number, score?: number) {

        if (score)
            this._score = score;

        this.size = size;
        this.board = [];

        for (let i = 0; i < this.size; i++) {

            const line = [];

            for (let j = 0; j < this.size; j++)
                line.push({ value: 0, merged: false });

            this.board.push(line);
        }

        this.createNumber();
        this.createNumber();
    }

    public reset() {

        for (const line of this.board) {
            for (const cell of line) {
                cell.merged = false;
                cell.value = 0;
            }
        }

        this.createNumber();
        this.createNumber();

        this._score = 0;
    }

    public clone() {

        const game = new Game(this.size, this._score);

        for (let i = 0; i < this.size * this.size; i++)
            game.setByPosition(i, this.getByPosition(i));

        return game;
    }

    public get score() {
        return this._score;
    }

    public get maxTile() {
        let maxValue = 0;

        for (const line of this.board) {
            for (const cell of line) {
                if (cell.value > maxValue)
                    maxValue = cell.value;
            }
        }

        return maxValue;
    }

    private get isFull() {

        for (const line of this.board)
            for (const item of line)
                if (item.value === 0)
                    return false;

        return true;
    }

    public get possibleMoves() {

        const clones = [ this.clone(), this.clone(), this.clone(), this.clone()];
        const directions = [ Direction.up, Direction.right, Direction.down, Direction.left ];
        const possibleMoves = [];

        for (let i = 0; i < clones.length; i++) {
            if (clones[i].move(directions[i]))
                possibleMoves.push(directions[i]);
        }

        return possibleMoves;
    }

    public get isGameOver() {
        if (!this.isFull)
            return false;

        
        for (const direction of [Direction.up, Direction.right, Direction.down, Direction.left]) {
            const clone = this.clone();
            
            if (clone.move(direction))
                return false;
        }

        return true;
    }

    private createNumber() {

        if (this.isFull)
            return;

        const number = Math.random() < 0.9 ? 1 : 2;
        let position : number;

        do {
            position = Math.floor(Math.random() * (this.size * this.size));
        } while (this.getByPosition(position).value !== 0);

        this.setByPosition(position, { value : number, merged : false });
    }

    public getByPosition(position : number) {

        const x = position % this.size;
        const y = (position - x) / this.size;

        return this.board[y][x];
    }

    private setByPosition(position : number, value : Cell) {

        const cell = this.getByPosition(position);
        cell.value = value.value;
        cell.merged = value.merged;
    }

    public move(direction : Direction) {

        let moved = false;

        for (let i = 0; i < this.size * this.size; i++)
            this.setByPosition(i, { value: this.getByPosition(i).value, merged : false });

        for (let y = 0; y < this.size; y++) {
            for (let x = this.size - 2; x >= 0; x--) {
                for (let m = x; m < this.size - 1; m++) {

                    let current : Cell, next : Cell;

                    switch (direction) {
                        case Direction.up: 
                            current = this.board[(this.size - 1) - m][y];
                            next = this.board[(this.size - 1) - (m + 1)][y]; 
                            break;
                        case Direction.right: 
                            current = this.board[y][m];
                            next = this.board[y][m + 1]; 
                            break;
                        case Direction.down: 
                            current = this.board[m][y];
                            next = this.board[m + 1][y]; 
                            break;
                        case Direction.left: 
                            current = this.board[y][(this.size - 1) - m];
                            next = this.board[y][(this.size - 1) - (m + 1)]; 
                            break;
                        default: 
                            continue;
                    }

                    if (current.value === 0)
                        continue;

                    if (current.value === next.value && !next.merged && !current.merged) {
                        this._score += (2 ** current.value) * 2;
                        next.value++;
                        next.merged = true;
                        current.value = 0;
                        moved = true;
                    } else if (next.value === 0) {
                        next.value = current.value;
                        current.value = 0;
                        moved = true;
                    }
                }
            }
        }

        if (moved)
            this.createNumber();

        return moved;
    }

    public toString() {

        let string = "";

        for (const line of this.board) {
            for (const item of line)
                string += `| ${item.value > 0 ? (2 ** item.value).toString() : ' '} `;

            string += "|\n";
        }

        return string;
    }
}

export enum Direction {
    up,
    right,
    down,
    left
}