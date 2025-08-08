/**
 * Application configuration constants
 * 
 */

export const CONFIG = {
  // GitHub OAuth Configuration
  GITHUB: {
    CLIENT_ID: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID || '', // Loaded from .env file
    CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || '', // Loaded from .env file (server-side only)
    SCOPES: ['repo', 'user'], 
  },

  // App Configuration
  APP: {
    SCHEME: 'noir', // Custom URL scheme for OAuth redirects
    NAME: 'Noir',
  },

  // Storage Keys
  STORAGE_KEYS: {
    GITHUB_ACCESS_TOKEN: 'github_access_token',
    USER_DATA: 'user_data',
  },

  // API Endpoints
  GITHUB_API: {
    BASE_URL: 'https://api.github.com',
    USER_ENDPOINT: '/user',
    REPOS_ENDPOINT: '/user/repos',
  },
} as const;

// OAuth Discovery endpoints for GitHub
export const GITHUB_OAUTH_DISCOVERY = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: `https://github.com/settings/connections/applications/${CONFIG.GITHUB.CLIENT_ID}`,
} as const;
