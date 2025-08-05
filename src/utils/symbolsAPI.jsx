// 1) Fetch the access token
export async function getAccessToken() {
  const apiURL = 'https://api.opensymbols.com/v1/token?apikey=temp::2025-08-02:1754147566:e88398e55e29fe44ab95263f:b41b39422b7463b97c3be2a2a770284c7a653a5926e1414ff68c13639fbc26d6cbecf727eb5303b71914351400d7db42239f8a8fa865ae8e780d631dc5c79ce2';

  const proxyUrl ='https://cors-anywhere.herokuapp.com/'; // Use a proxy if needed

  //console.log('API Key:', apiKey);//REMOVE ME - Used for testing purposes only

  if (!apiURL) {
    throw new Error('API key is missing. Please set VITE_OPENSYMBOLS_API_KEY in your .env file.');
  }

  const res = await fetch(proxyUrl + apiURL);
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
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Add this line

  if (!studioId) {
    throw new Error('Studio ID is missing. Please set VITE_OPENSYMBOLS_STUDIO_ID in your .env file.');
  }

  const token = await getAccessToken();

  const res = await fetch(
    proxyUrl + `https://api.opensymbols.com/v2/search/${studioId}?q=${encodeURIComponent(term)}`, // ✅ Add proxy here
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

//The CORS are blocked by the OpenSymbols API, so I took suggestion from ChatGPT and updated the proxy in vite.config.js. Now I am going to reach out directly to OpenSymbols to request a secret key for dev purposes only- not for release at this time.