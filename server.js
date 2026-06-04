const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'todos.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ensure data file exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

function readTodos() {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

function writeTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

// GET all todos
app.get('/api/todos', (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

// POST create todo
app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Task text is required' });
  }
  const todos = readTodos();
  const newTodo = {
    id: uuidv4(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
  todos.unshift(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});

// PATCH toggle todo
app.patch('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todos = readTodos();
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  todo.completed = !todo.completed;
  writeTodos(todos);
  res.json(todo);
});

// DELETE todo
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  let todos = readTodos();
  const before = todos.length;
  todos = todos.filter(t => t.id !== id);
  if (todos.length === before) return res.status(404).json({ error: 'Todo not found' });
  writeTodos(todos);
  res.json({ success: true });
});

// DELETE all completed
app.delete('/api/todos', (req, res) => {
  let todos = readTodos();
  todos = todos.filter(t => !t.completed);
  writeTodos(todos);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
