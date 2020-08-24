import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Ticket from './Ticket';
// import SearchText from './searchText';

function App() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const load = async () => {
      const list = await axios.get('/api/tickets/');
      setTickets(list.data);
      console.log(list.data);
    };
    load();
  }, []);

  // const ticketsList = tickets.map((ticket) => <Ticket key={tickets} ticket={ticket} />);

  return (
    <main>
      {/* <SearchText /> */}
      {/* <Ticket ticketTitle={tickets} /> */}
      <Ticket tickets={tickets} />

    </main>
  );
}

export default App;
