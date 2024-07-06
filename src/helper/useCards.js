import { useEffect, useState } from 'react';
import fetchCharacters from './fetchCharacters';
import fetchCharactersImages from './fetchCharactersImages';

export default function useCards() {
  const [cardsObjects, setCardsObjects] = useState([]);
  const [errorFetching, setErrorFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const getCards = async () => {
      try {
        const characters = await fetchCharacters();
        const charactersWithImages = await fetchCharactersImages(characters);
        if (!ignore) {
          setCardsObjects(charactersWithImages);
        }
      } catch {
        if (!ignore) {
          setErrorFetching(true);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    getCards();
    return () => {
      ignore = true;
    };
  }, []);

  return { cardsObjects, setCardsObjects, errorFetching, isLoading };
}
