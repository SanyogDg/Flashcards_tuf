import React, { useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Flashcard from './components/Flashcard/Flashcard';
import AdminDashboard from './components/Admindashboard/Admindashboard';
import Navbar from './components/Navbar/Navbar';


function App() {

  
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Flashcard/>} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
