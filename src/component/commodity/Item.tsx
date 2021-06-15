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
import {Size, Colors} from '../../constant';
import {Style as styles, basicStyle} from '../../constant/Style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Badge, DisplayPrice, TagNumber} from '../common/Price';
import {displaySaleNumber} from '../../utils/numberUtil';
import {BlankSpace, RetangleGroup} from '../common/Square';
import {TagIconListMap} from '../../common/interface';

const {width} = Dimensions.get('window');

interface IItem {
  title: string;
  content?: string;
  price?: string;
  originPrice?: string;
  discount?: string;
  saleNumber?: number;
  onPress?: (_?: any) => void;
  onLongPress?: (_?: any) => void;
  imageUri?: string;
  // 排列方式
  direction?: 'list' | 'warterfall' | 'min';
  tagList?: string[];
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
  originPrice,
  saleNumber,
  imageUri = '../../assets/default.png',
  direction,
  tagList,
  discount,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  // 瀑布流
  const isWaterfall = direction === 'warterfall';
  // 小图模式
  const isMin = direction === 'min';
  const normalHeight = styles.commodityItemHeight.height / (isMin ? 2 : 1);
  const {backgroundStyle, backgroundStyleLight} = basicStyle(isDarkMode);
  const leftStyle = {
    flex: isWaterfall ? 1 : 2,
  };
  const rightStyle: StyleProp<ViewStyle> = {
    flex: isWaterfall ? 1 : 6,
    marginLeft: isWaterfall ? 0 : 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: isWaterfall ? 'auto' : normalHeight,
    width: isWaterfall ? width / 2 - 40 : 'auto',
  };
  const commodityImage: StyleProp<ImageStyle> = {
    ...styles.commonBorderRadius,
    minHeight: isWaterfall ? normalHeight * 1.4 : normalHeight,
    width: isWaterfall ? width / 2 - 14 : '100%',
    ...backgroundStyle,
  };
  const containerViewStyle: StyleProp<ViewStyle> = [
    styles.flexRowView,
    styles.paddingVertical,
    styles.paddingHorizontal,
    backgroundStyleLight,
    isMin ? styles.btmLine : {},
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
  const maxTextLength = isWaterfall ? 13 : 50 / (isMin ? 2.5 : 1);
  const maxSubTextLength = isWaterfall ? 13 : 50;
  const iTitle =
    title.length > maxTextLength - 5
      ? title.slice(0, maxTextLength - 4) + '...'
      : title;
  const iContent =
    content && content?.length > maxSubTextLength
      ? content.slice(0, maxSubTextLength - 3) + '...'
      : content;
  const renderTagNumber = () => {
    if (saleNumber) {
      return <TagNumber tag="销量:" number={displaySaleNumber(saleNumber)} />;
    }
  };
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
        <TagIconList
          tagList={tagList}
          discount={discount}
          size={isMin ? Size.smaller : Size.small}
        />
        <View style={[styles.flexRowView, styles.paddingVertical]}>
          <DisplayPrice price={price} size="small" originPrice={originPrice} />
          <BlankSpace />
          {renderTagNumber()}
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

export const TagIconList: React.FC<{
  tagList?: string[];
  discount?: string;
  size?: number;
}> = ({tagList, discount, size}) => {
  const renderTag = () => {
    if (tagList && tagList.length > 0) {
      return (
        <View style={styles.flexRowWrap}>
          {tagList.map((tag, key) => {
            const tagMap = TagIconListMap[tag] || {
              color: Colors.green,
              name: '推荐',
            };
            return (
              <Badge
                bgColor={tagMap.color}
                outline={tagMap.outline}
                key={key}
                marginH={3}
                size={size}>
                {tag === 'Discount'
                  ? tagMap.name + (discount || '')
                  : tagMap.name}
              </Badge>
            );
          })}
        </View>
      );
    }
  };
  return <View>{renderTag()}</View>;
};
