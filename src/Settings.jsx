import React, { useRef, useState } from 'react';
import './Settings.css';
import Navbar from './components/NavBar'; 
import { useNavigate } from 'react-router-dom';


const Settings = ({ onThemeChange, onFontSizeChange, onImageUpload }) => {
  const fileInputRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('16');

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const navigate = useNavigate();


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  const toggleDarkMode = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    if (onThemeChange) onThemeChange(newTheme);
  };

  const handleFontSizeChange = (e) => {
    const size = e.target.value;
    setFontSize(size);
    if (onFontSizeChange) onFontSizeChange(size);
  };

  return (
    <>
    <div className="settings-menu">
      <button onClick={() => navigate('/')} className="close-btn">Close ✖</button>

      <ul>
        <li>
          <label>
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} /> Enable Dark Mode
          </label>
        </li>
        <li>
          <label>
            Font Size:
            <select value={fontSize} onChange={handleFontSizeChange}>
              <option value="14">Small</option>
              <option value="16">Medium</option>
              <option value="20">Large</option>
              <option value="24">Extra Large</option>
            </select>
          </label>
        </li>
        <li>
          <button onClick={handleImageClick}>Upload Photo</button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </li>
      </ul>
    </div>
    </>
  );
};

export default Settings;

