import React, { useCallback, useState } from 'react';
import { ContextApp } from '.';
import api from '../services';

const ContextProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
