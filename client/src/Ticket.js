import React, { useState, useEffect } from 'react';
import './ticket.css'

function Ticket({counterHide , ticket, reset}) {
  
const [classTicket,setClassTicket] = useState('ticket');

  function displayDate (creationTime) {


  }

  useEffect(()=>{
    setClassTicket('ticket')
  },[reset])


  function hideTicket (e) {
   setClassTicket("hidden-ticket");
   counterHide();
  }
  
  // useEffect(() => {
  //   if(!hidden){
  //     props.countHiddenTickets +=1;
  //   }
  // },[hidden]);
  
  return (

    <div>
        <div className={classTicket}>
          <h5>     
            {ticket.title}
          </h5>
          <p>
            
            {ticket.content}
          </p>
          <p>
            by
            {' '}
            {ticket.userEmail}
          </p>
          <p>{ticket.labels && ticket.labels.map((label) => <span className="label">{label}</span>)}</p>
          <button className="hideTicketButton" onClick={hideTicket}> hide me </button>
        </div>
    </div>

  );
}

export default Ticket;
