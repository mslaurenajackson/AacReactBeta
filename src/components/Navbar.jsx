import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">AAC Device</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gullah">Gullah Dialect</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Keyboard">Keyboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Settings">Settings</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/UserSymbolPage">My Personal Page</Link>
              </li>
            <li className="nav-item">
              <Link className="nav-link" to="/SymbolBoard">My Symbols</Link>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


//used to go back and forth between pages
