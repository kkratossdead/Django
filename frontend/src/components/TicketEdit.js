import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';

function TicketEdit() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`http://localhost:8000/api/tickets/${id}/`, {
      headers: {
        'Authorization': 'Token ' + token
      }
    })
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setDescription(data.description);
        setStatus(data.status);
      })
      .catch(() => setError('Impossible de charger le ticket'));
  }, [id, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/tickets/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      },
      body: JSON.stringify({ title, description, status }),
    })
      .then(res => {
        if (res.ok) {
          setSuccess(true);
          setTimeout(() => navigate(`/tickets/details/${id}`), 1500);
        } else {
          setError("Vous n’avez pas le droit de modifier ce ticket.");
        }
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '500px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Modifier le ticket #{id}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Modifié avec succès !</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Statut</Form.Label>
              <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="open">Ouvert</option>
                <option value="closed">Fermé</option>
              </Form.Select>
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">Enregistrer</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TicketEdit;
