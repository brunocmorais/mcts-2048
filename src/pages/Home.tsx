import { Component } from "react";
import { GameComponent } from "../components/game/GameComponent";
import { Direction, Game } from "../game/Game";
import { Navbar } from "../components/navbar/NavbarComponent";
import SwipeableDiv from "../components/swipeable/SwipeableComponent";

const size = 300;

export class Home extends Component {

    private readonly game : Game;

    constructor(props : {}) {
        super(props);
        this.game = new Game(4);
    }

    componentDidMount() {
        document.addEventListener("keyup", this.onKeyUp);
    }

    onKeyUp = (event : KeyboardEvent) => {

        switch (event.key) {
            case "ArrowRight": this.move(Direction.right); break;
            case "ArrowLeft": this.move(Direction.left); break;
            case "ArrowUp": this.move(Direction.up); break;
            case "ArrowDown": this.move(Direction.down); break;
        }
    }
    
    move = (direction : Direction) => {
        this.game.move(direction);
        this.forceUpdate();
    }

    newGame = () => {
        this.game.reset();
        this.forceUpdate();
    }

    render () {

        return (
            <>
                <Navbar />
                <main>
                    <div className="container">
                        <SwipeableDiv 
                            onSwipedDown={() => this.move(Direction.down)}
                            onSwipedUp={() => this.move(Direction.up)}
                            onSwipedLeft={() => this.move(Direction.left)}
                            onSwipedRight={() => this.move(Direction.right)}>
                            <GameComponent game={this.game} size={size} />
                        </SwipeableDiv>
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
                </main>
            </>
        );
    }
}