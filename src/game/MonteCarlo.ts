import { range } from "../util/Util";
import type { IGame } from "./IGame";

type GameMove<T extends IGame<T, M>, M extends number> = {
    game : T;
    move : M;
}

type MoveAvg<M> = {
    move: M;
    avg: number;
};

export class MonteCarlo<T extends IGame<T, M>, M extends number> {

    private readonly simulations : number;
    private readonly depth : number;

    constructor(simulations : number, depth : number) {
        this.simulations = simulations;
        this.depth = depth;
    }

    public findNextMove(game : T, evalFn: (value: T) => number) {

        const possibleMoves = game.possibleMoves;
        const children : GameMove<T, M>[] = [];

        for (const move of possibleMoves) {
            children.push(...range(this.simulations).map(() => {

                const copy = game.clone();
                copy.move(move);

                return { game : copy, move : move };
            }));
        }

        for (const child of children) {
            for (let i = 0; i < this.depth && !child.game.isGameOver; i++) {
                let moves = child.game.possibleMoves;
                const move = moves[Math.floor(Math.random() * moves.length)];
                child.game.move(move);
            }
        }

        const group = Object.groupBy(children, ({ move }) => move);
        const result : MoveAvg<M>[] = [];

        for (const possibleMove of possibleMoves) {

            const items = group[possibleMove];

            if (items) {
                let avg = items.map(i => i.game).map(evalFn).reduce((a, b) => a + b) / items.length;
                result.push({ move : possibleMove, avg : avg });
            }
        }

        return result.reduce((a, b) => a.avg > b.avg ? a : b).move;
    }
}