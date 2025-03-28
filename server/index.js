import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, '../dist')));

// Mock data
const emails = [
  {
    id: 1,
    from: 'john@example.com',
    subject: 'Meeting Tomorrow',
    body: 'Hi, let\'s meet tomorrow at 10 AM.',
    date: '2024-03-10T10:00:00.000Z',
    read: false,
    starred: false
  },
  {
    id: 2,
    from: 'sarah@example.com',
    subject: 'Project Update',
    body: 'Here\'s the latest update on the project...',
    date: '2024-03-09T15:30:00.000Z',
    read: true,
    starred: true
  }
];

app.get('/api/emails', (req, res) => {
  res.json(emails);
});

app.post('/api/emails', (req, res) => {
  const newEmail = {
    id: emails.length + 1,
    ...req.body,
    date: new Date().toISOString(),
    read: false,
    starred: false
  };
  emails.push(newEmail);
  res.status(201).json(newEmail);
});

// Handle all other routes by serving the index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});