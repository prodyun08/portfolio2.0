import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    
    // Temporary local password
    const TEMP_PASSWORD = "admin123"; 

    if (password === TEMP_PASSWORD) {
      // Set a local flag so the dashboard knows we are "logged in"
      localStorage.setItem('isLocalAuth', 'true');
      navigate('/dashboard');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div style={{ padding: '100px', textAlign: 'center', color: 'white' }}>
      <h2>Admin Login (Local)</h2>
      <p style={{ color: '#888', marginBottom: '20px' }}>
        Enter password to access the Blog Dashboard.
      </p>
      
      <form onSubmit={handlePasswordLogin}>
        <input 
          type="password" 
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ 
            padding: '10px', 
            borderRadius: '5px', 
            border: '1px solid #555', 
            marginBottom: '10px',
            width: '250px' 
          }}
        />
        <br />
        <button 
          type="submit"
          style={{ 
            padding: '10px 20px', 
            fontSize: '18px', 
            cursor: 'pointer', 
            backgroundColor: '#07cf6b', 
            color: 'black', 
            border: 'none',
            borderRadius: '5px' 
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;










// This below code is when i use the github login system. 
/*
import React from 'react';
import { supabase } from '../supabaseClient';

const Login = () => {
  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        // This redirects the user back to your dashboard after they log in
        redirectTo: window.location.origin + '/dashboard',
      },
    });

    if (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '100px', textAlign: 'center', color: 'white' }}>
      <h2>Admin Login</h2>
      <p style={{ color: '#888', marginBottom: '20px' }}>
        Login with GitHub to access the Blog Dashboard.
      </p>
      <button 
        onClick={handleGitHubLogin} 
        style={{ 
          padding: '10px 20px', 
          fontSize: '18px', 
          cursor: 'pointer', 
          backgroundColor: '#333', 
          color: 'white', 
          border: '1px solid #555',
          borderRadius: '5px' 
        }}
      >
        <i className="ri-github-fill" style={{ marginRight: '8px' }}></i>
        Login with GitHub
      </button>
    </div>
  );
};

export default Login;

*/