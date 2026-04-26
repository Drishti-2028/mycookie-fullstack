import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <header>
        <Navbar />
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            My<span>Cookie</span>
          </div>
          <p className="footer-tagline">Freshly baked, handcrafted, and delivered with love.</p>
          <p className="footer-copy">© {new Date().getFullYear()} MyCookie. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;