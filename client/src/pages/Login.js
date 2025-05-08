import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username) {
      localStorage.setItem('username', username);
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 border rounded mb-4"
      />
      <button 
        onClick={handleLogin}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Join
      </button>
    </div>
  );
};

export default Login;
