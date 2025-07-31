import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const symbols = [ 
  { id: 1, text: 'Gullah Dialect', image: 'Gullah_File.jpg' },
  { id: 2, text: 'Collard Greens', image: 'collardGreens.png' },
  { id: 3, text: 'grits', image: 'grits.png' },
  { id: 4, text: 'yes', video: 'yes.mp4' },
  { id: 5, text: 'no', video: 'no.mp4' },
  { id: 6, text: 'hello', image: 'Hello.jpg' },
  { id: 7, text: 'More', video: 'more.mp4' },
  { id: 8, text: 'Bye', image: 'Hello.jpg' },
  { id: 9, text: 'Hoppin John', image: 'hppinJohn.png' },
  { id: 10, text: 'Help', video: 'help.mp4' },
  { id: 11, text: 'gumbo', image: 'Gumbo.jpg' },
  { id: 12, text: 'cornbread', image: 'cornbread.png' },
  { id: 13, text: 'Thank you', video: 'thank_you_emoji.mp4' },
  { id: 14, text: 'I love you', image: 'lluvU.jpg' },
  { id: 15, text: 'Please braid my hair', image: 'braid.jpg' },
  { id: 16, text: 'Truly blessed and highly favored', image: 'TbHF.jpg' },
  { id: 17, text: 'YouTube Gospel Music', image: 'YouTube.png' },
];

function App() {
  const [sentence, setSentence] = useState([]);

  const handleSymbolClick = (symbol) => {
    if (symbol.text === 'Gullah Dialect' || symbol.text === 'YouTube Gospel Music') return;
    setSentence((prev) => [...prev, symbol.text]);
    const utterance = new SpeechSynthesisUtterance(symbol.text);
    speechSynthesis.speak(utterance);
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(sentence.join(' '));
    speechSynthesis.speak(utterance);
  };

  const handleClear = () => {
    setSentence([]);
  };

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <h1 className="text-center mb-4">AAC Device</h1>
  
        <div className="row g-3">
          {symbols.map((symbol) => (
            <div className="col-6 col-md-3" key={symbol.id}>
              <div
                className="card text-center h-100 shadow-sm"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSymbolClick(symbol)}
              >
                {symbol.text === 'YouTube Gospel Music' ? (
                  <a
                    href="https://www.youtube.com/results?search_query=gospel+music"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={symbol.image}
                      alt={symbol.text}
                      className="card-img-top"
                    />
                  </a>
                ) : (
                  <>
                    {symbol.image && (
                      <img
                        src={symbol.image}
                        alt={symbol.text}
                        className="card-img-top"
                      />
                    )}
                    {symbol.video && (
                      <video
                        src={symbol.video}
                        className="card-img-top"
                        controls
                      />
                    )}
                  </>
                )}
                <div className="card-body">
                  <p className="card-text fw-bold">{symbol.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        <div className="mt-4">
          <h5>Sentence:</h5>
          <div className="p-3 border bg-light rounded">
            {sentence.join(' ')}
          </div>
  
          <div className="mt-3 d-flex gap-3 flex-wrap">
            <button className="btn btn-primary" onClick={handleSpeak}>
              Speak
            </button>
            <button className="btn btn-light border border-dark text-dark" onClick={handleClear}>
              Clear
            </button>
            <Link to="/Settings" className="btn btn-secondary d-flex align-items-center">
              <button
                className="btn btn-secondary"
                onClick={() => setSentence([])}
              >
                <img
                  src="settings.jpg"
                  alt="Settings"
                  style={{ width: '24px', marginRight: '8px' }}
                />
                Settings
              </button>
            </Link>
          </div>
        </div>
  
        <footer className="watermark mt-5 text-center">
          © {new Date().getFullYear()} Lauren A. Jackson M.S. CCC-SLP
        </footer>
      </div>
    </>
  );
}

export default App;


//Dedicated in loving memory of my mother Alethea W. Jackson, and my grandmother Matilda White. Thank you to my family for keeping Gullah culture and morals instilled in me that I hold near an dear as an adult.
