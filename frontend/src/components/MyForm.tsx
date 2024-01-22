import React, { useState } from 'react';
import { socket } from '../Socket';

export function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    // This is how you emit an event and get a response back via the server callback "response".
    socket.timeout(5000).emit('hello_from_client', value, (err: string, statusCode: number) => {
      if (err) {
        console.log(err);
      } else {
        console.log(statusCode);
      }
      setIsLoading(false);
    });
  }
  return (
    <form onSubmit={onSubmit}>
      <input onChange={(e) => setValue(e.target.value)} />

      <button type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
}
