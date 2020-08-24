import React, { useState, useEffect } from 'react';

function Ticket(props) {
  return (

    <div>
      {props.tickets.map((ticket) => (
        <div>
          <h5>
            title :
            {ticket.title}
          </h5>
          <p>
            content:
            {ticket.content}
          </p>
          <p>
            by
            {' '}
            {ticket.userEmail}
          </p>
        </div>
      ))}
    </div>

  );
}

export default Ticket;
