const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = './data.json';

// Utility to read data
function readData() {
  const raw = fs.readFileSync(DATA_FILE);
  return JSON.parse(raw);
}

// Utility to write data
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Get all boards
app.get('/boards', (req, res) => {
  const data = readData();
  res.json(data.boards);
});

// Create a new board
app.post('/boards', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  
  const data = readData();
  const newBoard = {
    id: Date.now().toString(),
    title,
    lists: []
  };
  data.boards.push(newBoard);
  writeData(data);
  res.status(201).json(newBoard);
});

// Add a list to a board
app.post('/boards/:boardId/lists', (req, res) => {
  const { title } = req.body;
  const { boardId } = req.params;
  if (!title) return res.status(400).json({ error: 'Title required' });

  const data = readData();
  const board = data.boards.find(b => b.id === boardId);
  if (!board) return res.status(404).json({ error: 'Board not found' });

  const newList = {
    id: Date.now().toString(),
    title,
    cards: []
  };
  board.lists.push(newList);
  writeData(data);
  res.status(201).json(newList);
});

// Add a card to a list
app.post('/boards/:boardId/lists/:listId/cards', (req, res) => {
  const { title } = req.body;
  const { boardId, listId } = req.params;
  if (!title) return res.status(400).json({ error: 'Title required' });

  const data = readData();
  const board = data.boards.find(b => b.id === boardId);
  if (!board) return res.status(404).json({ error: 'Board not found' });
  const list = board.lists.find(l => l.id === listId);
  if (!list) return res.status(404).json({ error: 'List not found' });

  const newCard = {
    id: Date.now().toString(),
    title
  };
  list.cards.push(newCard);
  writeData(data);
  res.status(201).json(newCard);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
