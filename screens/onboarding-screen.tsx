import { View, Text, TouchableOpacity, useColorScheme, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import App from 'utils/github-auth';

export default function OnboardingScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const navigation = useNavigation<any>();

  return (
    <View
      className={`flex-1 items-center justify-center p-6 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <Image
        source={require('../assets/paw.png')}
        className="mb-6 mt-10 h-1/3 w-full"
        resizeMode="cover"
      />

      <Text className={`mb-2 text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
        Capture your thoughts. Keep them yours.
      </Text>

      <Text
        className={`mb-8 text-xl leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Your notes, your way — offline-first, Markdown-powered, and fully yours.
      </Text>

      <View className="mb-5 mt-auto w-full px-4">
        <Text
          className={`mb-4 text-center text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Choose how you want to get started:
        </Text>
        <TouchableOpacity
          className="mb-4 items-center rounded-lg bg-[#f3a49d] px-6 py-4"
          onPress={() => navigation.navigate('test')}>
          <Text className="text-lg font-semibold text-white">Continue Offline</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex flex-row items-center justify-center gap-x-5 rounded-lg border-2 border-[#f3a49d] px-6 py-4"
          onPress={() => navigation.navigate('login')}>
          <Ionicons name="logo-github" size={24} color={ACCENT_COLOR} />

          <Text className="text-lg font-semibold text-[#f3a49d]">Sign in with GitHub</Text>
        </TouchableOpacity>
        <App />
      </View>
    </View>
  );
}

const ACCENT_COLOR = '#f3a49d';
