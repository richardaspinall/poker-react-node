interface ConnectionStateProps {
  isConnected: boolean;
}

export function ConnectionState({ isConnected }: ConnectionStateProps) {
  return (
    <p className={`connection-badge ${isConnected ? 'is-online' : 'is-offline'}`}>
      {isConnected ? 'Live connection' : 'Disconnected'}
    </p>
  );
}
