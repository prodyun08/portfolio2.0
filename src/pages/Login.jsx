// src/pages/Login.jsx
import React from 'react';
import { supabase } from '../supabaseClient';

const Login = () => {
  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        // Redirect back to the dashboard after GitHub login
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
      <button onClick={handleGitHubLogin} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#333', color: 'white' }}>
        Login with GitHub
      </button>
    </div>
  );
};

export default Login;