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
    const increased = scoreboard.currentScore + 1;
    const best = scoreboard.bestScore;
    setScoreboard({
      currentScore: increased,
      bestScore: increased >= best ? increased : best,
    });
  };

  const resetScore = () => {
    setScoreboard({
      ...scoreboard,
      currentScore: 0,
    });
  };

  console.log(scoreboard);

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
