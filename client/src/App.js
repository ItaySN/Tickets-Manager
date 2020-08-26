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
  const [reset, setReset] = useState(0);
  

const getAllTickets = async () => {
  try{
    const res = await axios.get('api/tickets');
    setTickets(res.data);
    console.log(res.data);
  }
  catch(e){
    console.log(e);
  }
}

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

  function restore(){
       setReset(reset+1)
       setCountHiddenTickets(0);
    }
    
  const counterHide = () => {
    setCountHiddenTickets(countHiddenTickets+1);
  }

  const doneTicket = async (ticketId) => {
    try{
      const done = await axios.post(`/api/tickets/${ticketId}/done`);
      getAllTickets();
      console.log(tickets);

    }catch(e){
      console.log(e)
    }
  }
  const unDoneTicket = async (ticketId) => {
    try{
      const undone = await axios.post(`/api/tickets/${ticketId}/undone`);
      getAllTickets();
      console.log(tickets);

    }catch(e){
      console.log(e)
    }
  }



  return (
    <main>
      <Header />
        <div> {countHiddenTickets>0 && 
         <>
         <p id="hideTicketsCounter">{countHiddenTickets}</p>
         {<button id="restoreHideTickets" onClick={restore}>Restore</button>}
         </>
        }
      </div>
      <SearchText searchText ={searchText} setSearchText={setSearchText} />
      {tickets.map((ticket,index) => 
      <Ticket key={index} ticket={ticket} countHiddenTickets={countHiddenTickets} counterHide={counterHide} reset={reset} doneTicket={doneTicket} unDoneTicket={unDoneTicket} />
      )}
      

    </main>
  );
}


export default App;
