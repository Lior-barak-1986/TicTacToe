import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Board from '../Components/Board';

export default function Game(props) {
    const { name, nick, socket } = props;
    const [round, setRound] = useState(-1);
    const [turn, setTurn] = useState(false);
    const defaultArray = [["", "", ""], ["", "", ""], ["", "", ""]];
    const [array, setArray] = useState(defaultArray);
    const [winner, setWinner] = useState("");
    const navigate = useNavigate();
    const defaults = (turn, round) => {
        setRound(round);
        setWinner("");
        setTurn(turn);
        setArray(defaultArray)
    }
    socket.on('game-started', (turn) => {
        console.log('game-started');
        setRound(0);
        setTurn(turn);
    });
    socket.on('game-reset', (turn) => {
        defaults(turn, 0);
    });
    socket.on('player-left', (turn) => {
        defaults(turn, -1);
    });
    socket.on('player-moved', (boardGame, round, turn, winner) => {
        setArray(boardGame);
        setWinner(winner);
        setRound(round);
        setTurn(turn);
    });
    useEffect(() => {
        if (!name || !nick) navigate("/");
    }, [name, nick]);

    const clickOnBoard = (row, col) => {
        if (array[row][col] || winner || !turn)
            return;
        const temp = [...array];
        temp[row][col] = round % 2 ? "X" : "O";
        setArray([...temp]);
        setTurn(false);
        socket.emit('move', temp, round + 1);
    }
    const resetGame = () => {
        socket.emit('reset')
    }
    const head = () => {
        return (winner ? <h1>The Winner is player {winner}</h1>
        :
             turn
                ? <h1> Your move player {round % 2 + 1}</h1>
                : <h1> Waiting for player {round % 2 + 1}</h1>)
    }
    if (round === -1)
        return <h1>Awaiting another player</h1>;
    return (
        <div className='flexContainer'>
            {
                head()
            }
            <Board playes={array} onClick={clickOnBoard} />
            <div className='bottom center'>
                <button onClick={resetGame}>Reset game</button>
            </div>
        </div>
    )
}
