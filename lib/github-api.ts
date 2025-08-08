import { CONFIG } from './config';

/**
 * GitHub API service for making authenticated requests
 */
export class GitHubApiService {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  /**
   * Get authenticated user information from GitHub
   * @returns Promise containing user data
   */
  async getCurrentUser(): Promise<GitHubUser> {
    try {
      console.log('🌐 Making request to GitHub API...');
      console.log('🔗 URL:', `${CONFIG.GITHUB_API.BASE_URL}${CONFIG.GITHUB_API.USER_ENDPOINT}`);
      
      const response = await fetch(`${CONFIG.GITHUB_API.BASE_URL}${CONFIG.GITHUB_API.USER_ENDPOINT}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': CONFIG.APP.NAME,
        },
      });

      console.log(' Response status:', response.status);
      console.log(' Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(' GitHub API Error:', errorText);
        throw new GitHubApiError(`Failed to fetch user data: ${response.status} ${response.statusText}`);
      }

      const userData = await response.json();
      console.log(' User data received successfully');
      return userData;
    } catch (error) {
      console.error('🚨 Network/API Error:', error);
      if (error instanceof TypeError && error.message.includes('Network request failed')) {
        throw new GitHubApiError('Network connectivity issue. Please check your internet connection.');
      }
      throw error;
    }
  }

  /**
   * Get user's repositories
   * @param options Repository query options
   * @returns Promise containing array of repositories
   */
  async getUserRepositories(options: RepositoryQueryOptions = {}): Promise<GitHubRepository[]> {
    const queryParams = new URLSearchParams({
      visibility: options.visibility || 'all',
      sort: options.sort || 'updated',
      direction: options.direction || 'desc',
      per_page: (options.perPage || 30).toString(),
      page: (options.page || 1).toString(),
    });

    const response = await fetch(
      `${CONFIG.GITHUB_API.BASE_URL}${CONFIG.GITHUB_API.REPOS_ENDPOINT}?${queryParams}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': CONFIG.APP.NAME,
        },
      }
    );

    if (!response.ok) {
      throw new GitHubApiError(`Failed to fetch repositories: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

/**
 * Custom error class for GitHub API errors
 */
export class GitHubApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GitHubApiError';
  }
}

/**
 * GitHub User interface
 */
export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

/**
 * GitHub Repository interface
 */
export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  html_url: string;
  clone_url: string;
  ssh_url: string;
  default_branch: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string | null;
}

/**
 * Repository query options
 */
export interface RepositoryQueryOptions {
  visibility?: 'all' | 'public' | 'private';
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
  perPage?: number;
  page?: number;
}
