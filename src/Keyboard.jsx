import { useState } from "react";
import { Howl } from "howler";
import './Keyboard.css';

const playSound = (letter) => {
  const sound = new Howl({
    src: [`https://api.voicerss.org/?key=YOUR_API_KEY&hl=en-us&src=${letter}`],
    format: ["mp3"],
  });
  sound.play();
};

function Keyboard() {
  const [draggedLetter, setDraggedLetter] = useState("");
  const [communication, setCommunication] = useState([]);

  const keyboardRows = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8,  9], 
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M", "?"],
  ];

  const handleDragStart = (letter) => setDraggedLetter(letter);

  const handleDrop = () => {
    if (draggedLetter) {
      setCommunication((prev) => [...prev, draggedLetter]);
      setDraggedLetter("");
    }
  };

  const handleSpeak = () => {
    const sentence = communication.join("");
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.onend = () => setCommunication([]);
    speechSynthesis.speak(utterance);
  };

  const handleSpaceBar = () => setCommunication((prev) => [...prev, " "]);

  const handleDelete = () => {
    setCommunication((prev) => prev.slice(0, -1)); // Removes the last symbol
  };

  return (
    <>
      <Navbar />
      <div className="keyboard-wrapper">
        <h1>AAC Board</h1>

        <div className="keyboard">
          {keyboardRows.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="keyboard-row"> 
              {row.map((letter, letterIndex) => (
                <button
                 key={`key-${rowIndex}-${letterIndex}-${letter}`} // Added letter to key to avoid duplicate keys
                  draggable
                  onDragStart={() => handleDragStart(letter)}
                  onClick={() => {
                    playSound(letter);
                    setCommunication((prev) => [...prev, letter]);
                  }}
                  className="keyboard-key"
                >
                  {letter}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div
          id="communication-area"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="communication-box"
        >
          {communication.map((letter, index) => (
            <span key={index} className="communication-letter">
              {letter}
            </span>
          ))}
        </div>

        <div className="control-buttons">
          <button onClick={handleSpeak} className="btn speak">Speak</button>
          <button onClick={handleSpaceBar} className="btn space">Space Bar</button>
          <button onClick={handleDelete} className="btn delete">Delete</button>
        </div>

        <footer className="watermark">
          © {new Date().getFullYear()} Lauren A. Jackson M.S. CCC-SLP | AAC Prototype
        </footer>
      </div>
    </>
  );
}

export default Keyboard;


///made a change to the props so that the browser does not show an error of duplicate numbers


//Dedicated to my grandmother Matilda White, who had a stroke in 1993. Dedicated in memory of my mother,Alethea W. Jackson, 1944-2025