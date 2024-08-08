import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initialData } from './serverConstants.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// In-memory data store
let tableData = [...initialData];

// GET all data
app.get('/api/data', (req, res) => {
  res.json(tableData);
});

// POST new person
app.post('/api/data', (req, res) => {
  const newPerson = { ...req.body, id: tableData.length + 1 };
  tableData.push(newPerson);
  res.status(201).json(newPerson);
});

// PUT update status
app.put('/api/data/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const person = tableData.find(p => p.id === parseInt(id));
  if (person) {
    console.log(`Updating status of ${person.name} to ${status}`);
    person.status = status;
    res.json(person);
  } else {
    res.status(404).json({ error: 'Person not found' });
  }
});

// POST send message
app.post('/api/send-message', (req, res) => {
  const { recipientId, message } = req.body;
  const recipient = tableData.find(p => p.id === parseInt(recipientId));
  if (recipient) {
    // In a real app, you'd send the message here
    console.log(`Message sent to ${recipient.name}: ${message}`);
    res.json({ success: true, message: 'Message sent successfully' });
  } else {
    res.status(404).json({ error: 'Recipient not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});