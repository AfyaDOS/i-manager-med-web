/* eslint-disable no-unused-vars */
import { createContext } from 'react';

interface IData {
  email?: string;
  password?: string;
}

interface IContext {
  login: (data: IData) => Promise<boolean>;
  user: {
    id?: string;
    name?: string;
    isAuthenticated: boolean;
    token?: string;
  };
}

const ContextApp = createContext<IContext>({} as IContext);

export { ContextApp };
