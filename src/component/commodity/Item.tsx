import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
  Image,
  ImageStyle,
} from 'react-native';
import {Colors, Size} from '../../constant';
import {Style as styles, basicStyle} from '../../constant/Style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DisplayPrice} from '../common/Price';
import {displaySaleNumber} from '../../utils/numberUtil';

interface IItem {
  title: string;
  content?: string;
  price?: string;
  saleNumber?: number;
  onPress?: (_?: any) => void;
  onLongPress?: (_?: any) => void;
  imageUri?: string;
}

/**
 * 商品list，列表显示
 */
export const Item: React.FC<IItem> = ({
  onPress,
  onLongPress,
  title,
  content,
  price,
  saleNumber,
  imageUri = '../../assets/default.png',
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {backgroundStyle, backgroundStyleLight, color, colorLight} = basicStyle(
    isDarkMode,
  );
  const leftStyle = {
    flex: 2,
  };
  const rightStyle: StyleProp<ViewStyle> = {
    flex: 6,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    ...styles.commodityItemHeight,
  };
  const titleStyle: StyleProp<TextStyle> = {
    ...styles.sectionTitle,
    ...color,
    fontSize: Size.normalLight,
  };
  const contentStyle: StyleProp<TextStyle> = {
    ...styles.sectionDescription,
    ...colorLight,
    fontSize: Size.small,
    marginTop: 1,
  };
  const commodityImage: StyleProp<ImageStyle> = {
    ...styles.commonBorderRadius,
    ...styles.commodityItemHeight,
    width: '100%',
    ...backgroundStyle,
  };
  const iContent =
    content && content?.length > 50 ? content.slice(0, 47) + '...' : content;
  return (
    <TouchableOpacity
      style={[
        styles.flexRowView,
        styles.paddingVertical,
        styles.paddingHorizontal,
        backgroundStyleLight,
      ]}
      onPress={onPress}
      onLongPress={onLongPress}>
      <View style={leftStyle}>
        <Image
          source={{uri: imageUri}}
          style={commodityImage}
          resizeMode="cover"
        />
      </View>
      <View style={rightStyle}>
        <View>
          <Text style={titleStyle}>{title}</Text>
          <Text style={contentStyle}>{iContent}</Text>
        </View>
        <View style={[styles.flexRowView, styles.paddingVertical]}>
          <DisplayPrice price={price} />
          <Text
            style={[
              colorLight,
              {fontSize: Size.smaller},
              styles.paddingHorizontal,
            ]}>
            销量: {displaySaleNumber(saleNumber)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

/**
 * waterfall瀑布流
 */
