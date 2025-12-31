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
  // In production, use relative paths (Netlify proxy handles routing)
  if (apiConfig.isProduction) {
    return endpoint;
  }
  // For local development, use relative paths (Vite proxy handles routing)
  return endpoint;
};
