import { createContext, useContext, useEffect, useState } from 'react';
import { tokenStorage } from './tokenStorage';
import { guestTokenStorage } from './guestTokenStorage';
import { apiClient } from '../api/client';

type AuthUser = {
  userId: string;
  displayName: string;
  token: string;
};

type AuthContextType = {
  user: AuthUser | null;
  guestToken: string | null;
  loading: boolean;
  login: (token: string, userId: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [guestToken, setGuestToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = await tokenStorage.load();
      if (token) {
        try {
          const me = await apiClient.get<{ id: string; displayName: string }>('/api/auth/me');
          setUser({ token, userId: me.id, displayName: me.displayName });
        } catch {
          await tokenStorage.clear();
        }
      }
      const gt = await guestTokenStorage.getOrCreate();
      setGuestToken(gt);
      setLoading(false);
    };
    init();
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
    <AuthContext.Provider value={{ user, guestToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
