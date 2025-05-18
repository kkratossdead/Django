import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <Container>
        &copy; {new Date().getFullYear()} Support Ticket System - Tous droits réservés.
      </Container>
    </footer>
  );
}

export default Footer;
