// VocalVerse Frontend Configuration

// Get API URL from environment variable or use default
const API_URL = import.meta.env.VITE_API_URL || 'https://vocal-verse-production.up.railway.app';

// For local development, change this to:
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export { API_URL }; 