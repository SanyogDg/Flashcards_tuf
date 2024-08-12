import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const changest = () => {
    setShow(!show);
  }
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className='navbar-brand'>
        Flashcard App
        </Link>
      </div>
      <div className="navbar-links">
        {!show && 
      <Link to="/">
          <button className="dashboard-btn"onClick={changest}>See Flashcards</button>
        </Link>
        }
        {
          show && 
        <Link to="/dashboard">
          <button className="dashboard-btn" onClick={changest}>Enter Dashboard</button>
        </Link>
        }
      </div>
    </nav>
  );
};

export default Navbar;
