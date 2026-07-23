import { createContext, useCallback, useEffect, useState } from 'react';
import { registerUser, loginUser, googleLogin } from '../api/authApi.js';
import { getCurrentUser } from '../api/userApi.js';

export const AuthContext = createContext(null);

const TOKEN_KEY = 'tilup_token';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On startup, restore the session from a stored token.
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }
    getCurrentUser()
      .then(setUser)
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  const applySession = useCallback(({ token, user: authedUser }) => {
    localStorage.setItem(TOKEN_KEY, token);
    setUser(authedUser);
    return authedUser;
  }, []);

  const register = useCallback((payload) => registerUser(payload).then(applySession), [applySession]);
  const login = useCallback((payload) => loginUser(payload).then(applySession), [applySession]);
  const loginWithGoogle = useCallback(
    (credential) => googleLogin(credential).then(applySession),
    [applySession]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const refreshUser = useCallback(() => getCurrentUser().then(setUser), []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, register, login, loginWithGoogle, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
