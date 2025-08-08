import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { GitHubAuthService } from '../lib/github-auth';
import { GitHubUser } from '../lib/github-api';
import { SecureStorageService } from '../lib/secure-storage';

export default function TestScreen() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const [userData, token] = await Promise.all([
        SecureStorageService.getUserData(),
        SecureStorageService.getAccessToken(),
      ]);
      
      setUser(userData);
      setAccessToken(token);
      
      // Log to console as requested
      if (userData && token) {
        console.log('=== GITHUB AUTH SUCCESS ===');
        console.log('Username:', userData.login);
        console.log('Access Token:', token);
        console.log('===========================');
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    const result = await GitHubAuthService.signOut();
    if (result.success) {
      setUser(null);
      setAccessToken(null);
      console.log(' User signed out successfully');
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <Text className="text-xl text-black dark:text-white">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black p-6">
      <View className="items-center">
        <Text className="mb-6 text-3xl font-bold text-black dark:text-white">
          GitHub Authentication Test
        </Text>

        {user ? (
          <View className="w-full">
            {/* User Avatar */}
            {user.avatar_url && (
              <View className="mb-4 items-center">
                <Image 
                  source={{ uri: user.avatar_url }} 
                  className="h-24 w-24 rounded-full"
                />
              </View>
            )}

            {/* User Info */}
            <View className="mb-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <Text className="mb-2 text-lg font-semibold text-green-600 dark:text-green-400">
                 Authentication Successful!
              </Text>
              
              <View className="space-y-2">
                <InfoRow label="Username" value={user.login} />
                <InfoRow label="Name" value={user.name || 'Not provided'} />
                <InfoRow label="Email" value={user.email || 'Not provided'} />
                <InfoRow label="Public Repos" value={user.public_repos.toString()} />
                <InfoRow label="Followers" value={user.followers.toString()} />
                <InfoRow label="Following" value={user.following.toString()} />
              </View>
            </View>

            {/* Access Token (truncated for security) */}
            <View className="mb-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <Text className="mb-2 font-semibold text-black dark:text-white">
                Access Token (truncated):
              </Text>
              <Text className="font-mono text-sm text-gray-600 dark:text-gray-400">
                {accessToken ? `${accessToken.substring(0, 8)}...${accessToken.substring(accessToken.length - 8)}` : 'Not available'}
              </Text>
            </View>

            {/* Sign Out Button */}
            <TouchableOpacity
              className="rounded-lg bg-red-500 px-6 py-3"
              onPress={handleSignOut}>
              <Text className="text-center text-lg font-semibold text-white">
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="w-full items-center">
            <Text className="mb-4 text-lg text-red-500">
               Not authenticated
            </Text>
            <Text className="text-center text-gray-600 dark:text-gray-400">
              Please go back to the onboarding screen and sign in with GitHub.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View className="flex-row justify-between">
      <Text className="font-medium text-gray-700 dark:text-gray-300">{label}:</Text>
      <Text className="text-black dark:text-white">{value}</Text>
    </View>
  );
}
