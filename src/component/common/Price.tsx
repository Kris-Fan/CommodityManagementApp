import React from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {Colors, Style as styles, Size} from '../../constant';
import {iSymbols} from '../../constant/const';
import {displayPrice} from '../../utils/numberUtil';

/**
 * 价格
 */
export const DisplayPrice: React.FC<{price?: string | number}> = ({price}) => {
  const color = {
    color: Colors.deepSky,
  };
  const priceView: StyleProp<ViewStyle> = [
    styles.flexRowView,
    {alignItems: 'baseline'},
  ];
  return (
    <View style={priceView}>
      <Text style={[color, {fontSize: Size.smaller}]}>{iSymbols.YUAN}</Text>
      <Text style={[color, {fontSize: Size.normal}]}>
        {displayPrice(price || '')}
      </Text>
    </View>
  );
};
