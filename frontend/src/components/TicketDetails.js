import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`http://localhost:8000/api/tickets/${id}/`)
      .then(res => res.json())
      .then(data => setTicket(data));

    if (token) {
      fetch('http://localhost:8000/api/profile/', {
        headers: {
          'Authorization': 'Token ' + token
        }
      })
        .then(res => res.json())
        .then(data => setUserInfo(data));
    }
  }, [id]);

  const handleDelete = () => {
    if (!window.confirm("Confirmer la suppression du ticket ?")) return;

    fetch(`http://localhost:8000/api/tickets/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Token ' + token
      }
    })
      .then((res) => {
        if (res.ok) {
          navigate('/tickets');
        } else {
          setError("Erreur : vous n'avez pas les droits.");
        }
      });
  };

  if (!ticket) return <p>Chargement...</p>;

  return (
    <div className="container py-4">
      <h2>Détails du Ticket #{ticket.id}</h2>

      <Card className="mb-3">
        <Card.Body>
          <Card.Title>{ticket.title}</Card.Title>
          <Card.Text>{ticket.description}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">Statut : {ticket.status}</Card.Subtitle>
        </Card.Body>
      </Card>
      <Button variant="primary" style={{ marginRight: '10px' }} onClick={() => navigate(`/tickets/${id}/chat`)}>Rejoindre le chat</Button>

      {userInfo?.is_staff && (
        <Button variant="danger" onClick={handleDelete}>Supprimer</Button>
      )}
      {userInfo && (userInfo.is_staff || userInfo.id === ticket.auteur) && (
        <Button variant="warning" as={Link} to={`/tickets/edit/${ticket.id}`} className="ms-2">Modifier</Button>
      )}
      
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </div>
  );
}

export default TicketDetails;
