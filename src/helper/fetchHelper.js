export default async function fetchHelper(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
