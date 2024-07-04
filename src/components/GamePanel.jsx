import { useEffect, useState } from 'react';
import fetchCharacters from '../fetchCharacters';
import fetchCharactersImages from '../fetchCharactersImages';
import shuffleArray from '../shuffleArray';
import '../styles/GamePanel.css';
import Card from './Card';
import Spinner from './Spinner';
import WinnerMessage from './WinnerMessage';

export default function GamePanel({ increaseScore, resetScore }) {
  const [cardsObjects, setCardsObjects] = useState([]);
  const [errorFetching, setErrorFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const clickedItems = cardsObjects
    .filter((card) => card.wasClicked)
    .map((card) => card.id);

  useEffect(() => {
    let ignore = false;

    const getCards = async () => {
      try {
        const characters = await fetchCharacters();
        const charactersWithImages = await fetchCharactersImages(characters);

        if (!ignore) {
          setCardsObjects(charactersWithImages);
          setIsLoading(false);
        }
      } catch {
        if (!ignore) {
          setErrorFetching(true);
        }
      }
    };

    getCards();

    return () => {
      ignore = true;
    };
  }, []);

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
    } else {
      increaseScore();
      setCardsObjects((prev) =>
        prev.map((card) => {
          if (card.id === id) {
            return { ...card, wasClicked: true };
          }
          return card;
        })
      );
    }
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
