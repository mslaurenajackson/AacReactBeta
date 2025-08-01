import React, { useState } from 'react';
import axios from 'axios';

function SymbolSearch({ onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const tokenRes = await axios.get('/api/symbols/token');
      const token = tokenRes.data.access_token;

      const studioId = 'public'; // I did some homework and this is the studio ID for public symbols
      const symRes = await axios.get(`https://api.opensymbols.com/v2/search/${studioId}`, {
        params: { q: query },
        headers: { Authorization: `Bearer ${token}` }
      });

      setResults(symRes.data.searchResults || []);
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
              src={sym.attachments[0]?.previewUrl || 'Lost_in_Space.png'}
              alt={sym.keyword || 'symbol'}
              className="symbol-thumb"
              onClick={() => onSelect(sym)} // ✅ added callback for selection
            />
          ))
        )}
      </div>
    </div>
  );
}

export default SymbolSearch;
