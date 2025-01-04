export const getApiBaseUrl = () => {
    if (window.location.hostname.includes('github.dev')) {
      // Convert frontend URL to backend URL by changing port
      return window.location.origin.replace('-3000.', '-8080.');
    }
    return 'http://localhost:8080';
};