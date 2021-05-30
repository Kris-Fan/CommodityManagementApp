import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  useColorScheme,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  Colors,
  Size,
  SearchUrl,
  SiginUrl,
  PermissionUrl,
  StaticsUrl,
  ChartsUrl,
  StaticsCustomerUrl,
} from '../../constant';
import {Style as styles, basicStyle} from '../../constant/Style';
import {Square, RetangleGroup, BlankLine} from '../common/Square';
import {HeaderName, SearchHeader} from '../common/Header';
// import Popover from '@ant-design/react-native/lib/popover';
import Icon from '../common/Icon';
import Modal from '@ant-design/react-native/lib/modal';
import {Button} from '../common/Button';
import {NavigationInjectedProps} from 'react-navigation';
import {MoreDetail} from './MoreDetail';
/**
 * 首页
 */
const HomePage: React.FC<NavigationInjectedProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const {backgroundStyle, colorLight} = basicStyle(isDarkMode);
  return (
    <SafeAreaView style={styles.fullScreen}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.transparent}
        translucent
      />
      <HeaderName title="" bgColor={Colors.primary} />
      {/* 顶部栏 */}
      <SearchHeader
        headerRight={
          <MorePopover navigation={navigation} color={colorLight.color} />
        }
        primary
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <BlankLine />
        <RetangleGroup title="商品管理">
          <Square
            name="全部商品"
            icon={{fillName: 'appstore', color: Colors.primaryLight}}
            onPress={() => navigation.navigate('CommodityNavigator')}
          />
          <Square
            name="添加商品"
            icon={{name: 'appstore-add', color: Colors.sand}}
            onPress={() => navigation.navigate('CommodityAdd')}
          />
          <Square
            name="历史订单"
            icon={{fillName: 'tags', color: Colors.primaryLight}}
          />
          <Square
            name="创建进货单"
            icon={{fillName: 'file-add', color: Colors.sand}}
          />
          <Square
            name="进货记录"
            icon={{fillName: 'file-text', color: Colors.sand}}
          />

          <Square
            name="补单"
            icon={{name: 'block', color: Colors.watermelon}}
          />
          <Square name="" />
          <Square name="" />
        </RetangleGroup>
        <BlankLine />
        <RetangleGroup title="数据统计">
          <Square
            name="客户分析"
            icon={{fillName: 'contacts', color: Colors.primaryLight}}
            onPress={() =>
              navigation.navigate('MyWebView', {
                url: StaticsCustomerUrl + '/404',
              })
            }
          />
          <Square
            name="统计图表"
            descName="进/出货统计"
            icon={{name: 'area-chart', color: Colors.coral}}
            onPress={() => navigation.navigate('MyWebView', {url: ChartsUrl})}
          />
          <Square
            name="利润分析"
            icon={{fillName: 'money-collect', color: Colors.sand}}
            onPress={() => navigation.navigate('MyWebView', {url: StaticsUrl})}
          />
          <Square name="" />
        </RetangleGroup>
        <BlankLine />
        <RetangleGroup title="权限管理">
          <Square
            name="账户管理"
            descName="子账户权限"
            icon={{fillName: 'unlock', color: Colors.primaryLight}}
            onPress={() =>
              navigation.navigate('MyWebView', {url: PermissionUrl})
            }
          />
          <Square
            name="新增子账户"
            icon={{name: 'key', color: Colors.greenLight}}
            onPress={() => navigation.navigate('MyWebView', {url: SiginUrl})}
          />
          <Square name="" />
          <Square name="" />
        </RetangleGroup>
        <BlankLine needFill />
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * 首页-更多功能浮层
 */
const MorePopover: React.FC<NavigationInjectedProps & {color?: string}> = ({
  color,
  navigation,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const viewStyle: StyleProp<ViewStyle> = {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
  };
  const iconStyle = {
    fontSize: Size.iconSize,
    color: Colors.white,
    marginHorizontal: 5,
  };
  const scanStyle = {
    paddingHorizontal: 10,
  };
  const modalViewStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lightBg,
    ...styles.modalViewStyle,
  };
  const [visible, setVisible] = useState(false);
  const onPressShowModal = () => setVisible(true);
  const onClose = () => setVisible(false);
  return (
    <View style={viewStyle}>
      <TouchableOpacity onPress={onPressShowModal} style={scanStyle}>
        <Icon name="scan" style={iconStyle} />
      </TouchableOpacity>
      {/*更多浮层 */}
      <Modal
        popup
        visible={visible}
        animationType="slide-up"
        onClose={onClose}
        closable
        maskClosable
        style={styles.transBackground}>
        <View style={modalViewStyle}>
          <HeaderName
            title="扫一扫"
            color={color}
            descBottpm="可识别商品条形码，联系人二维码"
          />
          <MoreDetail navigation={navigation} onClose={onClose} />
          <Button name="关闭" onPress={onClose} />
        </View>
      </Modal>
    </View>
  );
};

export default HomePage;
