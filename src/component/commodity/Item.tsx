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
  Dimensions,
} from 'react-native';
import {Size} from '../../constant';
import {Style as styles, basicStyle} from '../../constant/Style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DisplayPrice, TagNumber} from '../common/Price';
import {displaySaleNumber} from '../../utils/numberUtil';
import {BlankSpace} from '../common/Square';

const {width} = Dimensions.get('window');

interface IItem {
  title: string;
  content?: string;
  price?: string;
  saleNumber?: number;
  onPress?: (_?: any) => void;
  onLongPress?: (_?: any) => void;
  imageUri?: string;
  direction?: 'list' | 'warterfall';
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
  direction,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const isWaterfall = direction === 'warterfall';
  const {backgroundStyle, backgroundStyleLight} = basicStyle(isDarkMode);
  const leftStyle = {
    flex: isWaterfall ? 1 : 2,
  };
  const rightStyle: StyleProp<ViewStyle> = {
    flex: isWaterfall ? 1 : 6,
    marginLeft: isWaterfall ? 0 : 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: isWaterfall ? 'auto' : styles.commodityItemHeight.height,
    width: isWaterfall ? width / 2 - 40 : 'auto',
  };
  const commodityImage: StyleProp<ImageStyle> = {
    ...styles.commonBorderRadius,
    height: isWaterfall
      ? styles.commodityItemHeight.height * 1.4
      : styles.commodityItemHeight.height,
    width: isWaterfall ? width / 2 - 14 : '100%',
    ...backgroundStyle,
  };
  const containerViewStyle: StyleProp<ViewStyle> = [
    styles.flexRowView,
    styles.paddingVertical,
    styles.paddingHorizontal,
    backgroundStyleLight,
  ];
  if (isWaterfall) {
    containerViewStyle.push({flexDirection: 'column', flex: 3});
    containerViewStyle.push({
      ...styles.commonBorderRadius,
      margin: 4,
      paddingVertical: 0,
      paddingHorizontal: 1,
    });
  }
  const maxTextLength = isWaterfall ? 13 : 50;
  const iTitle =
    title.length > maxTextLength - 5
      ? title.slice(0, maxTextLength - 4) + '...'
      : title;
  const iContent =
    content && content?.length > maxTextLength
      ? content.slice(0, maxTextLength - 3) + '...'
      : content;
  return (
    <TouchableOpacity
      style={containerViewStyle}
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
        <CommodityTitle title={iTitle} content={iContent} />
        <View style={[styles.flexRowView, styles.paddingVertical]}>
          <DisplayPrice price={price} size="small" />
          <BlankSpace />
          <TagNumber tag="销量:" number={displaySaleNumber(saleNumber)} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const CommodityTitle: React.FC<{
  title?: string;
  content?: string;
  bold?: boolean;
}> = ({title, content, bold}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {color, colorLight} = basicStyle(isDarkMode);
  const titleStyle: StyleProp<TextStyle> = {
    ...styles.sectionTitle,
    ...color,
    fontSize: bold ? Size.normal : Size.normalLight,
    fontWeight: bold ? '700' : 'normal',
  };
  const contentStyle: StyleProp<TextStyle> = {
    ...styles.sectionDescription,
    ...colorLight,
    fontSize: Size.small,
    marginTop: 1,
  };
  return (
    <View>
      <Text style={titleStyle}>{title}</Text>
      <Text style={contentStyle}>{content}</Text>
    </View>
  );
};
