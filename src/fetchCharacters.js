import fetchHelper from './fetchHelper';

export default async function fetchCharacters() {
  let characters = await fetchHelper(
    'https://theofficeapi.dev/api/episodes?includeCharacters=true&limit=1&season=5'
  ).then((data) => [
    ...data.results[0].mainCharacters,
    ...data.results[0].supportingCharacters,
  ]);

  if (characters.length >= 15) {
    characters = characters.slice(0, 15);
  }

  return characters.map(({ id, name }) => {
    return { id, name };
  });
}
