import React, { useCallback, useState } from 'react';
import { ContextApp } from '.';
import { useApi } from '../services';

interface IUser{
  name: string;
  id: string;
}

const ContextProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser>();
  const [token, setToken] = useState<string | undefined>();
  const api = useApi();

  const login = useCallback(async ({ email, password }) => {
    try {
      const { data } = await api.post('/login', { email, password });

      if (data) {
        setToken(data.token);
        setUser({ name: data.name, id: data.id });
        setIsAuthenticated(true);
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
      }

      return true;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }, []);

  return (
    <ContextApp.Provider value={{ user: { ...user, isAuthenticated, token }, login }}>
      {children}
    </ContextApp.Provider>
  );
};

export { ContextProvider };
