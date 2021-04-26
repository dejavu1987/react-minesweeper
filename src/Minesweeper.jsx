import { useEffect, useState } from 'react';
import MinesweeperClass from './lib/minesweeper';
const CELL_OPEN = 'open';
const CELL_FLAGGED = 'flagged';

export default function Minesweeper({ level }) {
  const [board, setBoard] = useState([]);
  const [cellStates, setCellStates] = useState({});
  const [totalMines, setTotalMines] = useState(0);
  const [boardMax, setBoardMax] = useState(0);

  useEffect(() => {
    const minesweeper = new MinesweeperClass(level);
    setBoard(minesweeper.filledBoard);
    setTotalMines(minesweeper.mines.length);
    setBoardMax(5 + level * 2);
    setCellStates([]);
  }, [level]);

  let tempOpenCells = {};

  const openCell = (x, y) => {
    if (tempOpenCells[`${x},${y}`] !== CELL_OPEN) {
      tempOpenCells[`${x},${y}`] = CELL_OPEN;

      if (board[y][x] === '') {
        if (x > 0) {
          if (y > 0) {
            openCell(x - 1, y - 1);
          }
          if (y < boardMax - 1) {
            openCell(x - 1, y + 1);
          }
          openCell(x - 1, y);
        }
        if (x < boardMax - 1) {
          if (y > 0) {
            openCell(x + 1, y - 1);
          }
          if (y < boardMax - 1) {
            openCell(x + 1, y + 1);
          }
          openCell(x + 1, y);
        }
        if (y > 0) {
          openCell(x, y - 1);
        }
        if (y < boardMax - 1) {
          openCell(x, y + 1);
        }
      }
    }
  };

  const handleCellClick = (x, y) => {
    openCell(x, y);
    setCellStates({ ...cellStates, ...tempOpenCells });
  };

  const handleCellContextMenu = (x, y) => {
    setCellStates({
      ...cellStates,
      [`${x},${y}`]: CELL_FLAGGED,
    });
  };

  return (
    <div className="minesweeper">
      <h4>💣 {totalMines}</h4>
      <div className="board">
        {board.map((row, y) => (
          <div className="row" key={`row-${y}`}>
            {row.map((cell, x) => (
              <div
                key={`cell-${x}-${y}`}
                className={`col color-${cell} ${
                  !cellStates[`${x},${y}`] ? 'not-open' : ''
                }`}
                onClick={() => handleCellClick(x, y)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleCellContextMenu(x, y);
                }}
              >
                {cellStates[`${x},${y}`] &&
                  (cellStates[`${x},${y}`] === CELL_OPEN ? cell : '📍')}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
