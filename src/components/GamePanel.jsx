import { useEffect, useState } from 'react';
import fetchCharacters from '../fetchCharacters';
import fetchCharactersImages from '../fetchCharactersImages';
import '../styles/GamePanel.css';
import Card from './Card';
import Spinner from './Spinner';
import WinnerMessage from './WinnerMessage';

const fake = [
  {
    id: 55,
    name: 'Michael Scott',
    imageURL:
      'https://media1.giphy.com/media/BY8ORoRpnJDXeBNwxg/200w.gif?cid=39ffc5cb5viuy658op9gz92y4dak8om9hbis5x9kbbb22d62&ep=v1_gifs_search&rid=200w.gif&ct=g',
  },
  {
    id: 72,
    name: 'Ryan Howard',
    imageURL:
      'https://media1.giphy.com/media/SiBRuDZmgmBHNo0SOY/200w.gif?cid=39ffc5cb11zzpfp3cuyxqen2co6nlecti5c7gkwumka2wrr1&ep=v1_gifs_search&rid=200w.gif&ct=g',
  },
];

function shuffleArray(backup) {
  const array = [...backup];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function GamePanel({ increaseScore, resetScore }) {
  const [cardsObjects, setCardsObjects] = useState([]);
  const [errorFetching, setErrorFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const clickedItems = cardsObjects
    .filter((card) => {
      return card.wasClicked;
    })
    .map((card) => card.id);

  useEffect(() => {
    let ignore = false;

    const getCards = async () => {
      try {
        const characters = await fetchCharacters();
        // const charactersWithImages = await fetchCharactersImages(characters);

        if (!ignore) {
          setCardsObjects(fake);
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
      prev.map((card) => {
        card.wasClicked = false;
        return card;
      })
    );
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (errorFetching) {
    return <p>There was a problem. Please restart the page.</p>;
  }

  if (clickedItems.length === cardsObjects.length) {
    return <WinnerMessage onReset={resetGame}></WinnerMessage>;
  }

  return (
    <div className="game-grid">
      {shuffleArray(cardsObjects).map(({ id, name, imageURL }) => (
        <Card
          imageURL={imageURL}
          key={id}
          id={id}
          imageLabel={name}
          onClick={(e) => {
            const wasClickedAlready = clickedItems.includes(id);
            if (wasClickedAlready) {
              resetGame();
            } else {
              increaseScore();
              setCardsObjects((prev) =>
                prev.map((card) => {
                  if (card.id === id) {
                    card.wasClicked = true;
                  }
                  return card;
                })
              );
            }
            e.currentTarget.blur();
          }}
        ></Card>
      ))}
    </div>
  );
}
