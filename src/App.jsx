import { useState, useEffect, useRef } from 'react';
import Row from './components/Row';
import Keypad from './components/Keypad';
import { alphabetConstructor } from './utils/util';
import './App.css';

function App() {
  const effectRan = useRef(false);
  const [word, setWord] = useState('');
  const [table, setTable] = useState(Array(6).fill(null));
  const [guess, setGuess] = useState('');
  const [row, setRow] = useState(0);
  const [error, setError] = useState(null);
  const [keyPad, setKeyPad] = useState(alphabetConstructor());
  const [isGameOver, setIsGameOver] = useState(false);
  useEffect(() => {
    const keyPressHandler = async (e) => {
      if (isGameOver) return;
      if (e.keyCode === 13) {
        // Enter
        if (guess.length < 5) return;

        // check if is existing word
        const response = await fetch(import.meta.env.VITE_ALL_WORDS);
        const result = await response.json();
        const isValidWord = result.includes(guess);
        if (!isValidWord) {
          setError('Not a valid word');
          setTimeout(() => {
            setError(null);
          }, 3500);
          return;
        }
        for (let i = 0; i < guess.length; i++) {
          let found = keyPad.find(
            (x) => x.letter.toLowerCase() === guess[i].toLowerCase()
          );
          if (word.includes(guess[i])) {
            if (word[i] === guess[i]) {
              found.status = 'correctlyGuessed';
            } else {
              found.status =
                found.status === 'correctlyGuessed'
                  ? 'correctlyGuessed'
                  : 'closeGuessed';
            }
          } else {
            found.status = 'wrongGuessed';
          }
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
        } else {
          if (row < 6) {
            setRow((oldRow) => oldRow + 1);
            const helperTable = [...table];
            helperTable[row] = guess;
            setTable(helperTable);
            setGuess('');
          }
          return;
        }
      }
      if (e.keyCode === 8) {
        // Backspace
        setGuess(guess.slice(0, -1));
        return;
      }
      if (e.keyCode < 65 || e.keyCode > 90) return;

      // key pressed is letter! Perform setGuess and do additional checks
      if (guess.length < 5) {
        if (row < 6) {
          setGuess((oldGuess) => oldGuess + e.key);
        }
      }
    };
    window.addEventListener('keydown', keyPressHandler);
    return () => window.removeEventListener('keydown', keyPressHandler);
  }, [guess]);

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
          return (
            <Row
              key={i}
              line={row === i ? guess : line ?? ''}
              word={word}
              isEntered={row !== i && line !== null}
            />
          );
        })}
        <p className={isGameOver ? 'success' : error ? 'error' : ''}>
          {' '}
          {isGameOver ? 'SUCCESS' : error ? error : ''}
        </p>
      </div>
      <Keypad keyPad={keyPad} />
    </div>
  );
}

export default App;

// TODO:
// AUTH
// GAME DISTRIBUTION STATISTICS, POINTS, SCORES
// DICTIONARY - EXPLAIN THE WORD IN SEARCH
// EFFECTS - TILE SHAKE, ETC.
// NOTIFICATIONS
// ....
