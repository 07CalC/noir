import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function OnboardingScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const navigation = useNavigation<any>();

  return (
    <View className={`flex-1 justify-center items-center p-6 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <Image
        source={require('../assets/paw.png')}
        className="w-full h-1/3 mb-6 mt-10"
        resizeMode="cover"
      />

      <Text className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
        Capture your thoughts. Keep them yours.
      </Text>

      <Text className={`text-xl mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Your notes, your way — offline-first, Markdown-powered, and fully yours.
      </Text>

      <View className="w-full px-4 mt-auto mb-5">
        <Text className={`text-lg mb-4 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Choose how you want to get started:
        </Text>
        <TouchableOpacity
          className="bg-[#f3a49d] py-4 px-6 rounded-lg mb-4 items-center"
          onPress={() => navigation.navigate('test')}
        >
          <Text className="text-white font-semibold text-lg">Continue Offline</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border-2 border-[#f3a49d] flex flex-row justify-center gap-x-5 py-4 px-6 rounded-lg items-center"
          onPress={() => navigation.navigate('login')}
        >
          <Ionicons name="logo-github" size={24} color={ACCENT_COLOR} />

          <Text className="text-[#f3a49d] font-semibold text-lg">Sign in with GitHub</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ACCENT_COLOR = '#f3a49d';

