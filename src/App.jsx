import './styles.css';
import Minesweeper from './Minesweeper';
import { useState } from 'react';

export default function App() {
  const [level, setLevel] = useState(4);
  return (
    <div className="App">
      <label htmlFor="">
        Select Level:{' '}
        <input
          className="level-select"
          onChange={(e) => setLevel(e.target.value)}
          type="number"
          min={1}
          max={16}
          value={level}
        />
      </label>
      <Minesweeper level={level} />
    </div>
  );
}
