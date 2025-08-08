import * as SecureStore from 'expo-secure-store';
import { CONFIG } from './config';
import { GitHubUser } from './github-api';

/**
 * Secure storage service for managing sensitive data
 */
export class SecureStorageService {
  /**
   * Store GitHub access token securely
   * @param token The access token to store
   */
  static async storeAccessToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(CONFIG.STORAGE_KEYS.GITHUB_ACCESS_TOKEN, token);
    } catch (error) {
      throw new StorageError('Failed to store access token', error);
    }
  }

  /**
   * Retrieve GitHub access token
   * @returns The stored access token or null if not found
   */
  static async getAccessToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(CONFIG.STORAGE_KEYS.GITHUB_ACCESS_TOKEN);
    } catch (error) {
      console.error('Failed to retrieve access token:', error);
      return null;
    }
  }

  /**
   * Store user data securely
   * @param userData The user data to store
   */
  static async storeUserData(userData: GitHubUser): Promise<void> {
    try {
      await SecureStore.setItemAsync(CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    } catch (error) {
      throw new StorageError('Failed to store user data', error);
    }
  }

  /**
   * Retrieve stored user data
   * @returns The stored user data or null if not found
   */
  static async getUserData(): Promise<GitHubUser | null> {
    try {
      const userDataString = await SecureStore.getItemAsync(CONFIG.STORAGE_KEYS.USER_DATA);
      return userDataString ? JSON.parse(userDataString) : null;
    } catch (error) {
      console.error('Failed to retrieve user data:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated (has valid token)
   * @returns True if user has stored access token
   */
  static async isAuthenticated(): Promise<boolean> {
    const token = await this.getAccessToken();
    return token !== null && token.length > 0;
  }

  /**
   * Clear all stored authentication data
   */
  static async clearAuthData(): Promise<void> {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(CONFIG.STORAGE_KEYS.GITHUB_ACCESS_TOKEN),
        SecureStore.deleteItemAsync(CONFIG.STORAGE_KEYS.USER_DATA),
      ]);
    } catch (error) {
      console.error('Failed to clear auth data:', error);
      throw new StorageError('Failed to clear authentication data', error);
    }
  }
}

/**
 * Custom error class for storage operations
 */
export class StorageError extends Error {
  public originalError?: unknown;

  constructor(message: string, originalError?: unknown) {
    super(message);
    this.name = 'StorageError';
    this.originalError = originalError;
  }
}
