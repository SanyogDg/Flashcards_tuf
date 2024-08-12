import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Create a CSS file for styling the login page

const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post('http://localhost:5000/api/login', { username, password })
      .then(response => {
        localStorage.setItem('token', response.data.token); // Store token in localStorage
        setAuthenticated(true); // Update auth state
      })
      .catch(error => console.error('Login error:', error));
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
