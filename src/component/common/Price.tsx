import React from 'react';
import {StyleProp, Text, useColorScheme, View, ViewStyle} from 'react-native';
import {Colors, Size} from '../../constant';
import {basicStyle, Style as styles} from '../../constant/Style';
import {iSymbols} from '../../constant/const';
import {displayPrice} from '../../utils/numberUtil';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BlankSpace} from './Square';

interface IPrice {
  price?: string | number;
  originPrice?: string | number;
  size?: 'lg' | 'default' | 'small';
}
/**
 * 价格
 */
export const DisplayPrice: React.FC<IPrice> = ({price, size, originPrice}) => {
  const color = {
    color: Colors.deepSky,
  };
  const priceView: StyleProp<ViewStyle> = [
    styles.flexRowView,
    {alignItems: 'baseline'},
  ];
  const currencyStyle = {
    ...color,
    fontSize:
      size === 'small'
        ? Size.smaller
        : size === 'lg'
        ? Size.normal
        : Size.normalLight,
  };
  const priceStyle = {
    ...color,
    fontSize:
      size === 'small'
        ? Size.normal
        : size === 'lg'
        ? Size.header1
        : Size.header,
  };
  const renderOriginPrice = () => {
    if (originPrice) {
      return (
        <View style={styles.flexRowView}>
          <BlankSpace />
          <TagNumber
            tag="原价:"
            number={iSymbols.YUAN + displayPrice(originPrice)}
            textDecorationLine="line-through"
          />
        </View>
      );
    }
  };
  return (
    <View style={styles.flexRowView}>
      <View style={priceView}>
        <Text style={currencyStyle}>{iSymbols.YUAN}</Text>
        <Text style={priceStyle}>{displayPrice(price || '')}</Text>
      </View>
      {renderOriginPrice()}
    </View>
  );
};

/**
 * 标签名+数据：如“销量：666”
 */
export const TagNumber: React.FC<{
  tag?: string;
  number?: string;
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through';
}> = ({tag, number, textDecorationLine}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {colorLight} = basicStyle(isDarkMode);
  return (
    <View style={styles.flexRowView}>
      <Text style={[colorLight, {fontSize: Size.smaller}]}>{tag}</Text>
      <Text
        style={[
          colorLight,
          {fontSize: Size.smaller},
          {textDecorationLine: textDecorationLine || 'none'},
        ]}>
        {number}
      </Text>
    </View>
  );
};

/**
 * 徽章
 */
export const Badge: React.FC<{
  color?: string;
  bgColor?: string;
  outline?: boolean;
  onPress?: (_?: any) => {};
}> = ({children, color, bgColor, outline, onPress}) => {
  const viewStyle = {
    backgroundColor: outline ? Colors.transparent : bgColor || Colors.primary,
    borderWidth: outline ? 1 : 0,
    borderColor: bgColor || Colors.primary,
  };
  return (
    <TouchableOpacity
      style={[styles.badge, viewStyle]}
      onPress={onPress}
      disabled={onPress ? false : true}>
      <Text
        style={{
          color: outline ? bgColor || Colors.primary : color || Colors.white,
          fontSize: Size.small,
        }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
