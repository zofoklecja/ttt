import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className={`square ${props.isWinningClass}`}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
};

class Board extends React.Component {
    renderSquare(i, isWinning) {
        const computedClass = isWinning ? 'is-winning' : '';
        console.log(arguments[0], arguments[1], computedClass);

        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => {this.props.onClick(i)}}
                isWinningClass={computedClass}
            />
        );
    }

    render() {
        const a = [...Array(3).keys()];

        return (
        <div>
        {
            a.map((i) => {
               return( <div className="board-row">
                    {a.map((j) => {
                        const index = i * a.length + j;
                        const isWinning = this.props.winningSquares.includes(index)
                        return this.renderSquare(index, isWinning);
                    })}
                </div>
               )
            })
        }
        </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                row: null,
                col: null,
            }],
            stepNumber: 0,
            xIsNext: true,
            isChrono: true,
        };
    }

    handleButtonClick() {
        const currentOrder = this.state.isChrono;
        const newOrder = !currentOrder;

        this.setState({
            ...this.state,
            isChrono: newOrder,
        });
    }

    handleSquareClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares).winner || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            ...this.state,
            history: history.concat([{
                squares,
                row: Math.floor(i / 3) + 1,
                column: i % 3 + 1,
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: this.state.stepNumber + 1,
        });
    }

    jumpTo(move) {
        this.setState({
            stepNumber: move,
            xIsNext: move % 2 === 0,
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const { winner, winningSquares } = calculateWinner(current.squares);

        let moves = history.map((step, move) => {
            const desc = move ?
                `Go to move #${move} (${step.row}, ${step.column})` : 'Go to game start';
            const computedClass = step.squares === current.squares ? 'active' : '';
            return (
                <li key={move}>
                    <button onClick={()=>this.jumpTo(move)} className={computedClass}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        moves = this.state.isChrono ? moves : moves.reverse();

        return (
        <div className="game">
            <div className="game-board">
            <Board squares={current.squares}
                winningSquares={winningSquares}
                onClick={(i) => this.handleSquareClick(i)}
            />
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            </div>
            <div className="toggle-button">
                <button onClick={() => this.handleButtonClick()}>Toggle order</button>
            </div>
        </div>
        );
    }
}

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                winningSquares: lines[i],
            }
        }
    }
    return {
        winner: null,
        winningSquares: [],
    }
};

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);