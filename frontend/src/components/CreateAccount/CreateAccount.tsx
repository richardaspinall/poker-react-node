import React, { useState, ChangeEvent, FormEvent } from 'react';
import { socket } from '../../Socket';

export function CreateAccount() {
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    // This is how you emit an event and get a response back via the server callback "response".
    socket.timeout(5000).emit('hello_from_client', formData.username, (err: Error, statusCode: number) => {
      if (err) {
        console.log(err);
      } else {
        console.log(statusCode);
      }
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        Create Account
      </button>
    </form>
  );
}
