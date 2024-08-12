import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className='navbar-brand'>
        Flashcard App
        </Link>
      </div>
      <div className="navbar-links">
      <Link to="/">
          <button className="dashboard-btn">See Flashcards</button>
        </Link>
        <Link to="/dashboard">
          <button className="dashboard-btn">Enter Dashboard</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
