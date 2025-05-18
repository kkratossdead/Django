import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

function TicketsList() {
  const [tickets, setTickets] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:8000/api/tickets/')
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => console.error('Erreur lors de l\'appel API :', error));

    if (token) {
      fetch('http://localhost:8000/api/profile/', {
        headers: {
          'Authorization': 'Token ' + token
        }
      })
        .then(res => res.json())
        .then(data => setUserInfo(data))
        .catch(() => setUserInfo(null));
    }
  }, [token]);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'open':
        return 'success';
      case 'closed':
        return 'secondary';
      default:
        return 'dark';
    }
  };

  const handleDelete = (ticketId) => {
    if (!window.confirm('Confirmer la suppression de ce ticket ?')) return;

    fetch(`http://localhost:8000/api/tickets/${ticketId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Token ' + token
      }
    })
      .then((res) => {
        if (res.ok) {
          setTickets(tickets.filter(ticket => ticket.id !== ticketId));
        } else {
          alert("Erreur lors de la suppression.");
        }
      });
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Tickets Support</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Statut</th>
            <th>Date de création</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.title}</td>
              <td><Badge bg={getStatusVariant(ticket.status)}>{ticket.status}</Badge></td>
              <td>{new Date(ticket.created_at).toLocaleString()}</td>
              <td>
                <Button variant="primary" as={Link} to={`/tickets/details/${ticket.id}`} className="me-2">
                  Détails
                </Button>

                {userInfo?.is_staff && (
                  <Button variant="danger" onClick={() => handleDelete(ticket.id)}>
                    Supprimer
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button as={Link} to="/tickets/create" variant="success" className="mb-3">
        + Nouveau Ticket
      </Button>
    </div>
  );
}

export default TicketsList;
