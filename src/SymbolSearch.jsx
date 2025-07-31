import React, { useState } from 'react';
import axios from 'axios';

function SymbolSearch({ onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const tokenRes = await axios.get('/api/symbols/token');
      const token = tokenRes.data.access_token;

      const symRes = await axios.get('https://www.opensymbols.org/api/v2/search', {
        params: { q: query },
        headers: { Authorization: `Bearer ${token}` }
      });

      setResults(symRes.data.symbols || []);
    } catch (e) {
      console.error('Search error', e);
    }
  };

  return (
    <div className="symbol-search">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search symbols"
      />
      <button onClick={handleSearch}>Search</button>

      <div className="symbol-results">
        {results.length === 0 ? (
          <p>No symbols found. Try a different search term.</p>
        ) : (
          results.map((sym) => (
            <img
              key={sym.id}
              src={sym.image_url || 'fallback-image-url.jpg'}
              alt={sym.keyword || 'No keyword'}
              onClick={() => onSelect(sym)}
              className="symbol-thumb"
            />
          ))
        )}
      </div>
    </div>
  );
}

export default SymbolSearch;