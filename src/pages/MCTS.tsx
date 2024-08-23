import { Fragment } from "react/jsx-runtime"
import { GameComponent } from "../components/game/GameComponent";
import { Direction, Game } from "../game/Game";
import { MonteCarlo } from "../game/MonteCarlo";
import { Component } from "react";
import { sleep } from "../util/Util";

type State = {
    game : Game,
    running : boolean,
    simulations : number,
    depth : number
}

export class MCTS extends Component<{}, State> {

    constructor(props : {}) {
        super(props);

        this.state = { game : new Game(4), running : false, simulations : 50, depth : 10 };
    }

    start = async () => {
        
        this.setState({ running: !this.state.running });
        
        if (this.state.game.isGameOver)
            this.reset();
        
        do {
            const monteCarlo = new MonteCarlo<Game, Direction>(this.state.simulations, this.state.depth);
            const direction = monteCarlo.findNextMove(this.state.game, g => g.score);
            
            this.state.game.move(direction);

            this.forceUpdate();
            await sleep(0);
        } while (this.state.running && !this.state.game.isGameOver);

        this.setState({running: false});
    };

    reset = () => {
        this.state.game.reset();
        this.forceUpdate();
    }

    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className="row g-4">
                        <div className="col-12">
                            <GameComponent game={this.state.game} size={300} />
                            <div className="text-body-secondary text-center w-100"
                                style={{ fontSize: 14 }}>
                                <b>Score: {this.state.game.score}</b>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row g-3">
                                <div className="col-6">
                                    <button className="btn btn-secondary w-100" onClick={this.start}>Start/stop</button>
                                </div>
                                <div className="col-6">
                                    <button className="btn btn-secondary w-100" onClick={this.reset}>Reset</button>
                                </div>
                                <div className="col-6">
                                    <label>Number of simulations:</label>
                                    <input type="number" className="form-control" 
                                        defaultValue={this.state.simulations} min={1}
                                        onChange={evt => this.setState({simulations : parseInt(evt.target.value)})} />
                                </div>
                                <div className="col-6">
                                    <label>Depth:</label>
                                    <input type="number" className="form-control" 
                                        defaultValue={this.state.depth} min={0}
                                        onChange={evt => this.setState({depth : parseInt(evt.target.value)})} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}