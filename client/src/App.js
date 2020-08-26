import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Ticket from './Ticket';
import Header from './Header';
import SearchText from './searchText';

// import SearchText from './searchText';

function App() {
  const [tickets, setTickets] = useState([]);
  const [searchText ,setSearchText] = useState('');
  const [countHiddenTickets, setCountHiddenTickets] = useState(0);

  useEffect(() => {
    const loadAllTickets = async () => {
      const list = await axios.get('/api/tickets');
      setTickets(list.data);
      console.log(list.data);
    };
    loadAllTickets();
  }, []);

  useEffect(() => {
    const search = async () => {
      const searchList = await axios.get(`/api/tickets?searchText=${searchText}`);
      setTickets(searchList.data);
      console.log(searchList.data);
    };
    search();
  }, [searchText]);

  // const ticketsList = tickets.map((ticket) => <Ticket key={tickets} ticket={ticket} />);
    
  const counterHide = () => {
    setCountHiddenTickets(countHiddenTickets+1);
  }
  
  



  

  return (
    <main>
      <Header />
        <div> {countHiddenTickets>0 && 
         <>
         <p id="hideTicketsCounter">{countHiddenTickets}</p>
         </>
        }
      </div>
      <SearchText searchText ={searchText} setSearchText={setSearchText} />
      {tickets.map((ticket,index) => 
      )}
      

    </main>
  );
}


export default App;
