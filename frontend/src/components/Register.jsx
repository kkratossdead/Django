import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();


  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setSuccess(false);
      return;
    }
    else{
      fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password,email }),
      })
      .then(res => res.json().then(data => ({ status: res.status, data })))
      .then(({ status, data }) => {
        if (status === 201) {
          setSuccess(true);
          setError(null);
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setSuccess(false);
          setError(data.error || 'Erreur inconnue.');
        }
      })
      .catch(() => setError('Erreur serveur. Veuillez réessayer.'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4">
      <Card className="w-full max-w-md shadow-md border border-gray-200 rounded-2xl bg-white">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Créer un compte</h2>

          {(error || success) && (
            <div className="mb-4 space-y-2">
              {error && (
                <div className="bg-red-100 text-red-800 border border-red-200 rounded-md px-4 py-2 text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-100 text-green-800 border border-green-200 rounded-md px-4 py-2 text-sm">
                  Inscription réussie ! Redirection vers la connexion...
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Entrez votre nom"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre email"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe sécurisé"
                required
              />              
            </div>
            <div>
              <Label htmlFor="confirm_password">Confirmer le mot de passe</Label>
              <Input
                id="confirm_password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmer le mot de passe"
                required
              />              
            </div>

            <Button type="submit" className="w-full mt-4" style={{borderRadius: '10px'}}>
              S'inscrire
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
