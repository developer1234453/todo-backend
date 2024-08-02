const express = require('express');
const db = require('../database');
const authenticate = require('../middleware/authenticate'); // Create this middleware if needed

const router = express.Router();

// Create a new To-Do
router.post('/', authenticate, (req, res) => {
  const { description } = req.body;
  const userId = req.user.id;

  db.run('INSERT INTO Todos (description, userId) VALUES (?, ?)', [description, userId], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, description });
  });
});

// Get all To-Dos for logged-in user
router.get('/', authenticate, (req, res) => {
  const userId = req.user.id;

  db.all('SELECT * FROM Todos WHERE userId = ?', [userId], (err, todos) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(todos);
  });
});

// Update a To-Do
router.put('/:id', authenticate, (req, res) => {
  const { description, status } = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  db.run('UPDATE Todos SET description = ?, status = ? WHERE id = ? AND userId = ?', [description, status, id, userId], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'To-Do not found or unauthorized' });
    }
    res.json({ message: 'To-Do updated' });
  });
});

// Delete a To-Do
router.delete('/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  db.run('DELETE FROM Todos WHERE id = ? AND userId = ?', [id, userId], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'To-Do not found or unauthorized' });
    }
    res.json({ message: 'To-Do deleted' });
  });
});

module.exports = router;
