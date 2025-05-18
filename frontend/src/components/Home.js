import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

function Home() {
  return (
    <div>
      <div className="bg-dark text-white py-5 mb-4">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h1 className="display-4">Bienvenue sur Support Ticket System</h1>
              <p className="lead">
                Gérez facilement vos demandes d'assistance et communiquez avec notre équipe support dédiée.
              </p>
              <Button variant="primary" href="/tickets">Voir mes tickets</Button>
            </Col>
            <Col md={4}>
              <img 
                src="https://img.icons8.com/clouds/500/help.png" 
                alt="Support Icon" 
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Row className="text-center">
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Suivi en temps réel</Card.Title>
                <Card.Text>Consultez et suivez l'état de vos tickets instantanément.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Chat direct</Card.Title>
                <Card.Text>Communiquez directement avec notre équipe support via le chat intégré.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Support 24/7</Card.Title>
                <Card.Text>Une assistance disponible à tout moment pour répondre à vos besoins.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
