import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function Navbar() {
    // Define the signOut function inside the component
    const signOut = () => {
        // Clear any stored authentication tokens/session data
        localStorage.removeItem('authToken');
        sessionStorage.clear();
        
        // Redirect to login page or home
        window.location.href = '/Login';
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
                            <Link className="nav-link" to="/Login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/App">Gullah Dialect</Link>
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
                            <Link className="nav-link" to="/LocalSearch">Symbol Search</Link>
                        </li>
                        <li className="nav-item">
                            <button 
                                class="btn btn-warning"
                                className="nav-link btn btn-link" 
                                onClick={signOut}
                                style={{ border: 'none', background: 'gray', color: 'inherit' }}
                            >
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

//used to go back and forth between pages