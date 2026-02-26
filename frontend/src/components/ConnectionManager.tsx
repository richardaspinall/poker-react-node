import { socket } from '../Socket';

// https://socket.io/how-to/use-with-react
export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <div className="connection-actions">
      <button type="button" onClick={connect}>
        Connect
      </button>
      <button type="button" onClick={disconnect}>
        Disconnect
      </button>
    </div>
  );
}
