import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and Routes
import './index.css'
import App from './App.jsx'
import Keyboard from './Keyboard.jsx' // Import the Keyboard 
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/Keyboard" element={<Keyboard />} />
  </Routes>
</BrowserRouter>
)
