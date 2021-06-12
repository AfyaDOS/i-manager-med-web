import axios, { AxiosInstance } from 'axios';
import { useContext } from 'react';
import { ContextApp } from '../context';

const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2Y2FlNTJkLTkzNGMtNDk5MS05NDU3LTk3Njg4ZTg3YWI0YiIsIm5hbWUiOiJtYXJjZWxvIiwiaWF0IjoxNjIzNDU4NzYxLCJleHAiOjE2MjM1NDUxNjF9.UnlGjgtp6ITcTk-MYycl6r51C_YZFeJYgXQZtXyfyMc';

export function useApi(): AxiosInstance {
  const { user } = useContext(ContextApp);
  const autorization = `${user?.token || authToken}` || undefined;

  const url = 'http://localhost:5000';

  const api = axios.create({
    baseURL: url,
    headers: { Authorization: autorization },
  });

  return api;
}
