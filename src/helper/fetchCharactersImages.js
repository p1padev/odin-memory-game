import fetchHelper from './fetchHelper';

const secretnotsosecret = '1VMZxqfg2m1PgnZWBruc2sDb7RtXXfCH';

export default async function fetchCharactersImages(characters) {
  const charactersWithImages = await Promise.all(
    characters.map(async (character) => {
      const characterQueryName = character.name.replace(' ', '+');
      const queryString = `https://api.giphy.com/v1/gifs/search?api_key=${secretnotsosecret}&q=${characterQueryName}&limit=1`;
      const query = await fetchHelper(queryString).then(
        (response) => response.data
      );
      const imagePath = query[0]?.images?.fixed_width?.url;
      return { ...character, imageURL: imagePath };
    })
  );
  return charactersWithImages;
}
