import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Send, AlertCircle, MessageSquare } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

function TicketChat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetchUserInfo();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/profile/', {
        headers: { 'Authorization': 'Token ' + token }
      });
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/tickets/${id}/messages/`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const payload = token
      ? { message: newMessage }
      : { message: newMessage, pseudo: pseudo || 'Anonyme' };

    try {
      const response = await fetch(`http://localhost:8000/api/tickets/${id}/messages/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': 'Token ' + token }),
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setNewMessage('');
        if (!token) setPseudo('');
        fetchMessages();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erreur lors de l'envoi du message");
      }
    } catch (error) {
      console.error("Erreur:", error.message);
      alert(error.message);
    }
  };

  // Fonction pour rendre les messages dans la liste
  const renderMessages = () => {
    if (messages.length === 0) {
      return (
        <div className="py-8 text-center text-slate-500">
          <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>Aucun message pour l'instant.</p>
          <p className="text-sm">Soyez le premier à écrire un message.</p>
        </div>
      );
    }

    return messages.map((msg) => {
      const isCurrentUser = userInfo && msg.sender === userInfo.username;
      
      return (
        <div 
          key={msg.id}
          className={`mb-4 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`px-4 py-2 rounded-lg max-w-[80%] shadow-sm
              ${isCurrentUser 
                ? 'bg-blue-500 text-white rounded-br-none' 
                : 'bg-white text-slate-800 rounded-bl-none'}`
            }
          >
            <div className="font-medium text-xs mb-1">
              {isCurrentUser ? (
                <span className="flex items-center gap-1">
                  Vous
                  <Badge 
                    variant="outline"
                    className="ml-1 bg-blue-600 text-white border-blue-600"
                  >
                    {msg.sender}
                  </Badge>
                </span>
              ) : (
                <span>{msg.sender}</span>
              )}
            </div>
            <div>{msg.contenu}</div>
            <div className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-slate-400'}`}>
              {new Date(msg.date_envoi).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      );
    });
  };

  // Composant pour l'entrée de message
  const renderMessageInput = () => {
    return (
      <form onSubmit={handleSendMessage} className="space-y-3">
        {!token && (
          <div>
            <Input
              type="text"
              placeholder="Votre pseudo..."
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              className="h-12 text-base border-2 focus:border-blue-500 transition-colors"
            />
          </div>
        )}

        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Écrivez votre message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            required
            className="h-12 text-base border-2 focus:border-blue-500 transition-colors"
          />
          <Button 
            type="submit" 
            className="h-12 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            <Send className="h-5 w-5 mr-2" />
            Envoyer
          </Button>
        </div>
      </form>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-8 w-64" />
          </div>
          <Card className="shadow-xl">
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2" />
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-3/4 ml-auto" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-2/3 ml-auto" />
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
          <div className="mt-4">
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="hover:bg-white/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div className="h-6 w-px bg-gray-300" />
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <MessageSquare className="h-7 w-7 text-blue-600" />
              Chat du Ticket
              <Badge variant="outline" className="ml-2 text-lg font-mono">
                #{id}
              </Badge>
            </h1>
            <p className="text-slate-500 mt-1">
              {messages.length} message{messages.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Chat Box */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-6">
          <CardHeader className="border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-xl">Conversation</CardTitle>
            <CardDescription className="text-blue-100">
              Échangez des messages concernant ce ticket
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px] p-6">
              {renderMessages()}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Message Input Form */}
        {renderMessageInput()}

        {/* Guest Mode Alert */}
        {!token && (
          <Alert className="mt-6 border-blue-200 bg-blue-50/80 backdrop-blur-sm">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 font-medium">
              Vous êtes en mode invité. Connectez-vous pour utiliser votre nom d'utilisateur automatiquement.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}

export default TicketChat;