import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/api-token-auth/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          setError(null);
          setSuccess(true);
          setTimeout(() => navigate('/'), 1000);
        } else {
          setSuccess(false);
          setError("Identifiants incorrects. Veuillez réessayer.");
        }
      })
      .catch(() => {
        setSuccess(false);
        setError("Erreur serveur. Veuillez réessayer.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4">
      <Card className="w-full max-w-md border shadow-md rounded-2xl bg-white">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>

          {(error || success) && (
            <div className="mb-4 space-y-2">
              {error && (
                <div className="bg-red-100 text-red-800 border border-red-200 rounded-md px-4 py-2 text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-100 text-green-800 border border-green-200 rounded-md px-4 py-2 text-sm">
                  Connexion réussie ! Redirection...
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
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
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                required
              />
            </div>

            <Button type="submit" className="w-full mt-4" style={{borderRadius: '10px'}}>
              Se connecter
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
