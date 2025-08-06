import React, { useState } from 'react';
import NavBar from './components/NavBar';


function Login() {

  const [userLogin, setUserLogin] = useState(false);

  const [inputs, setInputs] = useState({

    username: '',

    password: '',

    rememberMe: false

  });


  const handleChange = (event) => {

    const { name, value, type, checked } = event.target;

    setInputs((prev) => ({

      ...prev,

      [name]: type === 'checkbox' ? checked : value

    }));

  };

  const handleSubmit = (event) => {

    event.preventDefault();

    if (inputs.username && inputs.password) {

      setUserLogin(true);

    }

  };

  const handleLogout = () => {

    setUserLogin(false);

    setInputs({ username: '', password: '', rememberMe: false });

  };



  return (

    <>

      <NavBar />

      <div className="container mt-4">

        {userLogin ? (

          <>

            <h2>Welcome, {inputs.username}!</h2>

            <button className="btn btn-secondary" onClick={handleLogout}>

              Logout

            </button>

          </>

        ) : (

          <div className="dropdown-menu show p-4" style={{ maxWidth: '400px' }}>

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

                />

                <label className="form-check-label" htmlFor="rememberMe">

                  Remember me

                </label>

              </div>

              <button type="submit" className="btn btn-primary">

                Sign in

              </button>

            </form>

            <div className="dropdown-divider mt-3"></div>

            <a className="dropdown-item" href="#">New around here? Sign up</a>

            <a className="dropdown-item" href="#">Forgot password?</a>

          </div>

        )}

      </div>

    </>

  );

}

export default Login;

//used from Bootstrap Dropdowns · Bootstrap to create login page