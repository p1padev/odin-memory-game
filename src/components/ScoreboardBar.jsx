import '../styles/Scoreboard.css';

export default function ScoreboardBar({ scoreboard }) {
  return (
    <header className="scoreboard">
      <div>
        This is a memory game based on The Office TV Show. Click all cards
        without repeating to win. Powered by GIPHY.
      </div>
      <div className="current-score">
        Current Score: {scoreboard.currentScore}
      </div>
      <div className="best-score">Best Score: {scoreboard.bestScore}</div>
    </header>
  );
}
