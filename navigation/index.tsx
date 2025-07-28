import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Overview from '../screens/overview';
import Details from '../screens/details';
import { BackButton } from '../components/BackButton';

const Stack = createStackNavigator({
  screens: {
    Overview: {
      screen: Overview,
    },
    Details: {
      screen: Details,
      options: ({ navigation }) => ({
        headerLeft: () => <BackButton onPress={navigation.goBack} />,
      }),
    },
  },
});

type RootNavigatorParamList = StaticParamList<typeof Stack>;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootNavigatorParamList {}
  }
}

const Navigation = createStaticNavigation(Stack);
export default Navigation;
