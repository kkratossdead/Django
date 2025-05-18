import React, { useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/api-token-auth/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          setError(null);
          setSuccess(true);

          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else {
          setSuccess(false);
          setError('Identifiants incorrects. Veuillez réessayer.');
        }
      })
      .catch(() => {
        setSuccess(false);
        setError('Erreur serveur. Veuillez réessayer.');
      });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Connexion</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Connexion réussie ! Redirection...</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group id="username" className="mb-3">
              <Form.Label>Nom d'utilisateur</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Entrez votre nom"
                required
              />
            </Form.Group>

            <Form.Group id="password" className="mb-3">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">Se connecter</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
