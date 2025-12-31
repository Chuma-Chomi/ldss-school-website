// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const apiConfig = {
  baseURL: API_BASE_URL,
  // For local development, use relative paths (will use Vite proxy)
  // For production, use relative paths (will use Netlify proxy)
  isProduction: import.meta.env.PROD,
};

// Helper function to get the correct API URL
export const getApiUrl = (endpoint: string) => {
  // Debug logging
  console.log('Environment:', import.meta.env.PROD ? 'production' : 'development');
  console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
  console.log('Endpoint:', endpoint);
  console.log('Current token in sessionStorage:', sessionStorage.getItem('token') ? 'Exists' : 'Not found');
  
  // In production, use relative paths (Netlify proxy handles routing)
  if (apiConfig.isProduction) {
    console.log('Using relative path for production:', endpoint);
    return endpoint;
  }
  // For local development, use relative paths (Vite proxy handles routing)
  console.log('Using relative path for development:', endpoint);
  return endpoint;
};
