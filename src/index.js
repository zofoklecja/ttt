import React, { useState } from 'react';
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

function Status(props) {
    const winner = props.currentSquares[props.winningSquares[0]];

    return (
        <div>
            {winner ? `Winner: ${winner}` : 'Next player: ' + (props.xIsNext ? 'X' : 'O')}
        </div>
    )
}

function Moves(props) {
    let moves = props.history.map((step, move) => {
        const desc = move ?
            `Go to move #${move} (${step.row}, ${step.column})` : 'Go to game start';
        const computedClass = step.squares === props.currentSquares ? 'active' : '';
        return (
            <li key={move}>
                <button onClick={()=>props.jumpTo(move)} className={computedClass}>{desc}</button>
            </li>
        );
    });

    return (
        <ol>
            {props.isChrono ? moves : moves.reverse()}
        </ol>
    )
}

function DrawMessage(props) {
    const isActive = !props.currentSquares.includes(null) && !props.winningSquares.length;

    if (isActive) {
        return (
            <div>It's a draw! <span role="img" aria-label="Flustered face emoji">😳</span></div>
        )
    } else {
        return null;
    }
}

function Board(props) {
    const a = [...Array(3).keys()];

    const renderSquare = (i, isWinning) => {
        const computedClass = isWinning ? 'is-winning' : '';

        return (
            <Square
                key={i}
                value={props.squares[i]}
                onClick={() => {props.onClick(i)}}
                isWinningClass={computedClass}
            />
        )
    };

    return (
        a.map((i) => {
            return( <div className="board-row" key={i}>
                {a.map((j) => {
                    const index = i * a.length + j;
                    const isWinning = props.winningSquares?.includes(index)
                    return renderSquare(index, isWinning);
                })}
            </div>
            )
        })
    );
};

function Game(props) {
    const [ history, setHistory ] = useState([{
        squares: Array(9).fill(null),
        row: null,
        col: null,
    }]);
    const [ stepNumber, setStepNumber ] = useState(0);
    const [ xIsNext, setXIsNext ] = useState(true);
    const [ isChrono, setIsChrono ] = useState(true);

    const [ winningSquares, setWinningSquares ] = useState([]);

    const handleButtonClick = () => {
        setIsChrono(isChrono => !isChrono);
    }

    const handleSquareClick = (i) => {
        const currentSquares = history[stepNumber].squares;

        if (calculateWinner(currentSquares).length || currentSquares[i]) {
            return;
        }

        let update = currentSquares.slice(0);
        update[i] = xIsNext ? 'X' : 'O';

        setHistory((history) => history.concat([{
            squares: update,
            row: Math.floor(i / 3) + 1,
            column: i % 3 + 1,
        }]));
        setStepNumber(stepNumber => stepNumber + 1);
        setXIsNext(xIsNext => !xIsNext);

        setWinningSquares(calculateWinner(update));
    }

    const jumpTo = (move) => {
        debugger;
        setStepNumber(move);
        setXIsNext(move % 2 === 0);

        setWinningSquares(calculateWinner(history[move].squares));
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board 
                    squares={history[stepNumber].squares}
                    winningSquares={winningSquares}
                    onClick={(i) => handleSquareClick(i)}
                />
            </div>
            <div className="game-info">
                <Status
                    currentSquares = {history[stepNumber].squares}
                    winningSquares = {winningSquares}
                    xIsNext={xIsNext}
                />
                <DrawMessage
                    currentSquares={history[stepNumber].squares}
                    winningSquares={winningSquares}    
                />
                <Moves
                    currentSquares={history[stepNumber].squares}
                    history={history}
                    isChrono={isChrono}
                    jumpTo={jumpTo}
                />
                <button onClick={() => handleButtonClick()}>Toggle history order</button>
            </div>
        </div>
    );
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
            return lines[i];
        }
    }
    return [];
};

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);