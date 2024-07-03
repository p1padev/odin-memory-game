import { useState } from 'react';
import './App.css';
import GamePanel from './components/GamePanel';
import ScoreboardBar from './components/ScoreboardBar';

function App() {
  const [scoreboard, setScoreboard] = useState({
    currentScore: 0,
    bestScore: 0,
  });

  const increaseScore = () => {
    const current = scoreboard.currentScore;
    const best = scoreboard.bestScore;
    setScoreboard({
      currentScore: current + 1,
      bestScore: current > best ? current : best,
    });
  };

  const resetScore = () => {
    setScoreboard({
      ...scoreboard,
      currentScore: 0,
    });
  };

  return (
    <>
      <ScoreboardBar scoreboard={scoreboard}></ScoreboardBar>
      <main className="game-container">
        <GamePanel
          increaseScore={increaseScore}
          resetScore={resetScore}
        ></GamePanel>
      </main>
    </>
  );
}

export default App;
