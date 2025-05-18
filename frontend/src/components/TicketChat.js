import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, ListGroup, Card, Alert, Badge } from 'react-bootstrap';

function TicketChat() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetch('http://localhost:8000/api/profile/', {
        headers: { 'Authorization': 'Token ' + token }
      })
        .then(res => res.json())
        .then(data => setUserInfo(data))
        .catch(() => setUserInfo(null));
    }
  }, [token]);

  const fetchMessages = () => {
    fetch(`http://localhost:8000/api/tickets/${id}/messages/`)
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error('Erreur lors de l\'appel API :', error));
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    const payload = token
      ? { message: newMessage }
      : { message: newMessage, pseudo: pseudo || 'Anonyme' };

    fetch(`http://localhost:8000/api/tickets/${id}/messages/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': 'Token ' + token }),
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          setNewMessage('');
          if (!token) setPseudo('');
          fetchMessages();
        } else {
          alert("Erreur lors de l'envoi du message");
        }
      });
  };

  const getSenderName = (msg) => {
    if (userInfo && msg.sender === userInfo.username) {
      return (
        <>
          <strong>{msg.sender} <Badge bg="success">Vous</Badge></strong>
        </>
      );
    }
    return <strong>{msg.sender}</strong>;
  };

  return (
    <div className="container py-4">
      <h1>Chat du Ticket #{id}</h1>

      <Card className="mb-3" style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <Card.Body>
          <ListGroup variant="flush">
            {messages.map((msg) => (
              <ListGroup.Item key={msg.id}>
                {getSenderName(msg)}: {msg.contenu}
                <div className="text-muted small">{new Date(msg.date_envoi).toLocaleTimeString()}</div>
              </ListGroup.Item>
            ))}
            <div ref={messagesEndRef} />
          </ListGroup>
        </Card.Body>
      </Card>

      <Form onSubmit={handleSendMessage}>
        {!token && (
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Votre pseudo..."
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Votre message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">Envoyer</Button>
      </Form>
      {!token && (
        <Alert variant="info" className="mt-3">
          Vous êtes en mode invité. Connectez-vous pour utiliser votre nom d'utilisateur automatiquement.
        </Alert>
      )}
    </div>
  );
}

export default TicketChat;
