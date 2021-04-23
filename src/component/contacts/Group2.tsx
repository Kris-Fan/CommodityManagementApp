import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Button,
  useColorScheme,
} from 'react-native';
import {Section} from '..';
import {Colors} from '../../constant';
import {NavigationInjectedProps} from 'react-navigation';

const Group2: React.FC<NavigationInjectedProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={backgroundStyle}>
          <Section title="Group2">Group2Group2Group2Group2</Section>
          <Button
            onPress={() => navigation.navigate('ContactDetail')}
            title="Go to Details 66"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Group2;
