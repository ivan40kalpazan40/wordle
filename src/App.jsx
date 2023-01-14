import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const effectRan = useRef(false);
  const [word, setWord] = useState('');
  const [table, setTable] = useState(Array(6).fill(null));
  const [guess, setGuess] = useState('');
  const [row, setRow] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  useEffect(() => {
    const keyPressHandler = (e) => {
      if (isGameOver) return;
      if (e.keyCode === 15) {
        // Enter
      }
      if (e.keyCode === 8) {
        // Backspace
      }
      if (e.keyCode < 65 || e.keyCode > 90) return;
    };
    window.addEventListener('keydown', keyPressHandler);
    return () => window.removeEventListener('keydown', keyPressHandler);
  }, []);

  useEffect(() => {
    if (effectRan.current === false) {
      fetch(import.meta.env.VITE_RANDOM_WORD)
        .then((response) => response.json())
        .then((result) => setWord(result[0]));
    }
    return () => (effectRan.current = true);
  }, []);
  return (
    <div className="gameplay">
      <div className="table">
        {table.map((line, i) => {
          return <div key={i}>{i}current line</div>;
        })}
      </div>
    </div>
  );
}

export default App;
