import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge, badgeVariants } from './ui/badge';
import {Button ,buttonVariants} from './ui/button'



function TicketsList() {
  const [tickets, setTickets] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:8000/api/tickets/')
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => console.error('Erreur lors de l\'appel API :', error));

    if (token) {
      fetch('http://localhost:8000/api/profile/', {
        headers: {
          'Authorization': 'Token ' + token
        }
      })
        .then(res => res.json())
        .then(data => setUserInfo(data))
        .catch(() => setUserInfo(null));
    }
  }, [token]);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'open':
        return 'default';
      case 'closed':
        return 'destructive';
      default:
        return 'dark';
    }
  };

  const handleDelete = (ticketId) => {
    if (!window.confirm('Confirmer la suppression de ce ticket ?')) return;

    fetch(`http://localhost:8000/api/tickets/${ticketId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Token ' + token
      }
    })
      .then((res) => {
        if (res.ok) {
          setTickets(tickets.filter(ticket => ticket.id !== ticketId));
        } else {
          alert("Erreur lors de la suppression.");
        }
      });
  };

  return (
    
    <div className="container py-4">
      
      <h1 className="mb-4">Tickets Support</h1>
      <Link to="/tickets/create" style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button variant="outline" size="lg">+ Nouveau ticket</Button>
      </Link>
      <Table className="border-collapse border border-gray-300">
        <TableHeader>
          <TableRow style={{backgroundColor: '#f0f0f0'}}>
            <TableHead>ID</TableHead>
            <TableHead>Titre</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map(ticket => (
            <TableRow key={ticket.id}>
              <TableCell>{ticket.id}</TableCell>
              <TableCell>{ticket.title}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(ticket.status)}>
                  {ticket.status}
                </Badge>
              </TableCell>
              <TableCell>{new Date(ticket.created_at).toLocaleString()}</TableCell>
              <TableCell className='w-20'>
                <Button variant="default" asChild>
                  <Link to={`/tickets/details/${ticket.id}`} style={{color: 'white' , textDecoration: 'none' }}>
                    Détails
                  </Link>
                </Button>

                {userInfo?.is_staff && (
                  <Button variant="destructive" onClick={() => handleDelete(ticket.id)} style={{marginLeft: '10px' ,borderRadius: '10px'}}>
                    Supprimer
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


    </div>
  );
}

export default TicketsList;
