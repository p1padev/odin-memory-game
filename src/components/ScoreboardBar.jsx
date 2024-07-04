import '../styles/Scoreboard.css';

export default function ScoreboardBar({ scoreboard }) {
  return (
    <header className="scoreboard">
      <div className="current-score">
        Current Score: {scoreboard.currentScore}
      </div>
      <div className="best-score">Best Score: {scoreboard.bestScore}</div>
    </header>
  );
}
