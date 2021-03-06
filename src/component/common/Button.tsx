import React from 'react';
import {StyleProp, ViewStyle, useColorScheme, Text} from 'react-native';
import AntButton from '@ant-design/react-native/lib/button';
import {ButtonPropsType} from '@ant-design/react-native/lib/button/PropsType';
import {ButtonStyles} from '@ant-design/react-native/lib/button/style';
import {WithThemeStyles} from '@ant-design/react-native/lib/style';
import {Colors} from '../../constant';
import {Style as styles} from '../../constant/Style';

interface IButtonType extends ButtonPropsType, WithThemeStyles<ButtonStyles> {
  activeStyle?: StyleProp<ViewStyle>;
  onPress?: (_?: any) => void;
  name: string;
}

const Button: React.FC<IButtonType> = ({
  name,
  loading,
  size,
  onPress,
  disabled,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const BtnStyle = {
    backgroundColor: isDarkMode ? Colors.primaryLight : Colors.primary,
    color: Colors.white,
    borderColor: Colors.transparent,
    ...styles.btnStyle,
  };
  const activeStyle = {
    backgroundColor: isDarkMode ? Colors.primary : Colors.primaryLight,
    borderColor: Colors.transparent,
    color: Colors.white,
    ...styles.btnStyle,
  };
  const textStyle = {
    color: Colors.white,
  };
  return (
    <AntButton
      style={BtnStyle}
      activeStyle={activeStyle}
      loading={loading}
      disabled={disabled}
      size={size}
      onPress={onPress}>
      <Text style={textStyle}>{name}</Text>
    </AntButton>
  );
};

const GhostButton: React.FC<IButtonType> = ({
  name,
  loading,
  size,
  onPress,
  disabled,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const BtnStyle = {
    color: isDarkMode ? Colors.white : Colors.primary,
    borderColor: isDarkMode ? Colors.grisaillf : Colors.primary,
    ...styles.btnStyle,
  };
  const textStyle = {
    color: isDarkMode ? Colors.light : Colors.primary,
  };
  const activeStyle = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.lightBg,
    borderColor: isDarkMode ? Colors.lighter : Colors.primaryActive,

    ...styles.btnStyle,
  };
  return (
    <AntButton
      style={BtnStyle}
      activeStyle={[activeStyle]}
      loading={loading}
      disabled={disabled}
      type={'ghost'}
      size={size}
      onPress={onPress}>
      <Text style={textStyle}>{name}</Text>
    </AntButton>
  );
};

export {Button, GhostButton};
