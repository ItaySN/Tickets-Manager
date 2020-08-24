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

app.post('/api/tickets/:ticketId/done/', async (req, res) => {
  const data = await fs.readFile('./data.json');
  let ticketsJson = JSON.parse(data);
  try {
    const tickectMap = ticketsJson.map((item) => {
      if (item.id === req.params.ticketId) {
        item.done = true;
      }
      return item;
    });
    ticketsJson = JSON.stringify(tickectMap);
    await fs.writeFile('./data.json', ticketsJson);
    res.send(`ticket ${req.params.ticketId} has done`);
  } catch (e) {
    res.send(`You got an error ${e.message}`);
  }
});

// app.post('/api/tickets/:ticketsId/undone/', async (req, res) => {
//   const data = await fs.readFile('./data.json');
//   const ticketsJson = JSON.parse(data);
//   let i = 0;
//   let tempCheck = true;
//   try {
//     do {
//       if (ticketsJson[i].id === req.params.ticketId) {
//         ticketsJson[i].done = false;
//         tempCheck = false;
//       }
//       i += 1;
//     } while (tempCheck || i < ticketsJson.lengh);
//     JSON.stringify(ticketsJson);
//     await fs.writeFile('./data.json', ticketsJson);
//     res.send(`ticket ${req.params.ticketId} has undone`);
//   } catch (e) {
//     res.send(`You got an error ${e.message}`);
//   }
// });

app.post('/api/tickets/:ticketId/undone/', async (req, res) => {
  const data = await fs.readFile('./data.json');
  let ticketsJson = JSON.parse(data);
  try {
    const tickectMap = ticketsJson.map((item) => {
      if (item.id === req.params.ticketId) {
        item.done = false;
      }
      return item;
    });
    ticketsJson = JSON.stringify(tickectMap);
    await fs.writeFile('./data.json', ticketsJson);
    res.send(`ticket ${req.params.ticketId} has undone`);
  } catch (e) {
    res.send(`You got an error ${e.message}`);
  }
});