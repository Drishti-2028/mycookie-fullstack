import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#e76f51', padding: '1rem', color: 'white', textAlign: 'center' }}>
      <h1>My Cookie 🍪</h1>
      <nav>
        <Link to="/" style={{ margin: '0 1rem', color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/about" style={{ margin: '0 1rem', color: 'white', textDecoration: 'none' }}>About</Link>
        <Link to="/menu" style={{ margin: '0 1rem', color: 'white', textDecoration: 'none' }}>Menu</Link>
        <Link to="/contact" style={{ margin: '0 1rem', color: 'white', textDecoration: 'none' }}>Contact</Link>
      </nav>
    </header>
  );
};

export default Header;
