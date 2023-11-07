import { createContext, useContext } from 'react';

interface SessionContextType {
  userId: number | null;
  login: (userId: number) => void;
  logout: () => void;
}

export const SessionContext = createContext<SessionContextType | undefined>(undefined);

export default function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
