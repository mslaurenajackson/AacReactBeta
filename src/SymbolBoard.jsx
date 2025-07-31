import React, { useState } from 'react';
import './SymbolBoard.css';

const SymbolBoard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [symbols, setSymbols] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_OPENSYMBOLS_API_KEY;

  const fetchSymbols = async () => {
    if (!searchTerm) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.opensymbols.org/api/v1/symbols/search?q=${encodeURIComponent(
          searchTerm
        )}&apikey=${apiKey}`
      );
      const data = await response.json();
      setSymbols(data.symbols || []);
    } catch (error) {
      console.error('Error fetching symbols:', error);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSymbols();
  };

  return (
    <div className="symbol-board">
      <h2>Search Symbols</h2>
      <form onSubmit={handleSubmit} className="symbol-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a symbol..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      <div className="symbol-grid">
        {symbols.map((symbol) => (
          <SymbolCard key={symbol.id} symbol={symbol} />
        ))}
      </div>
    </div>
  );
};

export default SymbolBoard;
