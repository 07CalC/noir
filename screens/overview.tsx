import { useNavigation } from '@react-navigation/native';
import { ScreenContent } from 'components/ScreenContent';

import { StyleSheet, View } from 'react-native';

import { Button } from '../components/Button';

export default function Overview() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScreenContent path="screens/overview.tsx" title="Overview"></ScreenContent>
      <Button
        onPress={() =>
          navigation.navigate('Details', {
            name: 'Dan',
          })
        }
        title="Show Details"
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
