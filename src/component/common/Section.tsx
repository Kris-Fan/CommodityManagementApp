import React from 'react';
import {Text, useColorScheme, View} from 'react-native';
import {Colors, Style as styles} from '../../constant';

/**
 * 标题-内容组件
 */
const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const renderChildren = () => {
    if (children) {
      return (
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>
          {children}
        </Text>
      );
    }
  };
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      {renderChildren()}
    </View>
  );
};

export default Section;
