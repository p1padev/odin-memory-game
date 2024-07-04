import { useEffect, useState } from 'react';
import fetchCharacters from '../fetchCharacters';
import fetchCharactersImages from '../fetchCharactersImages';
import '../styles/GamePanel.css';
import Card from './Card';
import Spinner from './Spinner';

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
  {
    id: 18,
    name: 'Dwight Schrute',
    imageURL:
      'https://media3.giphy.com/media/pkKt4lHJuZj9KjsxoS/200w.gif?cid=39ffc5cbb80s3fvjtv8efu9h5j4v8npv7800o2mod76jmo24&ep=v1_gifs_search&rid=200w.gif&ct=g',
  },
  {
    id: 39,
    name: 'Jim Halpert',
    imageURL:
      'https://media0.giphy.com/media/HP7mtfNa1E4CEqNbNL/200w.gif?cid=39ffc5cb117r7l047qa7xjs8uoj6bl17k52kj8kl82ns3yt6&ep=v1_gifs_search&rid=200w.gif&ct=g',
  },
  {
    id: 62,
    name: 'Pam Beesly',
    imageURL:
      'https://media1.giphy.com/media/N37n3oOx2EUkpX1Vaj/200w.gif?cid=39ffc5cbscubxzra1iao0j29uztks9pstcwctw69o18z7p2l&ep=v1_gifs_search&rid=200w.gif&ct=g',
  },
  {
    id: 11,
    name: 'Creed Bratton',
    imageURL:
      'https://media4.giphy.com/media/XqoisoDHmDYFauS2FR/200w.gif?cid=39ffc5cb3rhztei8tmmq124ai73i2e5rd1gcil5x8bi3c7qr&ep=v1_gifs_search&rid=200w.gif&ct=g',
  },
  {
    id: 2,
    name: 'Andy Bernard',
    imageURL:
      'https://media1.giphy.com/media/BRSZTf7QA4W7SngoS9/200w.gif?cid=39ffc5cbs9fxi69mqk4bveeg35u3ox0993yuizxym6flswt1&ep=v1_gifs_search&rid=200w.gif&ct=g',
  },
  {
    id: 3,
    name: 'Angela Martin',
    imageURL:
      'https://media1.giphy.com/media/PAbP0kXq6qDmCFWjHp/200w.gif?cid=39ffc5cbc3e2qpwwaee9fivstcwmw8l9rbe8jzmqpgykkuqh&ep=v1_gifs_search&rid=200w.gif&ct=g',
  },
  {
    id: 14,
    name: 'Darryl Philbin',
    imageURL:
      'https://media2.giphy.com/media/j0gQA2VD38NKc9rc8y/200w.gif?cid=39ffc5cbrskx69df5uurie44zbomtzkln96si7qly00a11l2&ep=v1_gifs_search&rid=200w.gif&ct=g',
  },
  {
    id: 76,
    name: 'Stanley Hudson',
    imageURL:
      'https://media1.giphy.com/media/wqbAfFwjU8laXMWZ09/200w.gif?cid=39ffc5cbttwybmvlbp99e8ez0ygdorx7t7nq34aaajz9ppbe&ep=v1_gifs_search&rid=200w.gif&ct=g',
  },
  {
    id: 36,
    name: 'Jan Levinson',
    imageURL:
      'https://media2.giphy.com/media/eVs9vvc2GK5MLbR6WU/200w.gif?cid=39ffc5cb6xuej1pkcobvo5hsee9x9645jl7tsnhpi13ajkg0&ep=v1_gifs_search&rid=200w.gif&ct=g',
  },
  {
    id: 47,
    name: 'Kevin Malone',
    imageURL:
      'https://media2.giphy.com/media/bC9czlgCMtw4cj8RgH/200w.gif?cid=39ffc5cbfdmw5r6ufenltsyo3y4a4tkbos74zvoqhin4ywnr&ep=v1_gifs_search&rid=200w.gif&ct=g',
  },
  {
    id: 54,
    name: 'Meredith Palmer',
    imageURL:
      'https://media2.giphy.com/media/qLn7A0eolL9DQyhJdj/200w.gif?cid=39ffc5cbdudcsvbe7p7dizrkn92hujitlocl28wbrgphv6s3&ep=v1_gifs_search&rid=200w.gif&ct=g',
  },
  {
    id: 67,
    name: 'Phyllis Vance',
    imageURL:
      'https://media2.giphy.com/media/l0Ex1Fg5qBNWdKqUE/200w.gif?cid=39ffc5cb0tcl4ksotf47utuc0wiia5mp6lzn95jrif37nk35&ep=v1_gifs_search&rid=200w.gif&ct=g',
  },
  {
    id: 45,
    name: 'Kelly Kapoor',
    imageURL:
      'https://media2.giphy.com/media/JvEMPOQubkyQx9YLQ5/200w.gif?cid=39ffc5cbja5tcs3ui2ozqstgujd40m0d9k5oxi29cr4794mt&ep=v1_gifs_search&rid=200w.gif&ct=g',
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

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (errorFetching) {
    return <p>There was a problem. Please restart the page.</p>;
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
              resetScore();
              setCardsObjects((prev) =>
                prev.map((card) => {
                  card.wasClicked = false;
                  return card;
                })
              );
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
