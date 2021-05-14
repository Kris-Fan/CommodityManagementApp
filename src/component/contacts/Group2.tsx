import React from 'react';
import {SafeAreaView, ScrollView, useColorScheme} from 'react-native';
import {Button, GhostButton} from '../common/Button';
import {Section} from '..';
import {Colors, Style as styles} from '../../constant';
import {NavigationInjectedProps} from 'react-navigation';
import Toast from '@ant-design/react-native/lib/toast';
import SearchBar from '../common/SearchBar';

const Group2: React.FC<NavigationInjectedProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lightBg,
    ...styles.textArea,
  };
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <SearchBar placeholder={'搜索'} onSubmit={value => Toast.fail(value)} />
        <Section title="Group2">Group2Group2Group2Group2</Section>
        <Button
          name={'go to Detail'}
          onPress={() => navigation.navigate('ContactDetail', {name: 'goPL'})}
        />
        <GhostButton
          name={'go to Detail'}
          size={'small'}
          onPress={() => navigation.navigate('ContactDetail', {name: 'goPL'})}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Group2;
