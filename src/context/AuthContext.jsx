import { createContext, useEffect, useState } from 'react';
import { loginWithTelegram } from '../api/authApi.js';
import { useTelegram } from '../hooks/useTelegram.js';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { initData, mockUser } = useTelegram();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authenticate = async () => {
      try {
        setLoading(true);
        const { token, user: authedUser } = await loginWithTelegram({ initData, mockUser });
        localStorage.setItem('tilup_token', token);
        setUser(authedUser);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    authenticate();
  }, [initData, mockUser]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
