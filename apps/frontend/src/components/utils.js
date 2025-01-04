// export const getApiBaseUrl = () => {
//     if (window.location.hostname.includes('github.dev')) {
//       // Convert frontend URL to backend URL by changing port
//       return window.location.origin.replace('-3000.', '-8080.');
//     }
//     return 'http://localhost:8080';
// };

// src/api/axios.ts
import axios from 'axios';

const getBaseUrl = () => {
  const hostname = window.location.hostname;
  if (hostname.includes('github.dev')) {
    const prefix = hostname.split('-3000')[0];
    return `https://${prefix}-8080.app.github.dev`;
  }
  return 'http://localhost:8080';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  maxRedirects: 5,
  withCredentials: true
});

export default api;