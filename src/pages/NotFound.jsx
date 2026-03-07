import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ padding: '150px 20px', textAlign: 'center', color: 'white' }}>
      <h1 style={{ fontSize: '72px', color: '#07cf6b' }}>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you are looking for might have been removed or had its name changed.</p>
      <Link to="/" style={{ 
        display: 'inline-block', 
        marginTop: '20px', 
        padding: '10px 20px', 
        backgroundColor: '#07cf6b', 
        color: 'black', 
        textDecoration: 'none',
        borderRadius: '5px',
        fontWeight: 'bold'
      }}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;