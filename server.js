const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory store (simulates database)
let records = [
  { id: 1, name: 'admin', email: 'admin@example.com', created: new Date().toISOString() },
  { id: 2, name: 'demo', email: 'demo@example.com', created: new Date().toISOString() }
];
let nextId = 3;

app.get('/', (req, res) => {
  res.json({
    service: 'postgres-db-api',
    status: 'running',
    version: '1.0.0',
    endpoints: ['GET /health', 'GET /api/records', 'POST /api/records']
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

app.get('/api/records', (req, res) => {
  res.json({ data: records, count: records.length });
});

app.post('/api/records', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'name and email required' });
  const record = { id: nextId++, name, email, created: new Date().toISOString() };
  records.push(record);
  res.status(201).json(record);
});

app.listen(PORT, () => {
  console.log(`PostgreSQL DB API running on port ${PORT}`);
});
