import { createStackNavigator } from '@react-navigation/stack';
import TestScreen from 'screens/test-screen';
import OnboardingScreen from '../screens/onboarding-screen';
import LoginScreen from '../screens/login-screen';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="onboarding">
      <Stack.Screen
        name="onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="test" component={TestScreen} options={{ headerShown: false }} />
      <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
