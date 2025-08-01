import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import HomePage from './HomePage';
import Keyboard from './Keyboard';
import Settings from './Settings';
import UserSymbolPage from './UserSymbolPage';
import SymbolSearch from './SymbolSearch';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/Keyboard" element={<Keyboard />} />
    <Route path="/Gullah" element={<App />} />
    <Route path='/Settings' element={<Settings />} />
    <Route path="/UserSymbolPage" element={<UserSymbolPage />} />
    <Route path="/SymbolSearch" element={<SymbolSearch />} />
    <Route
  path="/Settings"
  element={
    <Settings
      isOpen={true}
      onClose={() => {}}
      onThemeChange={() => {}}
      onFontSizeChange={() => {}}
      onImageUpload={() => {}}
    />
  }
/>

    </Routes>
  </BrowserRouter>
);

//added isOpen prop to Settings route to avoid error
