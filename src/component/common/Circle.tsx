import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  useColorScheme,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {Colors} from '../../constant';

const styles = StyleSheet.create({
  circle: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2,
  },
});

const bgColors = [
  Colors.primaryLight,
  Colors.sand,
  Colors.greenLight,
  Colors.watermelon,
  Colors.primary,
];
/**
 * 圆形文字头像
 */
const Circle: React.FC<{name: string; size?: number}> = ({name, size}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const viewStyle: StyleProp<ViewStyle> = {
    ...circleSize(size),
    backgroundColor: isDarkMode
      ? Colors.darker
      : bgColors[name.charCodeAt(0) % bgColors.length] || Colors.gray, // 转化ascii码取余
    borderColor: isDarkMode ? Colors.gray : Colors.lighter,
    borderWidth: isDarkMode ? 0.2 : 0,
    borderStyle: 'solid',
  };

  const textStyle: StyleProp<TextStyle> = {
    fontSize: textSize(size),
    textAlign: 'center',
    color: '#fff',
    padding: 5,
  };
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{name}</Text>
    </View>
  );
};

const circleSize = (size: number | undefined = 36) => {
  if (isNaN(size)) {
    size = 36;
  }
  return {
    ...styles.circle,
    width: size,
    height: size,
    borderRadius: Math.ceil(size / 2),
  };
};

const textSize = (size: number | undefined = 36) => {
  if (isNaN(size)) {
    return 19;
  }
  return Math.ceil(size / 2);
};

export default Circle;
