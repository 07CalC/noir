import type { StaticScreenProps } from '@react-navigation/native';
import { ScreenContent } from 'components/ScreenContent';

import { StyleSheet, View } from 'react-native';

type Props = StaticScreenProps<{
  name: string;
}>;

export default function Details({ route }: Props) {
  return (
    <View style={styles.container}>
      <ScreenContent
        path="screens/details.tsx"
        title={`Showing details for user ${route.params?.name}`}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
