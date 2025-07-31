import React, {  useState } from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation
import './App.css'; // Import CSS style
import Navbar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';


const symbols = [
  { id: 1, text: 'yes', video: '/yes.mp4' },
  { id: 2, text: 'drink', image: '/drink.png'},
  { id: 3, text: 'burger', image: '/burger.png' },
  { id: 4, text: 'swim', image: '/swim.png'},
  { id: 5, text: 'more', video: '/more.mp4' },
  { id: 6, text: 'no', video: '/no.mp4'},
  { id: 7, text: 'like', image: '/like.png'},
  { id: 8, text: 'I', image: '/I.png'},
  { id: 9, text: 'help', video: '/help.mp4'},
  { id: 10, text: 'pee', image: '/peePecs.png'},
  { id: 11, text: 'sleep', video: '/sleep.mp4'},
  { id: 12, text: 'eat', image: '/eat.jpg'},
  { id: 13, text: 'are', image: '/are.jpg'},
  { id: 14, text: 'went', image: '/went.jpg'},
  {id: 15, text: 'give', image: '/give.jpg'},
];

function App() {
  const [sentence, setSentence] = useState([]);

  const handleSymbolClick = (symbols) => {
    setSentence((prev) => [...prev, symbols.text]);

    const sentence = new SpeechSynthesisUtterance(symbols.text);
    speechSynthesis.speak(sentence);
  };

  const handleTalk = () => {
    const utterance = new SpeechSynthesisUtterance(sentence.join(' '));
    speechSynthesis.speak(utterance);
  };

  const handleClear = () => {
    setSentence([]);
  };

  return (
    <div className="container py-4">
      <Navbar /> {/* Add the Navbar component here */}
      <h1 className="text-center mb-4">AAC Device</h1>
  
      <div className="row g-3">
        {symbols.map((symbols) => (
          <div className="col-6 col-md-3" key={symbols.id}>
            <div
              className="card text-center h-100 shadow-sm"
              onClick={() => handleSymbolClick(symbols)}
              style={{ cursor: 'pointer' }}
            >
              {symbols.image && (
                <img src={symbols.image} alt={symbols.text} className="card-img-top" />
              )}
              {symbols.video && (
                <video src={symbols.video} className="card-img-top" controls />
              )}
              <div className="card-body">
                <p className="card-text fw-bold">{symbols.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
  
      <div className="mt-4">
        <h5>Sentence:</h5>
        <div className="p-3 border bg-light rounded">{sentence.join(' ')}</div>
  
        <div className="mt-3 d-flex gap-3">
          <button className="btn btn-primary" onClick={handleTalk}>
            <img src="Speak_Button.png" alt="Speak" style={{ width: '24px', marginRight: '8px' }} />
            Speak
          </button>
          <button className="btn btn-outline-danger" onClick={handleClear}>
            Clear
          </button>
          <button className="btn btn-secondary" onClick={() => setSentence([])}>
            <img src="settings.jpg" alt="Settings" style={{ width: '24px', marginRight: '8px' }} />
            Settings
          </button>
        </div>
      </div>
      <footer className="watermark">
        <div>
          <Link to="/Keyboard" className="btn btn-primary">
            Open Keyboard
          </Link>
        </div>
        © {new Date().getFullYear()} Lauren A. Jackson M.S. CCC-SLP
      </footer>
    </div>
  );
}


export default App;

//Dedicated to my grandmother Matilda White, who had a stroke in 1993. Dedicated in memory of my mother,Alethea W. Jackson, 1944-2025