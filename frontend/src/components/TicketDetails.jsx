
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Calendar, Clock, MessageSquare, Pencil, Trash2, User, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`http://localhost:8000/api/tickets/${id}/`)
      .then(res => res.json())
      .then(data => setTicket(data))
      .catch(() => setError("Impossible de charger le ticket."));

    if (token) {
      fetch('http://localhost:8000/api/profile/', {
        headers: {
          'Authorization': 'Token ' + token
        }
      })
        .then(res => res.json())
        .then(data => setUserInfo(data));
    }
  }, [id, token]);

  const handleDelete = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce ticket ? Cette action est irréversible.")) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:8000/api/tickets/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Token ' + token
        }
      });

      if (response.ok) {
        navigate('/tickets');
      } else {
        setError("Erreur : vous n'avez pas les droits pour supprimer ce ticket.");
      }
    } catch (err) {
      setError("Erreur serveur lors de la suppression.");
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'closed':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'Ouvert';
      case 'closed':
        return 'Fermé';
      case 'in_progress':
        return 'En cours';
      default:
        return status;
    }
  };

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-50/30">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-8 w-64" />
            </div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-20 w-full" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header avec bouton retour */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="hover:bg-white/60"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div className="h-6 w-px bg-gray-300" />
          <h1 className="text-3xl font-bold text-gray-900">
            Ticket #{ticket.id}
          </h1>
        </div>

        {/* Erreur Alert */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Carte principale du ticket */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-900 leading-tight">
                      {ticket.title}
                    </h2>
                    <div className="flex items-center gap-3">
                      <Badge className={`${getStatusColor(ticket.status)} border-0 font-medium`}>
                        {getStatusText(ticket.status)}
                      </Badge>
                      <span className="text-sm text-gray-500">•</span>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <User className="h-3 w-3" />
                        {ticket.auteur_username}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Separator />
                
                {/* Description */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Description</h3>
                  <div className="bg-gray-50 rounded-lg p-4 border">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {ticket.description}
                    </p>
                  </div>
                </div>

                {/* Métadonnées */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Créé le</p>
                      <p className="text-gray-600">
                        {new Date(ticket.created_at).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
                      <Clock className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Modifié le</p>
                      <p className="text-gray-600">
                        {new Date(ticket.updated_at).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Actions principales */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Actions</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start gap-3 h-11 bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                  onClick={() => navigate(`/tickets/${id}/chat`)}
                >
                  <MessageSquare className="h-4 w-4" />
                  Rejoindre le chat
                </Button>

                {userInfo && (userInfo.is_staff || userInfo.id === ticket.auteur) && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3 h-11 border-gray-300 hover:bg-gray-50"
                    asChild
                  >
                    <Link to={`/tickets/edit/${ticket.id}`}>
                      <Pencil className="h-4 w-4" />
                      Modifier le ticket
                    </Link>
                  </Button>
                )}

                {userInfo?.is_staff && (
                  <>
                    <Separator className="my-4" />
                    <Button 
                      variant="destructive" 
                      className="w-full justify-start gap-3 h-11"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      <Trash2 className="h-4 w-4" />
                      {isDeleting ? 'Suppression...' : 'Supprimer le ticket'}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Informations</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ID du ticket</span>
                    <span className="font-mono font-medium">#{ticket.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Auteur</span>
                    <span className="font-medium">{ticket.auteur_username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Statut</span>
                    <Badge className={`${getStatusColor(ticket.status)} border-0 text-xs`}>
                      {getStatusText(ticket.status)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;