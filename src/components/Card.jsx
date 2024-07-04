import '../styles/Card.css';

export default function Card({ imageURL, imageLabel, onClick }) {
  return (
    <button className="card" onClick={onClick}>
      <img src={imageURL} alt="imageLabel"></img>
      <div className="card-title">{imageLabel}</div>
    </button>
  );
}
