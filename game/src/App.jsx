// src/App.jsx
import { useState } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [player, setPlayer] = useState("X");
  const [status, setStatus] = useState("");
  const [winningCombo, setWinningCombo] = useState([]);

  const possibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (index) => {

    if (board[index] || status) return // checking whether box is already filled or not and if game is already finished

    const newBoard = board.map((val, i) => (i === index ? player : val));
    setBoard(newBoard)

    const winner = checkForWin(newBoard);

    if (winner) {
      setStatus(`Player ${winner} wins!`);
    } else if (!newBoard.includes("")) { // checking for not " " in the board 
      setStatus("It's a draw!")
    } else {
      setPlayer((prev) => (prev === "X" ? "O" : "X"));
    }
  };

  const checkForWin = (newBoard) => {
    for (let combo of possibilities) {
      const [a, b, c] = combo;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinningCombo(combo);
        return newBoard[a];
      }
    }
    return null;
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(""));
    setPlayer("X");
    setStatus("");
    setWinningCombo([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Tic Tac Toe</h1>

      <div className="grid grid-cols-3">
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`w-24 h-24 flex items-center justify-center text-4xl font-bold cursor-pointer border-2 border-gray-800 
              ${
                winningCombo.includes(index)
                  ? "bg-green-300"
                  : "bg-white hover:bg-gray-200"
              }`}
          >
            {cell}
          </div>
        ))}
      </div>

      <div className="mt-4 text-xl font-semibold">
        {status ? status : `Next Player: ${player}`}
      </div>

      <button
        onClick={resetBoard}
        className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
      >
        Reset
      </button>
    </div>
  );
}

export default App;
