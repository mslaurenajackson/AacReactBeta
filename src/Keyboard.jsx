import { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Import CSS style


const playSound = (letter) => {
  const sound = ({
    src: [`https://api.voicerss.org/?key=YOUR_API_KEY&hl=en-us&src=${letter}`],
    format: ['mp3'],
  });
  sound.play();
};

function Keyboard() {
  const [draggedLetter, setDraggedLetter] = useState("");
  const [communication, setCommunication] = useState([]);

  // used nested arrays to immulate a keyboard layout
  const keyboardRows = [
                      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,],
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
               ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '?']
  ];
  const handleDragStart = (letter) => {
    setDraggedLetter(letter);
  };

  const handleDrop = () => {
    if (draggedLetter) {
      setCommunication((prev) => [...prev, draggedLetter]);
      setDraggedLetter("");
    }
  };

  const handleSpeak = () => {
    const sentence = communication.join("");
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.onend = () => { //clears the communication area after speaking
      setCommunication([]);
    };
    speechSynthesis.speak(utterance);
  };

  const handleSpaceBar = () => {
    setCommunication((prev) => [...prev, " "]); // Add a space to the commincation area
  };

  const handleDelete = (symbolToDelete) => {
    setCommunication((prev) =>
      prev.filter((symbol) => symbol == symbolToDelete) //fixed the delete function to remove the accidental !
    );
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          minHeight: "100vh",
          padding: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <h1 style={{ textAlign: "center", color: "black", }}>AAC Board</h1>

        <div className="keyboard">
          {keyboardRows.map((row, rowIndex) => (
            <div key={rowIndex} className="keyboard-row">
              {row.map((letter) => (
                <button
                  key={letter}
                  draggable
                  onDragStart={() => handleDragStart(letter)}
                  onClick={() => {
                    playSound(letter);
                    setCommunication((prev) => [...prev, letter]);
                  }}
                  style={{
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid black",
                    backgroundColor: "darkgray",
                    fontSize: "20px",
                    fontWeight: "bold",
                    textShadowColor: 'black', //Outline color
                    textShadowOffset: { width: 2, height: 2 },
                    textShadowRadius: 1, //Outline radius
                  }}
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
          style={{
            backgroundColor: "white",
            border: "2px solid #999",
            borderRadius: "10px",
            padding: "20px",
            minHeight: "100px",
            marginTop: "20px",
            width: "80%",
            maxWidth: "800px",
            boxSizing: "border-box",
            textAlign: "center",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          {communication.map((letter, index) => (
            <span key={index} style={{ margin: "5px", fontSize: "1.5em" }}>
              {letter}
            </span>
          ))}
        </div>

        <button
          onClick={handleSpeak}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Speak
        </button>

        <button
          onClick={handleSpaceBar}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "white",
            color: "black",
            border: "1px solid #999",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Space Bar
        </button>

        <button
          onClick={handleDelete}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
        <div><Link to="/App.jsx" className="App">Open AAC Symbol Board</Link></div>
        <footer className="watermark">
  © {new Date().getFullYear()} Lauren A. Jackson M.S. CCC-SLP | AAC Prototype
</footer>
      </div>
    </>
  );
}

export default Keyboard;

//Dedicated to my grandmother Matilda White, who had a stroke in 1993. Dedicated in memory of my mother,Alethea W. Jackson, 1944-2025