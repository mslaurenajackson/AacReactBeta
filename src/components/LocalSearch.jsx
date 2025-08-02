import { useEffect, useState } from 'react';
import Navbar from './NavBar'; 

const LocalSearch = () => {
  const [symbols, setSymbols] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSymbols, setFilteredSymbols] = useState([]);

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const response = await fetch('/data/manifest.json');
        const data = await response.json();
        setSymbols(data.symbols || []);
        setFilteredSymbols(data.symbols || []); // default view shows all
      } catch (error) {
        console.error('Failed to load local symbols:', error);
      }
    };

    fetchSymbols();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = symbols.filter(symbol =>
      symbol.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSymbols(results);
  };

  return (
    <div className="symbol-board">
      <Navbar />

      <h2>Search Symbols</h2>
      <form onSubmit={handleSubmit} className="symbol-form" style={{ marginBottom: '20px' }}>
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search for a symbol…"
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit">Search</button>
      </form>

      <div style={{ padding: '20px' }}>
        <h3>My Custom Symbol Board</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {filteredSymbols.map((symbol) => (
            <div key={symbol.id} style={{ textAlign: 'center' }}>
              <img
                src={symbol.image_url}
                alt={symbol.name}
                style={{ width: '100px', height: '100px', objectFit: 'contain' }}
              />
              <p>{symbol.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocalSearch;
