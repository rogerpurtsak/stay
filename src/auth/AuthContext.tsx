import { createContext, useContext, useEffect, useState } from 'react';
import { tokenStorage } from './tokenStorage';
import { apiClient } from '../api/client';

type AuthUser = {
  userId: string;
  displayName: string;
  token: string;
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  login: (token: string, userId: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tokenStorage.load().then(token => {
      if (token) {
        apiClient.get<{ id: string; displayName: string }>('/api/auth/me')
          .then(me => setUser({ token, userId: me.id, displayName: me.displayName }))
          .catch(() => tokenStorage.clear())
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });
  }, []);

  const login = async (token: string, userId: string, displayName: string) => {
    await tokenStorage.save(token);
    setUser({ token, userId, displayName });
  };

  const logout = async () => {
    await tokenStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
