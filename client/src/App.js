import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Ticket from './Ticket';
import Header from './Header';
import SearchText from './searchText';

function App() {
  const [tickets, setTickets] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [countHiddenTickets, setCountHiddenTickets] = useState(0);
  const [reset, setReset] = useState(0);
  const [sortedByDate, setSortedByDate] = useState(false);

  const getAllTickets = async () => {
    try {
      const res = await axios.get('api/tickets');
      setTickets(res.data);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllTickets();
  }, []);

  useEffect(() => {
    const search = async () => {
      const searchList = await axios.get(`/api/tickets?searchText=${searchText}`);
      setTickets(searchList.data);
      console.log(searchList.data);
    };
    search();
  }, [searchText]);

  function restore() {
    setReset(reset + 1);
    setCountHiddenTickets(0);
  }

  const counterHide = () => {
    setCountHiddenTickets(countHiddenTickets + 1);
  };
  const doneTicket = async (ticketId) => {
    try {
      await axios.post(`/api/tickets/${ticketId}/done`);
      getAllTickets();
      console.log(tickets);
    } catch (e) {
      console.log(e);
    }
  };
  const unDoneTicket = async (ticketId) => {
    try {
      await axios.post(`/api/tickets/${ticketId}/undone`);
      getAllTickets();
      console.log(tickets);
    } catch (e) {
      console.log(e);
    }
  };
  function sortByDate() {
    const sortedTickets = tickets.slice().sort((a, b) => a.creationTime - b.creationTime);
    setSortedByDate(true);
    setTickets(sortedTickets);
  }

  function cancelSortByDate() {
    setSortedByDate(false);
    debugger;
    getAllTickets();
  }
  return (
    <div>
      <Header />
      <div className="dataOfTickets">
        <span>
          Available Tickets:
          {200 - countHiddenTickets}
        </span>
        {countHiddenTickets > 0
            && (
              <>
                <p>
                  Hidden Tickets:
                  <span id="hideTicketsCounter">{countHiddenTickets}</span>
                </p>

                <button id="restoreHideTickets" onClick={restore}>Restore</button>
              </>
            )}
      </div>
      <div className="actionsDiv">
        <SearchText searchText={searchText} setSearchText={setSearchText} />
        <p className="sortedP">
          {' '}
          <button className="sortedButton" onClick={sortedByDate ? () => cancelSortByDate() : () => sortByDate()}>
            {sortedByDate ? 'Cancel sort' : 'Sort by date'}
            {' '}
          </button>
        </p>
      </div>
      <div className="main">
        {tickets.map((ticket, index) => 
        <Ticket key={{index}} 
        ticket={ticket} 
        countHiddenTickets={countHiddenTickets} 
        counterHide={counterHide} 
        reset={reset} 
        doneTicket={doneTicket} 
        unDoneTicket={unDoneTicket} />)}
      </div>

    </div>
  );
}

export default App;
