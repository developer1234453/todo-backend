const express = require('express');
const cors = require('cors');
const db = require('./database');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import route handlers
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

// Use routes
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
