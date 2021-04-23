import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  SectionList,
  Text,
} from 'react-native';
import {Section} from '..';
import {Colors, Style as styles} from '../../constant';

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const Group1: React.FC<{}> = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SectionList
        style={backgroundStyle}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item, index}) => (
          <Section title="Group1">
            {item} + {index}
          </Section>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
};

export default Group1;
