import React, { useState, useEffect } from 'react';
import './ticket.css'

function Ticket({counterHide , ticket, reset, doneTicket, unDoneTicket}) {
  
const [classTicket,setClassTicket] = useState('ticket');

  const dateToDisplay = (date) => {
        let displayDate = date.getFullYear() + "-" +
        ("0" + (date.getMonth()+1)).slice(-2) + "-" +
        ("0" + date.getDate()).slice(-2) + " " +
        ("0" + date.getHours()).slice(-2) + ":" +
        ("0" + date.getMinutes()).slice(-2) + ":" +
        ("0" + date.getSeconds()).slice(-2);
        return displayDate;
      }

  useEffect(()=>{
    setClassTicket('ticket')
  },[reset])


  function hideTicket (e) {
   setClassTicket("hidden-ticket");
   counterHide();
  }  
  const displayDone = ticket.done ?
   {
    color:'green',
    font:'inherit'
  }
  : {
    color:'red',
    font:'inherit'
  }
  const displayButtonDone = ticket.done ?
   {
    backgroundColor: 'red',
    color:'black',
    font:'inherit'
  }
  : {
    backgroundColor: 'green',
    color:'black',
    font:'inherit'
  }
  
  return (

    <div>
        <div className={classTicket}>
          <button className="hideTicketButton" onClick={hideTicket}>Hide</button>
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
          <p>
            {dateToDisplay(new Date(ticket.creationTime))}
          </p>
          <p>{ticket.labels && ticket.labels.map((label) => <span className="label">{label}</span>)}</p>
          <p style={displayDone}>{ticket.done ? 'This ticket is done' : 'This Ticket is undone'} </p>
          <button style={displayButtonDone}
          onClick={ticket.done ? () => unDoneTicket(ticket.id) : () => doneTicket(ticket.id)}
          > {ticket.done ? 'Undone' : 'Done'}</button>
          
        </div>
    </div>

  );
}

export default Ticket;
