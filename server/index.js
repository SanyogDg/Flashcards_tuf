import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import 'dotenv/config'

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected!');
});

app.get('/api/flashcards', (req, res) => {
  db.query('SELECT * FROM flashcards', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a flashcard
app.post('/api/flashcards', (req, res) => {
  const { question, answer } = req.body;
  db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err, results) => {
    if (err) throw err;
    res.status(201).json({ id: results.insertId, question, answer });
  });
});
app.put('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  const sql = `UPDATE flashcards SET question = ?, answer = ? WHERE id = ?`;

  db.query(sql, [question, answer, id], (err, result) => {
      if (err) throw err;
      res.send('Flashcard updated successfully');
  });
});
// Delete a flashcard
app.delete('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM flashcards WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.status(204).end();
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
