import './global.css';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { useMemo } from 'react';

import 'react-native-gesture-handler';
import RootNavigator from './navigation/root-navigator';

export default function App() {
  const colorScheme = useColorScheme();

  const theme = useMemo(
    () => (colorScheme === 'dark' ? DarkTheme : DefaultTheme),
    [colorScheme]
  );

  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
