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
                onClick={() =>
                  setCellStates({
                    ...cellStates,
                    [`${x},${y}`]: CELL_OPEN
                  })
                }
                onContextMenu={(e) => {
                  e.preventDefault();
                  setCellStates({
                    ...cellStates,
                    [`${x},${y}`]: CELL_FLAGGED
                  });
                }}
              >
                {cellStates[`${x},${y}`] &&
                  (cellStates[`${x},${y}`] === CELL_OPEN ? cell : "🔒")}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
