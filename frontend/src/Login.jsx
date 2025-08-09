import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import { supabase } from "./lib/supabase.js";


function Login() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');

  // Check if user is already logged in on component mount
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAuthLoading(true);
    setError('');

    if (!inputs.username || !inputs.password) {
      setError('Please fill in all fields');
      setAuthLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: inputs.username,
        password: inputs.password,
      });

      if (error) {
        setError(error.message);
      } else {
        // Success - user state will be updated by the auth listener
        setInputs({ username: '', password: '', rememberMe: false });
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    setAuthLoading(true);
    try {
      await supabase.auth.signOut();
      setInputs({ username: '', password: '', rememberMe: false });
    } catch (err) {
      setError('Error logging out');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!inputs.username || !inputs.password) {
      setError('Please fill in email and password to sign up');
      return;
    }

    setAuthLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email: inputs.username,
        password: inputs.password,
      });

      if (error) {
        setError(error.message);
      } else {
        setError('Check your email for the confirmation link!');
      }
    } catch (err) {
      setError('An unexpected error occurred during sign up');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!inputs.username) {
      setError('Please enter your email address first');
      return;
    }

    setAuthLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(inputs.username);
      
      if (error) {
        setError(error.message);
      } else {
        setError('Password reset email sent! Check your inbox.');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setAuthLoading(false);
    }
  };

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <>
        <NavBar />
        <div className="container mt-4 text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        {user ? (
          <>
            <h2>Welcome, {user.email}!</h2>
            <p>User ID: {user.id}</p>
            <button 
              className="btn btn-secondary" 
              onClick={handleLogout}
              disabled={authLoading}
            >
              {authLoading ? 'Logging out...' : 'Logout'}
            </button>
          </>
        ) : (
          <div className="dropdown-menu show p-4" style={{ maxWidth: '400px' }}>
            {error && (
              <div className={`alert ${error.includes('Check your email') || error.includes('Password reset') ? 'alert-info' : 'alert-danger'} mb-3`}>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="username">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="email@example.com"
                  value={inputs.username}
                  onChange={handleChange}
                  disabled={authLoading}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={inputs.password}
                  onChange={handleChange}
                  disabled={authLoading}
                />
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  name="rememberMe"
                  checked={inputs.rememberMe}
                  onChange={handleChange}
                  disabled={authLoading}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary w-100 mb-2"
                disabled={authLoading}
              >
                {authLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
            
            <div className="dropdown-divider mt-3"></div>
            
            <button 
              className="btn btn-link dropdown-item p-0" 
              onClick={handleSignUp}
              disabled={authLoading}
            >
              New around here? Sign up
            </button>
            
            <button 
              className="btn btn-link dropdown-item p-0" 
              onClick={handleForgotPassword}
              disabled={authLoading}
            >
              Forgot password?
            </button>
          </div>
        )}
        
        <footer className="watermark mt-5 text-center text-white position-absolute bottom-0 w-100">
          © {new Date().getFullYear()} Lauren A. Jackson M.S. CCC-SLP
        </footer>
      </div>
    </>
  );
}

export default Login;