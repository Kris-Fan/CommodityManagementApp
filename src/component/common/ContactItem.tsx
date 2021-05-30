import React from 'react';
import {
  Text,
  useColorScheme,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {Colors, Size} from '../../constant';
import {Style as styles} from '../../constant/Style';
import Circle from './Circle';
import Flex from '@ant-design/react-native/lib/flex';

/**
 * 联系人-内容组件
 */
const ContactItem: React.FC<{
  title: string;
  onPress?: (_?: any) => void;
  onLongPress?: (_?: any) => void;
}> = ({title, children, onPress, onLongPress}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const avatar = title.slice(0, 1);
  const titleStyle: StyleProp<TextStyle> = {
    ...styles.sectionTitle,
    color: isDarkMode ? Colors.white : Colors.dark,
    fontSize: Size.normal,
  };
  const contentStyle: StyleProp<TextStyle> = {
    ...styles.sectionDescription,
    color: Colors.gray,
    fontSize: Size.small,
    marginTop: 1,
    paddingBottom: 10,
    ...styles.btmLine,
  };
  const itemStyle: StyleProp<ViewStyle> = {
    marginBottom: 20,
  };
  const leftStyle = {
    flex: 1,
  };
  const rightStyle = {
    flex: 6,
  };
  return (
    <View style={itemStyle}>
      <Flex justify="start" wrap="nowrap">
        <View style={leftStyle}>
          <Circle name={avatar} />
        </View>
        <TouchableOpacity
          style={rightStyle}
          onPress={onPress}
          onLongPress={onLongPress}>
          <View>
            <Text style={titleStyle}>{title}</Text>
            <Text style={contentStyle}>{children}</Text>
          </View>
        </TouchableOpacity>
      </Flex>
    </View>
  );
};

export default ContactItem;
