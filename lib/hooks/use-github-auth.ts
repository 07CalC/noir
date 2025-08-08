import { useState, useEffect, useCallback } from 'react';
import { GitHubAuthService, AuthStatus } from '../github-auth';
import { GitHubUser } from '../github-api';

/**
 * Custom hook for managing GitHub authentication state
 * 
 * @returns Authentication state and methods
 */
export function useGitHubAuth() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    isAuthenticated: false,
    user: null,
    hasValidToken: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);

  /**
   * Load initial authentication status
   */
  const loadAuthStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      const status = await GitHubAuthService.getAuthStatus();
      setAuthStatus(status);
    } catch (error) {
      console.error('Failed to load auth status:', error);
      setAuthStatus({
        isAuthenticated: false,
        user: null,
        hasValidToken: false,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Sign in with GitHub
   */
  const signIn = useCallback(async () => {
    try {
      setIsSigningIn(true);
      const result = await GitHubAuthService.signIn();
      
      if (result.success && result.user) {
        setAuthStatus({
          isAuthenticated: true,
          user: result.user,
          hasValidToken: true,
        });
      }
      
      return result;
    } catch (error) {
      console.error('Sign in error:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
        errorType: 'UNKNOWN_ERROR' as const,
      };
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  /**
   * Sign out current user
   */
  const signOut = useCallback(async () => {
    try {
      const result = await GitHubAuthService.signOut();
      
      if (result.success) {
        setAuthStatus({
          isAuthenticated: false,
          user: null,
          hasValidToken: false,
        });
      }
      
      return result;
    } catch (error) {
      console.error('Sign out error:', error);
      return {
        success: false,
        error: 'Failed to sign out',
      };
    }
  }, []);

  /**
   * Refresh user data
   */
  const refreshUser = useCallback(async (): Promise<GitHubUser | null> => {
    try {
      const userData = await GitHubAuthService.refreshUserData();
      
      if (userData) {
        setAuthStatus((prev: AuthStatus) => ({
          ...prev,
          user: userData,
        }));
      }
      
      return userData;
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      return null;
    }
  }, []);

  // Load auth status on mount
  useEffect(() => {
    loadAuthStatus();
  }, [loadAuthStatus]);

  return {
    // State
    isAuthenticated: authStatus.isAuthenticated,
    user: authStatus.user,
    hasValidToken: authStatus.hasValidToken,
    isLoading,
    isSigningIn,
    
    // Methods
    signIn,
    signOut,
    refreshUser,
    reload: loadAuthStatus,
  };
}
