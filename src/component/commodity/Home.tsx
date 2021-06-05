import React, {useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleProp,
  Text,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import {Colors, Size, BaseUrl, ImageUrl, Mock} from '../../constant';
import {Style as styles, basicStyle} from '../../constant/Style';
import {NavigationInjectedProps} from 'react-navigation';
import {HeaderName, SearchHeader} from '../common/Header';
import Icon from '../common/Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {OutlineGlyphMapType} from '@ant-design/icons-react-native/lib/index';
import Toast from '@ant-design/react-native/lib/toast';
import {Item} from './Item';
import {BlankLine} from '../common/Square';
import {displayPrice} from '../../utils/numberUtil';
import {Loading, LoadingEnum} from '../page/Loading';
import _ from 'lodash';
import {commodityItemType} from '../../common/interface/commodity';

declare type ISortType =
  | 'default'
  | 'price-up'
  | 'price-down'
  | 'sale-up'
  | 'sale-down';
/**
 * 商品首页
 */
const Home: React.FC<NavigationInjectedProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {backgroundStyle, backgroundStyleLight, color, colorLight} = basicStyle(
    isDarkMode,
  );
  // 列表视图
  const [isWaterfall, setWaterFall] = useState(false);
  const [viewStyle, setViewStyle] = useState<ViewStyle>({});
  const flatListRef = useRef<FlatList>(null);
  const changeTheView = () => {
    setWaterFall(!isWaterfall);
    if (isWaterfall) {
      setViewStyle({});
    } else {
      setViewStyle({...styles.flexRowView, flexWrap: 'wrap'});
    }
    return isWaterfall;
  };
  const [showFilter, setShowFilter] = useState(true);
  // 排序方式：默认、销量、价格
  const moreFilter = () => {};
  const [refresh, setRefresh] = useState(false);
  let initScrollPoi = 0;
  const [cData, setCData] = useState<commodityItemType[]>(
    Mock.COMMODITY_DATA.data,
  );
  const sortCommodity = (iData: commodityItemType[]) => {
    setCData(iData);
  };
  return (
    <SafeAreaView style={[backgroundStyle]}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={Colors.transparent}
      />
      <View style={{backgroundColor: Colors.primary}}>
        <HeaderName title="" bgColor={Colors.primary} />
        <SearchHeader
          headerLeft={
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Icon
                name="left"
                color={Colors.white}
                size={Size.iconSizeLight}
              />
            </TouchableOpacity>
          }
          primary
        />
      </View>

      <SearchFilter
        changeView={changeTheView}
        moreFilter={moreFilter}
        visiable={showFilter}
        current={flatListRef.current}
        sort={sortCommodity}
      />
      <FlatList
        ref={flatListRef}
        data={cData}
        keyExtractor={(item: commodityItemType, index) => item.id + index}
        renderItem={({item}) => (
          <Item
            title={`${item.name} ${item.type}`}
            price={displayPrice(item.sellPrice)}
            content={item.description || '备注信息:' + item.comment}
            saleNumber={item.sellNumber}
            onPress={() => navigation.navigate('CommodityDetail', {item})}
            imageUri={BaseUrl + ImageUrl + '/test.png'}
            direction={isWaterfall ? 'warterfall' : 'list'}
          />
        )}
        ListEmptyComponent={() => <Loading type={LoadingEnum.EMPTY} />}
        ListFooterComponent={() => (
          <View>
            <BlankLine height={200} />
          </View>
        )}
        onRefresh={() => {
          setRefresh(true);
          setTimeout(() => {
            setRefresh(false);
            Toast.info('刷新成功', 1);
          }, 3000);
        }}
        refreshing={refresh}
        contentContainerStyle={viewStyle}
        onScroll={({nativeEvent}) => {
          if (
            nativeEvent.contentOffset.y < 50 ||
            nativeEvent.contentOffset.y <= initScrollPoi + 30
          ) {
            setShowFilter(true);
          } else {
            setShowFilter(false);
          }
          initScrollPoi = nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={2000}
      />
    </SafeAreaView>
  );
};

/**
 * 排序与筛选组件
 */
const SearchFilter: React.FC<
  React.RefObject<FlatList> & {
    changeView?: (_?: any) => boolean;
    sort: (_?: any) => void;
    moreFilter: (_?: any) => void;
    visiable: boolean;
  }
> = ({changeView, moreFilter, visiable, current, sort}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {backgroundStyleLight, colorLight} = basicStyle(isDarkMode);
  const viewStyle: StyleProp<ViewStyle> = [
    backgroundStyleLight,
    styles.flexRowView,
    styles.paddingHorizontal,
    styles.paddingVertical,
    {justifyContent: 'space-between'},
    {display: visiable ? 'flex' : 'none'},
  ];
  const [iconView, setIconView] = useState(false);
  const [sortState, setSortState] = useState<ISortType>('default');
  const onPressSort = (sortType: ISortType) => {
    if (sortType === 'default') {
      sort(Mock.COMMODITY_DATA.data);
    }

    if (sortType === 'price-up') {
      const result = _.sortBy(
        Mock.COMMODITY_DATA.data,
        (a: commodityItemType) => a.sellPrice,
      );
      sort(result);
    }

    if (sortType === 'price-down') {
      const result = _.sortBy(
        Mock.COMMODITY_DATA.data,
        (a: commodityItemType) => -a.sellPrice,
      );
      sort(result);
    }

    if (sortType === 'sale-up') {
      const result = _.sortBy(
        Mock.COMMODITY_DATA.data,
        (a: commodityItemType) => a.sellNumber || 0,
      );
      sort(result);
    }

    if (sortType === 'sale-down') {
      const result = _.sortBy(
        Mock.COMMODITY_DATA.data,
        (a: commodityItemType) => -(a.sellNumber || 0),
      );
      sort(result);
    }
    setSortState(sortType);
  };
  const itemColor = (type: string) => {
    return sortState.includes(type) ? tintColor : colorLight;
  };
  const tintItemUpdown = (type: ISortType, item: 'price' | 'sale') => {
    return type === `${item}-up`
      ? 'up'
      : type === `${item}-down`
      ? 'down'
      : 'none';
  };
  return (
    <View style={viewStyle}>
      <FilterItem
        name="默认"
        textStyle={[itemColor('default'), {fontSize: Size.small}]}
        onPress={() => {
          onPressSort('default');
        }}
      />
      <FilterItem
        name="销量"
        textStyle={[itemColor('sale'), {fontSize: Size.small}]}
        tintUpdown={tintItemUpdown(sortState, 'sale')}
        onPress={() => {
          if (sortState === 'sale-up') {
            onPressSort('sale-down');
          } else {
            onPressSort('sale-up');
          }
        }}
      />
      <FilterItem
        name="价格"
        textStyle={[itemColor('price'), {fontSize: Size.small}]}
        tintUpdown={tintItemUpdown(sortState, 'price')}
        onPress={() => {
          if (sortState === 'price-up') {
            onPressSort('price-down');
          } else {
            onPressSort('price-up');
          }
        }}
      />
      <FilterItem
        name=" "
        textStyle={{borderRightColor: colorLight.color, borderRightWidth: 0.2}}
        icon={{
          name: iconView === true ? 'align-left' : 'appstore',
          ...colorLight,
        }}
        onPress={() => {
          setIconView(!iconView);
          if (changeView) {
            changeView();
          }
        }}
      />
      <FilterItem
        name="筛选"
        textStyle={[colorLight, {fontSize: Size.small}]}
        icon={{name: 'filter', ...colorLight}}
        onPress={moreFilter}
      />
    </View>
  );
};

const FilterItem: React.FC<{
  name: string;
  textStyle?: StyleProp<TextStyle>;
  icon?: {name: OutlineGlyphMapType; color: string};
  tintUpdown?: 'none' | 'up' | 'down';
  onPress?: (_?: any) => void;
}> = ({name, textStyle, icon, tintUpdown, onPress}) => {
  const renderRightIcon = () => {
    if (icon) {
      return <Icon name={icon.name} color={icon.color} size={Size.normal} />;
    }
  };
  const renderUpDown = () => {
    if (tintUpdown) {
      return (
        <View>
          <Icon
            fillName="caret-up"
            color={tintUpdown === 'up' ? tintColor.color : Colors.gray}
            size={Size.smaller}
          />
          <Icon
            fillName="caret-down"
            color={tintUpdown === 'down' ? tintColor.color : Colors.gray}
            size={Size.smaller}
          />
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

const tintColor = {
  color: Colors.deepSky,
};

export default Home;
