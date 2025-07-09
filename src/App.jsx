import React, {  useState } from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation
import Keyboard from './assets/keyboard.jsx';
import './App.css';

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

const App = () => {
  const [sentence, setSentence] = useState([]);

  const handleSymbolClick = (symbol) => {
    setSentence([...sentence, symbol.text]); // Used append the clicked symbol's text to the sentence array
    const utterance = new SpeechSynthesisUtterance(symbol.text);
    speechSynthesis.speak(utterance); // Play the associated sound
  
    if (symbol.text === 'more') {
      document.querySelector('.display').classList.add('animate-more');
      setTimeout(() => {
        document.querySelector('.display').classList.remove('animate-more');
      }, 1000);
    }
  };


  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(sentence.join(''));
    speechSynthesis.speak(utterance); //allows API to speak the sentence
    utterance.onend = () => { //clears the communication area after speaking
      setSentence([]);
  };
};

  const handleSpaceBar = () => {
    setSentence((prev) => [...prev, ' ']); // Add a space to the communication state
  };
  
  return (
    <>
      <div className="dashboard">
        <div className="symbol-grid">
          {symbols.map((symbol) => (
            <div key={symbol.id} className="symbol" onTouchStart={() => handleSymbolClick(symbol)}>
              {symbol.image && <img src={symbol.image} alt={symbol.text} />}
              {symbol.video && <video src={symbol.video} controls />}
              <p>{symbol.text}</p>
            </div>
          ))}
        </div>
<div>
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
        <div className="output-area">{sentence.join(' ')}</div>
        <button onClick={handleSpeak}>Speak</button>
        <Link to="/keyboard" className="keyboard-link">Open Keyboard</Link>
        <div className="settings-symbol" style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <img src="/aacDevice/public/settings.png" alt="Settings" />
          <p>Settings</p>
        </div>
        
      </div>
    </>
  );
};

export default App;