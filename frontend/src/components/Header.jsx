import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function Header({ userInfo, handleLogout }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">🎫 Support Ticket</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/tickets">Tickets</Nav.Link>
            {userInfo && (
              <Nav.Link as={Link} to="/tickets/create">Nouveau</Nav.Link>
            )}
          </Nav>

          <Nav className="ms-auto">
            {userInfo ? (
              <>
                <Navbar.Text className="me-2 text-light">
                  Bonjour, <strong>{userInfo.username}</strong>
                </Navbar.Text>
                {userInfo.is_staff && (
                  <Navbar.Text className="me-2 text-warning fw-bold">
                    Admin
                  </Navbar.Text>
                )}
                <Nav.Link onClick={handleLogout}>Déconnexion</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Connexion</Nav.Link>
                <Nav.Link as={Link} to="/register">Inscription</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
