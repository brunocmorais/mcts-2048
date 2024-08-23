import { Component, Fragment } from "react";
import { GameComponent } from "../components/game/GameComponent";
import { Direction, Game } from "../game/Game";

const size = 300;

export default class Main extends Component {

    private readonly game : Game;

    constructor(props : {}) {
        super(props);
        this.game = new Game(4);
    }

    componentDidMount() {
        document.addEventListener("keyup", this.onKeyUp);
    }

    onKeyUp = async (event : KeyboardEvent) => {

        let moved : boolean = false;

        switch (event.key) {
            case "ArrowRight": moved = this.game.move(Direction.right); break;
            case "ArrowLeft": moved = this.game.move(Direction.left); break;
            case "ArrowUp": moved = this.game.move(Direction.up); break;
            case "ArrowDown": moved = this.game.move(Direction.down); break;
        }

        this.forceUpdate();

    }

    newGame = () => {
        this.game.reset();
        this.forceUpdate();
    }

    render () {
        return (
            <Fragment>
                <div className="container">
                    <GameComponent game={this.game} size={size} />
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        <div className="p-2">
                            <button className="btn btn-secondary" onClick={this.newGame}>New Game</button>
                        </div>
                        <div className="p-2">
                            <span className="text-body-secondary"
                                style={{ fontSize: Math.floor(size / 14) }}>
                                <b>Score: {this.game.score}</b>
                            </span>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}