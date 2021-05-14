import React from 'react';
import {Text, View, useColorScheme, StyleProp, ViewStyle} from 'react-native';
import {Colors, Style as styles} from '../../constant';
import Circle from '../common/Circle';
import Flex from '@ant-design/react-native/lib/flex';

const MyHeader: React.FC<{}> = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const viewStyle: StyleProp<ViewStyle> = {
    ...styles.textArea,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <View style={viewStyle}>
      <Flex>
        <Flex.Item>
          <Circle name="G" size={60} />
        </Flex.Item>
        <Flex.Item>
          <Text>lalaalla</Text>
        </Flex.Item>
      </Flex>
    </View>
  );
};

export default MyHeader;
