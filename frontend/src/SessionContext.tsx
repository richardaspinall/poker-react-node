import { useState, ReactNode } from 'react';

import { SessionContext } from './useSession';

interface SessionProviderProps {
  children: ReactNode;
}

// https://chat.openai.com/c/0eb51099-7e09-42fd-992d-d98382221ab7
export function SessionProvider({ children }: SessionProviderProps) {
  const [userId, setUserId] = useState<number | null>(null);

  const login = (userId: number) => {
    setUserId(userId);
  };

  const logout = () => {
    setUserId(null);
  };

  return <SessionContext.Provider value={{ userId, login, logout }}>{children}</SessionContext.Provider>;
}
