const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'test-xpress-data.json');

app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) return { tests: [], sections: [], runs: [] };
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    return { tests: [], sections: [], runs: [] };
  }
}

function writeData(data) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// GET all data in one call
app.get('/api/data', (req, res) => {
  res.json(readData());
});

// POST saves the full state (tests + sections + runs)
app.post('/api/data', (req, res) => {
  const { tests, sections, runs } = req.body;
  if (!Array.isArray(tests) || !Array.isArray(sections) || !Array.isArray(runs)) {
    return res.status(400).json({ error: 'Expected { tests, sections, runs } arrays' });
  }
  const data = { tests, sections, runs };
  writeData(data);
  res.json({ ok: true });
});

// Catch-all → serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Test Xpress running on port ${PORT}`));
