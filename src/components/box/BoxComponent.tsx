import { Component } from 'react';
import { type Cell } from '../../game/Game';
import styles from './styles.module.css';

type Props = { cell : Cell, boxSize : number };

export class BoxComponent extends Component<Props> {

    constructor(props : Props) {        
        super(props);
    }

    print = () => {
        const value = this.props.cell.value;
        return value > 0 ? (2 ** value).toString() : "";
    }

    render() {
        const value = Math.min(this.props.cell.value, 12);
        const textColor = value <= 3 ? styles.dark : styles.light;

        return (
            <div className={[styles.box, textColor, styles["v" + value]].join(" ")}
                style={{ 
                    width: this.props.boxSize, 
                    height: this.props.boxSize,
                    margin: Math.floor(this.props.boxSize / 16),
                    borderRadius: Math.floor(this.props.boxSize / 16),
                    fontSize: Math.floor(this.props.boxSize / 3),
                }}>
                { this.print() }
            </div>
        );
    }
}