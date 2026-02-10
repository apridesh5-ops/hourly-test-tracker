// src/config.ts (create this file)
export const API_BASE_URL = 
  process.env.NODE_ENV === 'production' 
    ? 'http://127.0.0.1:3000'  // Electron backend
    : 'http://localhost:3000';  // Development
