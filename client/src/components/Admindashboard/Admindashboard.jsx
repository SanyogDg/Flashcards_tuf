import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const AdminDashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/api/flashcards')
      .then(response => {
        setFlashcards(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleAddFlashcard = () => {
    setLoading(true);
    axios.post('http://localhost:5000/api/flashcards', { question: newQuestion, answer: newAnswer })
      .then(response => {
        setFlashcards([...flashcards, response.data]); // Ensure the newly added flashcard includes the id from the response
        setNewQuestion('');
        setNewAnswer('');
        alert('Flashcard added successfully!');
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  const handleEditFlashcard = (flashcard) => {
    setEditMode(true);
    setNewQuestion(flashcard.question);
    setNewAnswer(flashcard.answer);
    setCurrentCardId(flashcard.id);
  };

  const handleUpdateFlashcard = () => {
    if (!currentCardId) return; // Ensure there's a card to update
  
    setLoading(true);
    axios.put(`http://localhost:5000/api/flashcards/${currentCardId}`, { question: newQuestion, answer: newAnswer })
      .then(response => {
        const updatedFlashcards = flashcards.map(f =>
          f.id === currentCardId
            ? { ...f, question: newQuestion, answer: newAnswer }
            : f
        );
        setFlashcards(updatedFlashcards);
        setNewQuestion('');
        setNewAnswer('');
        setEditMode(false);
        setCurrentCardId(null);
        alert('Update Successful!');
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  const handleDeleteFlashcard = (id) => {
    if (!id) return; // Ensure the id exists
    const confirmDelete = window.confirm("Are you sure you want to delete this flashcard?");
    if (confirmDelete) {
      setLoading(true);
      axios.delete(`http://localhost:5000/api/flashcards/${id}`)
        .then(() => setFlashcards(flashcards.filter(f => f.id !== id)))
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className='container'>
      {loading ? (
        <div className='loaderhead'>
          <div className='loader'></div>
          <div className='loadertext'>Loading...</div>
        </div>
      ) : (
        <>
          <h1>Welcome to Admin Dashboard</h1>
          <div className='inp'>
            <h2>{editMode ? 'Edit Flashcard' : 'Add a new Flashcard'}</h2>
            <input
              type="text"
              placeholder="Add Question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <input
              type="text"
              placeholder="Answer"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            />
            <button onClick={editMode ? handleUpdateFlashcard : handleAddFlashcard} className='add'>
              {editMode ? 'Update' : 'Add'}
            </button>
          </div>
          <div>
            <h2>Existing Flashcards</h2>
            {flashcards.map(flashcard => (
              <div key={flashcard.id} className='existcss'>
                <p>
                  <span className='question-label'>Question:</span> <span className='question'>{flashcard.question}</span><br />
                  <span className='question-label'>Answer:</span> <span className='answer'>{flashcard.answer}</span>
                </p>
                <div>
                  <button onClick={() => handleEditFlashcard(flashcard)}>Edit</button>
                  <button onClick={() => handleDeleteFlashcard(flashcard.id)} className='del'>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
