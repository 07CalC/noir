import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const navigation = useNavigation<any>(); 

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000' : '#fff' },
      ]}
    >
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
        Welcome to the App
      </Text>
      <Text
        style={[styles.subtitle, { color: isDarkMode ? '#ccc' : '#333' }]}
      >
        This is a placeholder for your onboarding content.
      </Text>

      {/* Continue Offline → goes to test screen */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('test')}
      >
        <Text style={styles.primaryText}>Continue Offline</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('login')}
      >
      <Text style={styles.secondaryText}>Sign in with GitHub</Text>
      </TouchableOpacity>

    </View>
  );
}

const ACCENT_COLOR = '#f3a49d';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  primaryButton: {
    backgroundColor: ACCENT_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
    width: '15%',
    alignItems: 'center',
  },
  primaryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    borderColor: ACCENT_COLOR,
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '15%',
    alignItems: 'center',
  },
  secondaryText: {
    color: ACCENT_COLOR,
    fontWeight: '600',
    fontSize: 16,
  },
});
