import * as AuthSession from 'expo-auth-session';
import { Alert } from 'react-native';
import { CONFIG, GITHUB_OAUTH_DISCOVERY } from './config';
import { GitHubApiService, GitHubApiError, GitHubUser } from './github-api';
import { SecureStorageService, StorageError } from './secure-storage';

/**
 * GitHub authentication service using OAuth 2.0
 */
export class GitHubAuthService {
  /**
   * Initiate GitHub OAuth login flow
   * @returns Promise containing authentication result
   */
  static async signIn(): Promise<AuthenticationResult> {
    try {
      // Create OAuth request
      const request = new AuthSession.AuthRequest({
        clientId: CONFIG.GITHUB.CLIENT_ID,
        scopes: [...CONFIG.GITHUB.SCOPES], // Convert readonly array to mutable array
        redirectUri: AuthSession.makeRedirectUri({
          scheme: CONFIG.APP.SCHEME,
        }),
        responseType: AuthSession.ResponseType.Code,
        extraParams: {
          
        },
      });

      console.log('Redirect URI:', request.redirectUri);
      console.log(' Starting GitHub OAuth flow...');

      // Prompt user for authentication
      const result = await request.promptAsync(GITHUB_OAUTH_DISCOVERY);

      if (result.type === 'success') {
        console.log(' OAuth authorization successful');
        
        // Exchange authorization code for access token
        const tokenResponse = await AuthSession.exchangeCodeAsync(
          {
            clientId: CONFIG.GITHUB.CLIENT_ID,
            clientSecret: CONFIG.GITHUB.CLIENT_SECRET,
            code: result.params.code,
            redirectUri: AuthSession.makeRedirectUri({
              scheme: CONFIG.APP.SCHEME,
            }),
          },
          GITHUB_OAUTH_DISCOVERY
        );

        if (tokenResponse.accessToken) {
          console.log(' Access token obtained successfully');
          
          // Fetch user information
          const apiService = new GitHubApiService(tokenResponse.accessToken);
          const userData = await apiService.getCurrentUser();

          // Store credentials securely
          await SecureStorageService.storeAccessToken(tokenResponse.accessToken);
          await SecureStorageService.storeUserData(userData);

          console.log(' User data:', {
            login: userData.login,
            name: userData.name,
            avatar_url: userData.avatar_url,
          });
          console.log(' Access token stored securely');

          return {
            success: true,
            user: userData,
            accessToken: tokenResponse.accessToken,
          };
        } else {
          throw new AuthenticationError('No access token received from GitHub');
        }
      } else if (result.type === 'cancel') {
        console.log(' User cancelled authentication');
        return {
          success: false,
          error: 'Authentication was cancelled by user',
          errorType: 'USER_CANCELLED',
        };
      } else {
        console.log(' Authentication failed:', result);
        return {
          success: false,
          error: 'Authentication failed',
          errorType: 'AUTH_FAILED',
        };
      }
    } catch (error) {
      console.error('💥 GitHub authentication error:', error);
      
      let errorMessage = 'An unexpected error occurred during authentication';
      let errorType: AuthErrorType = 'UNKNOWN_ERROR';

      if (error instanceof GitHubApiError) {
        errorMessage = 'Failed to fetch user information from GitHub';
        errorType = 'API_ERROR';
      } else if (error instanceof StorageError) {
        errorMessage = 'Failed to store authentication data securely';
        errorType = 'STORAGE_ERROR';
      } else if (error instanceof AuthenticationError) {
        errorMessage = error.message;
        errorType = 'AUTH_ERROR';
      }

      return {
        success: false,
        error: errorMessage,
        errorType,
      };
    }
  }

  /**
   * Sign out current user
   * @returns Promise indicating success or failure
   */
  static async signOut(): Promise<{ success: boolean; error?: string }> {
    try {
      console.log(' Signing out user...');
      await SecureStorageService.clearAuthData();
      console.log(' User signed out successfully');
      
      return { success: true };
    } catch (error) {
      console.error(' Sign out error:', error);
      return {
        success: false,
        error: 'Failed to sign out. Please try again.',
      };
    }
  }

  /**
   * Get current authentication status
   * @returns Promise containing authentication status and user data
   */
  static async getAuthStatus(): Promise<AuthStatus> {
    try {
      const [isAuthenticated, userData, accessToken] = await Promise.all([
        SecureStorageService.isAuthenticated(),
        SecureStorageService.getUserData(),
        SecureStorageService.getAccessToken(),
      ]);

      return {
        isAuthenticated,
        user: userData,
        hasValidToken: accessToken !== null,
      };
    } catch (error) {
      console.error('Failed to get auth status:', error);
      return {
        isAuthenticated: false,
        user: null,
        hasValidToken: false,
      };
    }
  }

  /**
   * Refresh user data from GitHub API
   * @returns Updated user data or null if failed
   */
  static async refreshUserData(): Promise<GitHubUser | null> {
    try {
      const accessToken = await SecureStorageService.getAccessToken();
      if (!accessToken) {
        throw new AuthenticationError('No access token available');
      }

      const apiService = new GitHubApiService(accessToken);
      const userData = await apiService.getCurrentUser();
      
      await SecureStorageService.storeUserData(userData);
      return userData;
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      return null;
    }
  }

  /**
   * Show authentication result alert to user
   * @param result Authentication result
   * @param onSuccess Callback for successful authentication
   */
  static showAuthResultAlert(
    result: AuthenticationResult, 
    onSuccess?: (user: GitHubUser) => void
  ): void {
    if (result.success && result.user) {
      Alert.alert(
        '🎉 Login Successful!',
        `Welcome ${result.user.name || result.user.login}!\nYou can now sync your notes with GitHub.`,
        [
          {
            text: 'Continue',
            style: 'default',
            onPress: () => onSuccess?.(result.user!),
          },
        ]
      );
    } else {
      const title = result.errorType === 'USER_CANCELLED' ? 'Login Cancelled' : '❌ Login Failed';
      const message = result.error || 'Please try again';
      
      Alert.alert(title, message, [{ text: 'OK', style: 'default' }]);
    }
  }
}

/**
 * Custom error class for authentication errors
 */
export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

/**
 * Authentication result interface
 */
export interface AuthenticationResult {
  success: boolean;
  user?: GitHubUser;
  accessToken?: string;
  error?: string;
  errorType?: AuthErrorType;
}

/**
 * Authentication status interface
 */
export interface AuthStatus {
  isAuthenticated: boolean;
  user: GitHubUser | null;
  hasValidToken: boolean;
}

/**
 * Authentication error types
 */
export type AuthErrorType = 
  | 'USER_CANCELLED'
  | 'AUTH_FAILED'
  | 'API_ERROR'
  | 'STORAGE_ERROR'
  | 'AUTH_ERROR'
  | 'UNKNOWN_ERROR';
