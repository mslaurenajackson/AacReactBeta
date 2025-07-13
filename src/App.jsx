import React, {  useState } from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation
import './App.css'; // Import CSS style

const symbols = [
  { id: 1, text: 'more', video: "/more_voice.mp4" },
  { id: 2, text: 'drink', image: '/drink.png'},
  { id: 3, text: 'burger', image: '/burger.png' },
  { id: 4, text: 'swim', image: '/swim.png'},
  { id: 5, text: 'yes', video: '/yes.mp4' },
  { id: 6, text: 'no', video: '/no.mp4'},
  { id: 7, text: 'like', image: '/like.png'},
  { id: 8, text: 'I', image: '/I.png'},
  { id: 9, text: 'help', video: '/help.mp4'},
  { id: 10, text: 'pee', image: '/peePecs.png'},
  { id: 11, text: 'sleep', video: '/sleep.mp4'},
  { id: 12, text: 'eat', image: '/eat.jpg'},
  { id: 13, text: 'are', image: '/are.jpg'},
  { id: 14, text: 'went', image: '/went.jpg'},
];

function App() {
  const [sentence, setSentence, setCommunication] = useState([]);

  const handleSymbolClick = (symbol) => {
    setSentence((prev) => [...prev, symbol.text]);

    const utterance = new SpeechSynthesisUtterance(symbol.text);
    speechSynthesis.speak(utterance);
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(sentence.join(' '));
    speechSynthesis.speak(utterance);
  };
  
  const handleSpaceBar = () => {
    setCommunication((prev) => [...prev, ' ']); // Add a space to the commincation area
  };
  
  return (
    <>
      <div className="dashboard">
      <div className="output-area">{sentence.join(' ')}</div>
      <div className="btn btn-primary" onClick={handleSpeak}>
      <button
      onClick={() => handleSymbolClick(symbols)}
      style={{
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Speak
    </button></div>
    {symbols.image && (
                <img src={symbols.image} alt={symbols.text} className="card-img-top" />
              )}
              {symbols.video && (
                <video src={symbols.video} className="card-img-top" controls />
              )}
              <div className="card-body">
                <p className="card-text fw-bold">{symbols.text}</p>
              </div>
      <div>
    )
    <button
  onClick={handleSpaceBar}
  style={{
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid #999',
    borderRadius: '5px',
    cursor: 'pointer',
  }}
>
  Space Bar
</button>

  </div>
        <div className="symbol-grid">
          {symbols.map((symbol) => (
            <div key={symbol.id} className="symbol" onTouchStart={() => handleSymbolClick(symbol)}>
              {symbol.image && <img src={symbol.image} alt={symbol.text} />}
              {symbol.video && <video src={symbol.video} controls />}
              <p>{symbol.text}</p>
            </div>
          ))}
        </div>

  <div><Link to="/Keyboard" className="Keyboard">Open Keyboard</Link></div>
        
        <div className="settings-symbol" style={{ position: 'absolute', top: '10px', right: '10px' }}>
         <button> <img src="/settings.jpg" alt="Settings" /></button>
          <p>Settings</p>
        </div>
        <footer className="watermark">
  © {new Date().getFullYear()} Lauren A. Jackson M.S. CCC-SLP
</footer>

      </div>
    </>
  );
};

export default App;