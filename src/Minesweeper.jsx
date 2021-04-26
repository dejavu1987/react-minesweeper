import { useState } from "react";
import MinesweeperClass from "./lib/minesweeper";

export default function Minesweeper({ level }) {
  const minesweeper = new MinesweeperClass(level);
  const [board, setBoard] = useState(minesweeper.filledBoard);

  return (
    <div className="minesweeper">
      <h4>💣 {minesweeper.mines.length}</h4>
      <div className="board">
        {board.map((row) => (
          <div className="row">
            {row.map((cell) => (
              <div className={`col color-${cell}`}>{cell}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
