import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { api, setAuthToken } from '../api/axios';

export type UserRole = 'student' | 'admin';

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem('edunova_token');
    if (stored) setToken(stored);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token) setAuthToken(token);
    else setAuthToken(null);
  }, [token]);

  const refreshProfile = useCallback(async () => {
    if (!token) return;
    const res = await api.get('/api/users/profile');
    const u = res.data?.user;
    if (u) {
      setUser({ id: u._id, name: u.name, email: u.email, role: u.role });
    }
  }, [token]);

  useEffect(() => {
    if (token) refreshProfile().catch(() => {
      setToken(null);
      setUser(null);
      window.localStorage.removeItem('edunova_token');
    });
  }, [token, refreshProfile]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.post('/api/auth/login', { email, password });
    const nextToken = res.data?.token;
    if (!nextToken) throw new Error('Login failed');
    window.localStorage.setItem('edunova_token', nextToken);
    setToken(nextToken);
    const profile = res.data?.user;
    if (profile) setUser({ id: profile._id, name: profile.name, email: profile.email, role: profile.role });
    else await refreshProfile();
  }, [refreshProfile]);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const res = await api.post('/api/auth/register', { name, email, password });
    const nextToken = res.data?.token;
    if (!nextToken) throw new Error('Signup failed');
    window.localStorage.setItem('edunova_token', nextToken);
    setToken(nextToken);
    const profile = res.data?.user;
    if (profile) setUser({ id: profile._id, name: profile.name, email: profile.email, role: profile.role });
    else await refreshProfile();
  }, [refreshProfile]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    window.localStorage.removeItem('edunova_token');
    setAuthToken(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, loading, login, signup, logout, refreshProfile }),
    [user, token, loading, login, signup, logout, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

