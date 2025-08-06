// 1) Fetch the access token
export async function getAccessToken() {
  const apiKey ='be7494b1c6a4dd60ae169f30'; // Use a proxy if needed
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; //proxy used to fix CORS error message

  //console.log('API Key:', apiKey);//REMOVE ME - Used for testing purposes only

  if (!apiKey) {
    throw new Error('API key is missing.');
  }

  const res = await fetch(proxyUrl + `https://api.opensymbols.com/v2/token?apikey=${apiKey}`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Token fetch failed: ${res.status} - ${errorText}`);
  }

  const { accessToken } = await res.json();
  return accessToken;
}

// 2) Fetch symbols using the v2 search endpoint
export async function fetchSymbols(term) {
  const studioId = 'public';
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

  if (!studioId) {
    throw new Error('Studio ID is missing');
  }

  const token = await getAccessToken();

  const res = await fetch(
   proxyUrl + `https://api.opensymbols.com/v2/search/${studioId}?q=${encodeURIComponent(term)}`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Search failed: ${res.status} - ${errorText}`);
  }

  const { searchResults } = await res.json();
  return searchResults;
}

//Problem solved with the help of Sean. Needed correct API endpoint and token handling.