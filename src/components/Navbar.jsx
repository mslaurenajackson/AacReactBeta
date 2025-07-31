import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchSymbols } from '../utils/symbolsAPI'; // Ensure this matches the export in symbolsAPI.jsx

function Navbar() {
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        try {
            const symbols = await fetchSymbols(query); // Use the query state
            console.log('Fetched symbols:', symbols);
        } catch (error) {
            console.error('Error fetching symbols:', error);
        }
    };

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
                            <Link className="nav-link" to="/SymbolBoard">Symbol Search</Link>
                        </li>
                    </ul>
                    {/* Add a search bar and button */}
                    <div className="d-flex ms-3">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Search symbols"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)} // Update query state
                        />
                        <button className="btn btn-outline-success" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

//used to go back and forth between pages
