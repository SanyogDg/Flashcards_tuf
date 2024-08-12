import React, { useEffect, useState } from 'react';
import './Flashcard.css';
import { GrFormPrevious } from "react-icons/gr";
import axios from 'axios';
import { MdOutlineNavigateNext } from "react-icons/md";

const Flashcard = () => {
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const handleFlip = () => setFlipped(!flipped);
  const handlePrev = () => {
    setFlipped(false);
    setCurrentIndex(currentIndex === 0 ? flashcards.length - 1 : currentIndex - 1);
  };
  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((currentIndex + 1) % flashcards.length);
  };
  
  // Fetch flashcards from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/flashcards')
      .then(response => {
        setFlashcards(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const { question, answer } = flashcards[currentIndex] || { question: '', answer: '' };

  return (
    <div className='containers'>
      {loading ? (
        <div className='loaderhead'>
        <div className='loader'></div>
        <div className='loadertext'>Loading...</div>
        </div>
      ) : (
        <>
          <h1 className='heading'>Learning made easy!</h1>
          <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className='flashcard-inner'>
              <div className='flashcard-front'>
                <h3>{question}</h3>
                <p>Click to reveal answer..</p>
              </div>
              <div className='flashcard-back'>
                <h3>{answer}</h3>
                <p>Click to know Question.</p>
              </div>
            </div>
          </div>
          <div className='navigation'>
            <button onClick={handlePrev} disabled={currentIndex === 0} className='btn'>
              <GrFormPrevious /> Previous
            </button>
            <button onClick={handleNext} disabled={currentIndex === flashcards.length - 1} className='btn'>
              Next <MdOutlineNavigateNext />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Flashcard;
