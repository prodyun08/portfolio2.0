// src/pages/Login.jsx
import React from 'react';
import { supabase } from '../supabaseClient';
import styles from '../moduledotcss/Login.module.css';
import githubIcon from '../assets/github-repo.svg'; // Renamed for clarity

const Login = () => {
  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin + '/dashboard',
      },
    });

    if (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className={styles.LoginPage}>
      <h2>Admin Login</h2>
      <button onClick={handleGitHubLogin} className={styles.loginButton}>
        {/* Use an img tag for the SVG */}
        <img src={githubIcon} alt="GitHub" className={styles.icon} />
        <span>Login with GitHub</span>
      </button>
    </div>
  );
};

export default Login;