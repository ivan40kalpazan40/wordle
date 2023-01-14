import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const effectRan = useRef(false);
  const [word, setWord] = useState('');
  useEffect(() => {
    if (effectRan.current === false) {
      fetch(import.meta.env.VITE_RANDOM_WORD)
        .then((response) => response.json())
        .then((result) => setWord(result[0]));
    }
    return () => (effectRan.current = true);
  }, []);
  return <div className="App">{word}</div>;
}

export default App;
