import shuffleArray from '../helper/shuffleArray';
import useCards from '../helper/useCards';
import '../styles/GamePanel.css';
import Card from './Card';
import Spinner from './Spinner';
import WinnerMessage from './WinnerMessage';

export default function GamePanel({ increaseScore, resetScore }) {
  const { cardsObjects, setCardsObjects, errorFetching, isLoading } =
    useCards();
  const clickedItems = cardsObjects
    .filter((card) => card.wasClicked)
    .map((card) => card.id);

  const resetGame = () => {
    resetScore();
    setCardsObjects((prev) =>
      prev.map((card) => ({
        ...card,
        wasClicked: false,
      }))
    );
  };

  const handleCardClick = (e, id) => {
    const wasClickedAlready = clickedItems.includes(id);
    if (wasClickedAlready) {
      resetGame();
      return;
    }
    increaseScore();
    setCardsObjects((prev) =>
      prev.map((card) => {
        if (card.id === id) {
          return { ...card, wasClicked: true };
        }
        return card;
      })
    );

    e.currentTarget.blur();
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (errorFetching) {
    return <p>There was a problem. Please restart the page.</p>;
  }
  if (clickedItems.length === cardsObjects.length) {
    return <WinnerMessage onReset={resetGame} />;
  }

  return (
    <div className="game-grid">
      {shuffleArray(cardsObjects).map(({ id, name, imageURL }) => (
        <Card
          imageURL={imageURL}
          key={id}
          id={id}
          imageLabel={name}
          onClick={(e) => handleCardClick(e, id)}
        ></Card>
      ))}
    </div>
  );
}
