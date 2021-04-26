import { useEffect, useState } from "react";
import MinesweeperClass from "./lib/minesweeper";
const CELL_OPEN = "open";
const CELL_FLAGGED = "flagged";

export default function Minesweeper({ level }) {
  const [board, setBoard] = useState([]);
  const [cellStates, setCellStates] = useState({});
  const [totalMines, setTotalMines] = useState(0);

  useEffect(() => {
    const minesweeper = new MinesweeperClass(level);
    setBoard(minesweeper.filledBoard);
    setTotalMines(minesweeper.mines.length);
    setCellStates([]);
  }, [level]);

  const handleCellClick = (x, y) =>
    setCellStates({
      ...cellStates,
      [`${x},${y}`]: CELL_OPEN
    });

  const handleCellContextMenu = (x, y) => {
    setCellStates({
      ...cellStates,
      [`${x},${y}`]: CELL_FLAGGED
    });
  };

  return (
    <div className="minesweeper">
      <h4>💣 {totalMines}</h4>
      <div className="board">
        {board.map((row, y) => (
          <div className="row">
            {row.map((cell, x) => (
              <div
                className={`col color-${cell} ${
                  !cellStates[`${x},${y}`] ? "not-open" : ""
                }`}
                onClick={() => handleCellClick(x, y)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleCellContextMenu(x, y);
                }}
              >
                {cellStates[`${x},${y}`] &&
                  (cellStates[`${x},${y}`] === CELL_OPEN ? cell : "📍")}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
