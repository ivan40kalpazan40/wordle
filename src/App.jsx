import { useState, useEffect, useRef } from 'react';
import Row from './components/Row';
import './App.css';

function App() {
  const effectRan = useRef(false);
  const [word, setWord] = useState('');
  const [table, setTable] = useState(Array(6).fill(null));
  const [guess, setGuess] = useState('');
  const [row, setRow] = useState(0);
  const [error, setError] = useState('');
  // state to track if word is five characters long
  const [isComplete, setIsComplete] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  useEffect(() => {
    const keyPressHandler = async (e) => {
      if (isGameOver) return;
      if (e.keyCode === 13) {
        // Enter
        // if (!isComplete) return;

        // check if is existing word
        const response = await fetch(import.meta.env.VITE_ALL_WORDS);
        const result = await response.json();
        const isValidWord = result.includes(guess);
        if (!isValidWord) {
          setError('Not a valid word');
          return;
        }

        // word is valid!
        // check if word is the one looked after
        if (guess === word) {
          setRow((oldRow) => oldRow + 1);
          const helperTable = [...table];
          helperTable[row] = guess;
          setTable(helperTable);
          setGuess('');
          setIsGameOver(true);
          return;
        }
      }
      if (e.keyCode === 8) {
        // Backspace
      }
      if (e.keyCode < 65 || e.keyCode > 90) return;

      // key pressed is letter! Perform setGuess and do additional checks
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
          return <Row key={i} line={row === i ? guess : line ?? ''} />;
        })}
      </div>
    </div>
  );
}

export default App;
