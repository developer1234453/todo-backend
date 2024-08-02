const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize database connection
const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqlite'), (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Database connected');
  }
});

// Create Users table
db.run(`CREATE TABLE IF NOT EXISTS Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
  if (err) {
    console.error('Error creating Users table', err);
  } else {
    console.log('Users table created');
  }
});

// Create Todos table
db.run(`CREATE TABLE IF NOT EXISTS Todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  description TEXT NOT NULL,
  status INTEGER DEFAULT 0,
  userId INTEGER NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id)
)`, (err) => {
  if (err) {
    console.error('Error creating Todos table', err);
  } else {
    console.log('Todos table created');
  }
});

// Close database connection
db.close((err) => {
  if (err) {
    console.error('Error closing database', err);
  } else {
    console.log('Database connection closed');
  }
});
