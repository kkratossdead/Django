import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import TicketsList from './components/TicketsList';
import TicketChat from './components/TicketChat';
import TicketDetails from './components/TicketDetails';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Footer from './components/Footer';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import TicketCreate from './components/TicketCreate';
import PrivateRoute from './components/PrivateRoute';
import TicketEdit from './components/TicketEdit';







function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:8000/api/profile/', {
        headers: {
          'Authorization': 'Token ' + token
        }
      })
        .then(res => res.json())
        .then(data => setUserInfo(data))
        .catch(() => setUserInfo(null));
    } else {
      setUserInfo(null);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    setToken(null);
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">Support Ticket</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Accueil</Nav.Link>
          <Nav.Link as={Link} to="/tickets">Tickets</Nav.Link>
          <Nav.Link as={Link} to="/tickets/create">Nouveau Ticket</Nav.Link>

        </Nav>
        <Nav>
          {userInfo ? (
            <>
              <Navbar.Text className="me-2">Connecté : {userInfo.username}</Navbar.Text>
              {userInfo.is_staff && <Navbar.Text className="text-warning me-2">ADMIN</Navbar.Text>}
              <Nav.Link onClick={handleLogout}>Déconnexion</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Se connecter</Nav.Link>
              <Nav.Link as={Link} to="/register">S'inscrire</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tickets" element={<TicketsList />} />
        <Route path="/tickets/:id/chat" element={<TicketChat />} />
        <Route path="/tickets/details/:id" element={<TicketDetails />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/profile" element={<Profile token={token} onLogout={handleLogout} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tickets/create" element={<PrivateRoute><TicketCreate /></PrivateRoute>} />
        <Route path="/tickets/edit/:id" element={<PrivateRoute><TicketEdit /></PrivateRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
