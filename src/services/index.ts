import axios, { AxiosInstance } from 'axios';
import { useContext } from 'react';
import { ContextApp } from '../context';

export function useApi(): AxiosInstance {
  const token = localStorage.getItem('token');
  const { user } = useContext(ContextApp);
  const autorization = `${user?.token || token}` || undefined;

  const url = 'http://localhost:5000';

  const api = axios.create({
    baseURL: url,
    headers: { Authorization: autorization },
  });

  return api;
}
