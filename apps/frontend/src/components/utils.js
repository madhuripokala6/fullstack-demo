import axios from 'axios';

const getBaseUrl = () => {
  const hostname = window.location.hostname;
  console.log('hostname---->', hostname);
  if (hostname.includes('github.dev')) {
    const prefix = hostname.split('-3000')[0];
    console.log(`https://${prefix}-8080.app.github.dev`)
    return `https://${prefix}-8080.app.github.dev`;
  }
  return 'http://localhost:8080';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  maxRedirects: 5
});

export default api;