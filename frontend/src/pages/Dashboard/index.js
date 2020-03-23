import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import socketio from 'socket.io-client';

import api from '../../services/api';

import './styles.css';


export default function Dashboard() {
  const [spots, setSpots] = useState([])
  const [request, setRequest] = useState([])

  const user_id = localStorage.getItem('user');
  const socket = useMemo(() => socketio('http://localhost:3333', {
    query: { user_id }
  }), [user_id]);

  useEffect(() => {
    // mover para fora, porq a cada vez que sofrer alteracao sera feita uma nova
    //conexao com o socket, e nao queremos isso
    // const user_id = localStorage.getItem('user');
    // const socket = socketio('http://localhost:3333', {
    //   query: { user_id }
    // });

    socket.on('booking_request', data => {
      console.log(data);
      setRequest([...request, data]);
    });

    // socket.on('hello', data => {
    //   console.log(data);
    // });

    socket.emit('omni', 'stack');

  }, [request, socket]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { user_id },
      });

      setSpots(response.data);
    }
    loadSpots();
  }, []);

  async function handleAccept(id) {
    await api.post(`bookings/${id}/approvals`);
    setRequest(
      request.filter(request => request._id != id)
    );
  }
  async function handleReject(id) {
    await api.post(`bookings/${id}/rejections`);
    setRequest(
      request.filter(request => request._id != id)
    );
  }

  return (
    <>
      <ul className="notifications">
        {request.map(request => (
          <li key={request._id}>
            <p>
              <strong>{request.user.email}</strong>
              está solocitando uma reserva em
                <strong>{request.spot.company}</strong>
              para a data: <strong>{request.date}</strong>
            </p>
            <button onClick={() => handleAccept(request._id)} className='accept'>ACEITAR</button>
            <button onClick={() => handleReject(request._id)} className='reject'>REJEITAR</button>
          </li>
        ))}
      </ul>

      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />


            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : `GRATUITO`}</span>
          </li>
        ))}
      </ul>
      <Link to='/new'>
        <button className='btn'>Cadastrar novo spot</button>
      </Link>
    </>
  );
}
