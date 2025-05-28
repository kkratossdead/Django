import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  return (
    <div>
      <div className="bg-dark text-white py-5 mb-5">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h1 className="display-4 fw-bold">Bienvenue sur Support Ticket System</h1>
              <p className="lead">
                Créez, gérez et suivez vos tickets d'assistance en toute simplicité.
              </p>

              {isAuthenticated ? (
                <div className="d-flex flex-wrap gap-3 pt-2">
                  <Link to="/tickets">
                    <Button variant="primary" size="lg">Voir mes tickets</Button>
                  </Link>
                  <Link to="/tickets/create">
                    <Button variant="outline-light" size="lg">Nouveau ticket</Button>
                  </Link>
                </div>
              ) : (
                <div className="d-flex flex-wrap gap-3 pt-2">
                  <Link to="/login">
                    <Button variant="primary" size="lg">Se connecter</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline-light" size="lg">S'inscrire</Button>
                  </Link>
                </div>
              )}
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

      <Container className="pb-5">
        <Row className="text-center g-4">
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Créez des tickets</Card.Title>
                <Card.Text>
                  Soumettez facilement vos problèmes et suivez leur résolution avec clarté.
                </Card.Text>
              </Card.Body>
              <Card.Footer className="bg-transparent">
                <Link to={isAuthenticated ? "/tickets/create" : "/login"}>
                  <Button variant="outline" style={{color: 'black'}}>Créer un ticket</Button>
                </Link>
              </Card.Footer>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Suivi en temps réel</Card.Title>
                <Card.Text>
                  Visualisez l'état de vos demandes et recevez des mises à jour instantanées.
                </Card.Text>
              </Card.Body>
              <Card.Footer className="bg-transparent">
                <Link to="/tickets">
                  <Button variant="outline" style={{color: 'black'}}>Voir les tickets</Button>
                </Link>
              </Card.Footer>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Communication directe</Card.Title>
                <Card.Text>
                  Échangez avec notre équipe support via le chat intégré, pour une assistance rapide.
                </Card.Text>
              </Card.Body>
              <Card.Footer className="bg-transparent" >
                <Link to={isAuthenticated ? "/tickets" : "/login"}  >
                  <Button variant="outline" style={{color: 'black'}}>Commencer maintenant</Button>
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
