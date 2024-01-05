import React, { useCallback, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('kminchelle');
  const [password, setPassword] = useState('0lelplR');
  const [error, setError] = useState('');

  const handleLogin = useCallback(async () => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });     
      if (!response.ok) {
        setError('Invalid credentials. Please try again.');
        return;
      }
      const data = await response.json();
      const token = data.token;
      // Save the token
      localStorage.setItem('token', token);
      // Redirect to the home page
      navigate('/home');
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login. Please try again.');
    }
  }, [username, password]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-8 rounded shadow-md">
        <h1 className="text-2xl mb-4">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <label className="block mb-2">
          Username:
          <input
            type="text"
            className="w-full border rounded py-1 px-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            type="password"
            className="w-full border rounded py-1 px-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default memo(Login);
