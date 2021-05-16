import React from 'react';
import {Text, View, useColorScheme, StyleProp, ViewStyle} from 'react-native';
import {Colors, Style as styles} from '../../constant';
import Circle from '../common/Circle';
import Flex from '@ant-design/react-native/lib/flex';

const MyHeader: React.FC<{}> = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const viewStyle: StyleProp<ViewStyle> = {
    ...styles.modalViewStyle,
    backgroundColor: isDarkMode ? Colors.dark : Colors.white,
  };
  return (
    <View style={viewStyle}>
      <Flex>
        <Circle name="Z" size={60} />
        <Text>早上好，VIP</Text>
      </Flex>
    </View>
  );
};

export default MyHeader;
