import React, { useState } from 'react';
import Navbar from './components/NavBar';
import SymbolSearch from './SymbolSearch'; 
import { fetchSymbols } from './utils/symbolsAPI';  // API in utils/symbolsApi.js

 function SymbolBoard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [symbols, setSymbols]      = useState([]);
  const [loading, setLoading]      = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    setLoading(true);
    try {
      const results = await fetchSymbols(searchTerm);
      setSymbols(results);
    } catch (err) {
      console.error('Error fetching symbols:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (symbol) => {
    console.log('Selected symbol:', symbol);
    // Define onSelect locally
  };
  

  return (
    <div className="symbol-board">
      <Navbar />

      <h2>Search Symbols</h2>
      <form onSubmit={handleSubmit} className="symbol-form">
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search for a symbol…"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading…</p>}

      <div className="symbol-grid">
        {symbols.map(sym => (
        <img
        key={sym.id}
        src={sym.attachments[0]?.previewUrl || 'fallback-image.jpg'}
        alt={sym.keyword || 'No keyword'}
        onClick={() => handleSelect(sym)}
        className="symbol-thumb"
      />
        
        ))}
      </div>
    </div>
  );
}

export default SymbolBoard;
