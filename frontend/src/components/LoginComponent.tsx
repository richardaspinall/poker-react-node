// LoginComponent.tsx
import React, { useState } from 'react';
import FetchFasade from '../fetch/FetchFasade';

const LoginComponent: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await FetchFasade.post('/api/login', { username, password });
      // Handle response data, update the state or redirect as needed
      console.log(response);
      const responseCheck = await FetchFasade.post('/api/actions', {});
      console.log(responseCheck);
    } catch (error) {
      // Handle error, show message to the user
      console.log('error');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginComponent;
