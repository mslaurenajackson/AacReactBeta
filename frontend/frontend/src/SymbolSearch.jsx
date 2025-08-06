import { useState } from 'react';
import {fetchSymbols} from './utils/symbolsAPI'; // searches symbols from symbolAPI API utility
import saveBoard from './components/saveBoard';
import Navbar from './components/NavBar'; 


const SymbolSearch = () => {
  const [query, setQuery] = useState('');
  const [symbols, setSymbols] = useState([]);

  const searchSymbols = async () => {
    try {
      const results = await fetchSymbols(query);
        setSymbols(results || []);
    } catch (error) {
      console.error('Error fetching symbols:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h2>Search Symbols</h2>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Search symbols..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ marginRight: '10px', padding: '8px' }}
          />
          <button onClick={searchSymbols}>Search</button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          {symbols.map((symbol) => (
            <div key={symbol.id} style={{ textAlign: 'center' }}>
              <img
              src={symbol.image?.url}
              alt={symbol.name}
              style={{ width: '100px', height: '100px', objectFit: 'contain' }}
              />

              <p>{symbol.name}</p>
            </div>
          ))}
        </div>

        {symbols.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <button onClick={() => saveBoard(symbols)}>Save Board</button>
          </div>
        )}
         <footer className="watermark mt-5 text-center text-white">
          © {new Date().getFullYear()} Lauren A. Jackson M.S. CCC-SLP
        </footer>
      </div>
    </>
  );
};

export default SymbolSearch;

