const express = require('express');

const app = express();

const fs = require('fs').promises;

module.exports = app;

app.use(express.json());

app.get('/api/tickets/', async (req, res) => {
  const data = await fs.readFile('./data.json');
  const tickets = JSON.parse(data);
  if (!req.query.searchText) {
    res.send(tickets);
  } else {
    // eslint-disable-next-line max-len
    const filterData = tickets.filter((ticket) => ticket.title.toLowerCase().includes(req.query.searchText));
    res.send(filterData);
  }
});

