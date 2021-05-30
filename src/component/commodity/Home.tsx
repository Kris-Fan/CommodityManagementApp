import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleProp,
  Text,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import {
  Colors,
  Style as styles,
  basicStyle,
  Size,
  BaseUrl,
  ImageUrl,
} from '../../constant';
import {NavigationInjectedProps} from 'react-navigation';
import {HeaderName, SearchHeader} from '../common/Header';
import Icon from '../common/Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {OutlineGlyphMapType} from '@ant-design/icons-react-native/lib/index';
import {Item} from './Item';
import {BlankLine} from '../common/Square';
import {displayPrice} from '../../utils/numberUtil';

/**
 * 商品首页
 */
const Home: React.FC<NavigationInjectedProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {backgroundStyle, backgroundStyleLight, color, colorLight} = basicStyle(
    isDarkMode,
  );
  return (
    <SafeAreaView style={[styles.fullScreen, backgroundStyle]}>
      <HeaderName title="" bgColor={Colors.primary} />
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={Colors.transparent}
      />
      <SearchHeader
        headerLeft={
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="left" color={Colors.white} size={Size.iconSizeLight} />
          </TouchableOpacity>
        }
        primary
      />
      <SearchFilter />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View>
          <Item
            title={'测试商品名称'}
            price={displayPrice(666)}
            content={
              '测试商品名称测试商品名称测试商品名称测试商品名称测试商品名称测试商品名称测试商品名称测试商品名称测试商品名称测试商品名称'
            }
            saleNumber={990}
            onPress={() => navigation.navigate('CommodityDetail')}
            imageUri={
              BaseUrl + ImageUrl + '/1622369730110/1622369730124_7023.png'
            }
          />
          <Item
            title={'测试商品名4'}
            price={displayPrice(666)}
            content={'contentcontentcontentcontentcontentcontent'}
            onPress={() => navigation.navigate('CommodityDetail')}
            imageUri={BaseUrl + ImageUrl + '/test.png'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const SearchFilter: React.FC<{}> = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {backgroundStyle, backgroundStyleLight, color, colorLight} = basicStyle(
    isDarkMode,
  );
  const viewStyle: StyleProp<ViewStyle> = [
    backgroundStyleLight,
    styles.flexRowView,
    styles.paddingHorizontal,
    styles.paddingVertical,
    {justifyContent: 'space-between'},
  ];
  return (
    <View style={viewStyle}>
      <FilterItem
        name="综合"
        textStyle={[colorLight, {fontSize: Size.small}]}
      />
      <FilterItem
        name="销量"
        textStyle={[colorLight, {fontSize: Size.small}]}
        needUpDown
      />
      <FilterItem
        name="价格"
        textStyle={[colorLight, {fontSize: Size.small}]}
        needUpDown
      />
      <FilterItem
        name=" "
        textStyle={{borderRightColor: colorLight.color, borderRightWidth: 0.2}}
        icon={{name: 'align-left', ...colorLight}}
      />
      <FilterItem name="筛选" icon={{name: 'filter', ...colorLight}} />
    </View>
  );
};

const FilterItem: React.FC<{
  name: string;
  textStyle?: StyleProp<TextStyle>;
  icon?: {name: OutlineGlyphMapType; color: string};
  needUpDown?: boolean;
  onPress?: (_?: any) => void;
}> = ({name, textStyle, icon, needUpDown, onPress}) => {
  const renderRightIcon = () => {
    if (icon) {
      return <Icon name={icon.name} color={icon.color} size={Size.normal} />;
    }
  };
  const renderUpDown = () => {
    if (needUpDown) {
      return (
        <View>
          <Icon
            fillName="caret-up"
            color={Colors.primary}
            size={Size.smaller}
          />
          <Icon fillName="caret-down" color={Colors.gray} size={Size.smaller} />
        </View>
      );
    }
  };
  return (
    <TouchableOpacity
      style={[styles.flexRowView, styles.paddingHorizontal]}
      onPress={onPress}>
      {renderRightIcon()}
      <Text style={textStyle}>{name}</Text>
      {renderUpDown()}
    </TouchableOpacity>
  );
};

export default Home;
