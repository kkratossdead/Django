import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function TicketCreate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      ...(isAuthenticated ? {} : { pseudo: pseudo || 'Anonyme' })
    };

    fetch('http://localhost:8000/api/tickets/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(isAuthenticated && { 'Authorization': 'Token ' + token }),
      },
      body: JSON.stringify(payload),
    })
      .then(res => res.json().then(data => ({ status: res.status, data })))
      .then(({ status, data }) => {
        if (status === 201) {
          setSuccess(true);
          setError(null);
          setTimeout(() => navigate('/tickets'), 2000);
        } else {
          setError("Erreur lors de la création : " + JSON.stringify(data));
        }
      })
      .catch(() => {
        setError("Erreur serveur.");
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '500px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Nouveau Ticket</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Ticket créé avec succès !</Alert>}

          <Form onSubmit={handleSubmit}>
            {!isAuthenticated && (
              <Form.Group className="mb-3">
                <Form.Label>Votre pseudo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez votre nom/pseudo"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex : Problème de connexion"
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
                placeholder="Décrivez votre problème..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">Envoyer</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TicketCreate;
