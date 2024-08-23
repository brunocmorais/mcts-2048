export interface IGame<T, M> {

    clone() : T;
    get possibleMoves() : M[];
    get isGameOver() : boolean;
    move(move : M) : boolean;
}