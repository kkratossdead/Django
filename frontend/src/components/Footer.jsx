import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  const footerStyle = {
    backgroundColor: '#212529',
    color: 'white',
    padding: '1rem',
    marginTop: 'auto',
    textAlign: 'center'
  };

  return (
    <footer style={footerStyle}>
      <Container>
        &copy; {new Date().getFullYear()} Support Ticket System - Tous droits réservés.
      </Container>
    </footer>
  );
}


export default Footer;
