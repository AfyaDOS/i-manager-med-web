import React, { useCallback, useState } from 'react';
import { ContextApp } from '.';
import { useApi } from '../services';

const ContextProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const api = useApi();

  const login = useCallback(async ({ email, password }) => {
    try {
      await api.post('/login', { email, password });

      setIsAuthenticated(true);

      return true;
    } catch (error) {
      return false;
    }
  }, []);

  return (
    <ContextApp.Provider value={{ user: { isAuthenticated }, login }}>
      {children}
    </ContextApp.Provider>
  );
};

export { ContextProvider };
