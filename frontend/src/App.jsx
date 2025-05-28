import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import TicketsList from './components/TicketsList';
import TicketChat from './components/TicketChat.jsx';
import TicketDetails from './components/TicketDetails';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import TicketCreate from './components/TicketCreate';
import PrivateRoute from './components/PrivateRoute';
import TicketEdit from './components/TicketEdit';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';






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
<Header userInfo={userInfo} handleLogout={handleLogout} />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tickets" element={<TicketsList />} />
        <Route path="/tickets/:id/chat" element={<TicketChat />} />
        <Route path="/tickets/details/:id" element={<TicketDetails />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tickets/create" element={<PrivateRoute><TicketCreate /></PrivateRoute>} />
        <Route path="/tickets/edit/:id" element={<PrivateRoute><TicketEdit /></PrivateRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
