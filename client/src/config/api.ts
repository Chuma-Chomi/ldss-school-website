// In production (built app), use the Environment Variable VITE_API_URL.
// This allows Netlify to point to your Render backend (e.g., https://ldss-backend.onrender.com).
// If NOT set (e.g., local dev), fallback to localhost:5000.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_URL;
