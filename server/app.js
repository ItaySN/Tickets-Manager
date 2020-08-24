const express = require('express');

const app = express();

const fs = require('fs');

module.exports = app;

app.use(express.json());


app.get('/api/tickets', async (req, res) => {
  const data = await fs.readFile('data.json');
  const tickets = JSON.parse(data);
  res.send(tickets);
});
