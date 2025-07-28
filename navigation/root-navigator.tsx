import { createStackNavigator } from "@react-navigation/stack";
import TestScreen from "screens/test-screen";


const Stack = createStackNavigator();



export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="test"
        component={TestScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

