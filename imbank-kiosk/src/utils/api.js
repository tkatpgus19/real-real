import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
  withCredentials: true,
});

export const getMainTicket = () => api.get(`/ticket/2`, { withCredentials: true });
export const getMainButton = () => api.get(`/button/2`, { withCredentials: true });
export const getLayoutList = () => api.get(`/layout/list/${2}`, { withCredentials: true });
