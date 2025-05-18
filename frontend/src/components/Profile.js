import React, { useEffect, useState } from 'react';

function Profile({ token, onLogout }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:8000/api/profile/', {
        headers: {
          'Authorization': 'Token ' + token
        }
      })
        .then(res => res.json())
        .then(data => setUserInfo(data));
    }
  }, [token]);

  if (!userInfo) return <div>Chargement des infos utilisateur...</div>;

  return (
    <div>
      <h2>Bienvenue {userInfo.username}</h2>
      {userInfo.is_staff && <p><strong>Vous êtes ADMIN</strong></p>}
      <button onClick={onLogout}>Se déconnecter</button>
    </div>
  );
}

export default Profile;
