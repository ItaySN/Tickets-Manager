import React, { useState, useEffect } from 'react';
import './ticket.css';
import './App.css';

function Ticket({
  counterHide, ticket, reset, doneTicket, unDoneTicket,
}) {
  const [classTicket, setClassTicket] = useState('ticket');

  const dateToDisplay = (date) => {
    const displayDate = `${date.getFullYear()}-${
      (`0${date.getMonth() + 1}`).slice(-2)}-${
      (`0${date.getDate()}`).slice(-2)} ${
      (`0${date.getHours()}`).slice(-2)}:${
      (`0${date.getMinutes()}`).slice(-2)}:${
      (`0${date.getSeconds()}`).slice(-2)}`;
    return displayDate;
  };

  useEffect(() => {
    setClassTicket('ticket');
  }, [reset]);

  function hideTicket() {
    setClassTicket('hidden-ticket');
    counterHide();
  }

  const displayDone = ticket.done
    ? {
      color: 'green',
      font: 'inherit',
      fontWeight: 'bold',
    }
    : {
      color: 'red',
      font: 'inherit',
      fontWeight: 'bold',
    };

  const displayButtonDone = ticket.done
    ? {
      backgroundColor: 'red',
      color: 'black',
      font: 'inherit',
    }
    : {
      backgroundColor: 'green',
      color: 'black',
      font: 'inherit',
    };

  return (

    <div>
      <div className={classTicket}>
        <div className="grid-container">
          <button className="hideTicketButton" onClick={hideTicket}>Hide</button>
          <h5 className="ticketTitle">
            {ticket.title}
          </h5>
          <p className="ticketContent">

            {ticket.content}
          </p>
          <p className="ticketEmail">
            by
            {' '}
            {ticket.userEmail}
          </p>
          <p className="ticketDate">
            {dateToDisplay(new Date(ticket.creationTime))}
          </p>
          <p className="ticketLabels">{ticket.labels && ticket.labels.map((label) => <label className="label">{label}</label>)}</p>
          <p className="isDoneText" style={displayDone}>
            {ticket.done ? 'This ticket is done' : 'This ticket is undone'}
            {' '}
          </p>
          <button
            className="doneButton"
            style={displayButtonDone}
            onClick={ticket.done ? () => unDoneTicket(ticket.id) : () => doneTicket(ticket.id)}
          >
            {' '}
            {ticket.done ? 'Undone' : 'Done'}
          </button>
        </div>
      </div>
    </div>

  );
}

export default Ticket;
