import '../styles/Winner.css';

export default function WinnerMessage({ onReset }) {
  return (
    <div className="winner">
      <h2>Congratulations, you have won!</h2>
      <button onClick={onReset} className="button">
        Press to reset
      </button>
    </div>
  );
}
