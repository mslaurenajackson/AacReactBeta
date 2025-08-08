import React, { useState } from 'react';
import Navbar from './components/NavBar';

function UserSymbolPage() {
  const [mySymbols, setMySymbols] = useState([]);

  return (
    <>
    <Navbar />
    <div className= "user-symbol-page">
      <h2>My Symbols</h2>
      <SymbolSearch onSelect={(s) => setMySymbols((prev) => [...prev, s])} />

      <div className="user-symbol-grid">
        {mySymbols.map((s, i) => (
          <div key={s.id + '-' + i} className="user-symbol-cell">
            <img src={s.image_url} alt={s.keyword} />
            <p>{s.keyword}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
export default UserSymbolPage;
