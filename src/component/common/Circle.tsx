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
import {TouchableOpacity} from 'react-native-gesture-handler';
import {OutlineGlyphMapType} from '@ant-design/icons-react-native/lib/index';
import {Colors, Size} from '../../constant';
import Icon from './Icon';
import {basicStyle} from '../../constant/Style';

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
    backgroundColor:
      bgColors[name.charCodeAt(0) % bgColors.length] || Colors.gray, // 转化ascii码取余
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
    <TouchableOpacity style={viewStyle}>
      <Text style={textStyle}>{name}</Text>
    </TouchableOpacity>
  );
};

/**
 * 半透明圆形按钮
 */
export const CircleButton: React.FC<{
  iconName: OutlineGlyphMapType;
  name?: string;
  onPress?: (_?: any) => void;
  size?: number;
  color?: string;
  bgColor?: string;
}> = ({iconName, name, size, color, bgColor, onPress}) => {
  const viewStyle: StyleProp<ViewStyle> = {
    alignItems: 'center',
    backgroundColor: bgColor || Colors.transparent2,
    borderRadius: size || Size.iconSizeLight + 10,
    paddingHorizontal: 4,
    paddingVertical: 4,
    marginHorizontal: 2,
  };

  const renderText = () => {
    if (name) {
      return <Text style={{color: color || Colors.white}}>{name}</Text>;
    }
  };
  return (
    <TouchableOpacity style={viewStyle} onPress={onPress}>
      <Icon
        name={iconName}
        color={color || Colors.white}
        size={size || Size.iconSizeLight}
      />
      {renderText()}
    </TouchableOpacity>
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
