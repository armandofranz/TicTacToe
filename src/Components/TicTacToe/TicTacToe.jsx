import React, { useState, useRef } from "react";
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const initialData = ["","","","","","","","",""];

const TicTacToe = () => {
    let [data, setData] = useState(initialData);
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let titleRef = useRef(null);

    const toggle = (e, num) => {
        if (lock || data[num] !== "") {
            return;
        }
        
        const newData = [...data];
        if (count % 2 === 0) {
            newData[num] = "x";
        } else {
            newData[num] = "o";
        }

        setData(newData);
        setCount(count + 1);
        checkWin(newData);
    };

    const checkWin = (newData) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
                won(newData[a]);
                return;
            }
        }

        // Check for draw
        if (!newData.includes("")) {
            titleRef.current.innerHTML = "It's a Draw!";
        }
    };

    const won = (winner) => {
        setLock(true);
        if (winner === "x") {
            titleRef.current.innerHTML = `Congratulations: <img src="${cross_icon}" alt="cross icon"/>`;
        } else {
            titleRef.current.innerHTML = `Congratulations: <img src="${circle_icon}" alt="circle icon"/>`;
        }
    };

    const resetGame = () => {
        setData(initialData);
        setCount(0);
        setLock(false);
        titleRef.current.innerHTML = 'TicTacToe Game In <span>React</span>';
    };

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>TicTacToe Game In <span>React</span></h1>
            <div className="board">
                {data.map((value, index) => (
                    <div key={index} className="boxes" onClick={(e) => toggle(e, index)}>
                        {value && <img src={value === "x" ? cross_icon : circle_icon} alt={`${value} icon`} />}
                    </div>
                ))}
            </div>
            <button className="reset" onClick={resetGame}>Reset</button>
        </div>
    );
};

export default TicTacToe;
