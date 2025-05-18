import React, { useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.json().then(data => ({ status: res.status, data })))
      .then(({ status, data }) => {
        if (status === 201) {
          setSuccess(true);
          setError(null);
          setTimeout(() => navigate('/login'), 2500);
        } else {
          setSuccess(false);
          setError(data.error || 'Erreur inconnue.');
        }
      })
      .catch(() => setError('Erreur serveur. Veuillez réessayer.'));
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Créer un compte</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Inscription réussie ! Redirection vers connexion...</Alert>}
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label>Nom d'utilisateur</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Entrez votre nom"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez un mot de passe fort"
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">S'inscrire</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Register;
