import { Component, Fragment } from 'react';
import { Game } from '../../game/Game';
import { BoxComponent } from '../box/BoxComponent';
import styles from './styles.module.css';

type State = {
    game : Game;
}

type Props = {
    game : Game;
    size : number;
}

export class GameComponent extends Component<Props, State> {

    constructor(props : Props) {
        super(props);
        this.state = { game : props.game };
    }

    getBody = () => {
        const game = [];
        const size = this.state.game.size;

        for (let i = 0; i < size; i++) {
            let lines = [];

            for (let j = 0; j < size; j++) {
                const index = (i * size) + j;

                lines.push(<BoxComponent 
                    cell={this.state.game.getByPosition(index)} 
                    key={index} 
                    boxSize={Math.floor(this.props.size / size)} 
                />);
            }
            
            game.push(<div className={styles.line} key={i}>{lines}</div>);
        }

        return game;
    }

    render() {
        return (
            <Fragment>
                <div className={styles.container}>
                    <div className={styles.grid} 
                        style={{
                            padding: Math.floor(this.props.size / 100),
                            borderRadius: Math.floor(this.props.size / 50)
                        }}>
                        { this.getBody() }
                    </div>
                </div>
            </Fragment>
        ); 
    }
}