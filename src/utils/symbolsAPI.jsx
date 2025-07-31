// 1) Fetch the access token
export async function getAccessToken() {
  const apiKey = import.meta.env.VITE_OPENSYMBOLS_API_KEY;

  if (!apiKey) {
    throw new Error('API key is missing. Please set VITE_OPENSYMBOLS_API_KEY in your .env file.');
  }

  const res = await fetch(`https://api.opensymbols.com/v1/token?apikey=${apiKey}`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Token fetch failed: ${res.status} - ${errorText}`);
  }

  const { accessToken } = await res.json();
  return accessToken;
}

// 2) Fetch symbols using the v2 search endpoint
export async function fetchSymbols(term) {
  const studioId = import.meta.env.VITE_OPENSYMBOLS_STUDIO_ID;

  if (!studioId) {
    throw new Error('Studio ID is missing. Please set VITE_OPENSYMBOLS_STUDIO_ID in your .env file.');
  }

  const token = await getAccessToken();

  const res = await fetch(
    `https://api.opensymbols.com/v2/search/${studioId}?q=${encodeURIComponent(term)}`,
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