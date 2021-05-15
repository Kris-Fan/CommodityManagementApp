import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import {Colors, Style as styles} from '../../constant';
import Group1 from './Group1';
import Group2 from './Group2';

const TopTabNavigator = createMaterialTopTabNavigator(
  {
    /*Page1路由*/
    Group1: {
      /*Page1页面*/
      screen: Group1,
      /*屏幕导航选项,可以定制导航器显示屏幕的方式（头部标题，选项卡标签等）*/
      navigationOptions: {
        /*导航标签名*/
        tabBarLabel: '联系人1',
      },
    },
    Group2: {
      screen: Group2,
      navigationOptions: {
        tabBarLabel: '联系人2',
      },
    },
  },
  {
    tabBarOptions: {
      tabStyle: {
        minWidth: 4,
      }, //设置单个tab的样式
      upperCaseLabel: false, //是否使标签大写，默认为true
      scrollEnabled: true, //是否支持 选项卡滚动，默认false
      activeTintColor: Colors.primary, //label和icon的前景色 活跃状态下（选中）
      inactiveTintColor: Colors.gray, //label和icon的前景色 活跃状态下（未选中）
      style: {
        backgroundColor: Colors.transparent, //TabBar 的背景颜色
        marginLeft: -20,
        paddingLeft: 0,
      },
      indicatorStyle: {
        height: 6,
        maxWidth: 24,
        backgroundColor: Colors.primary,
        borderRadius: 3,
        marginLeft: 50,
      }, //设置 indicator(tab下面的那条线)的样式
      labelStyle: {
        ...styles.tabBar,
        marginTop: 0,
        marginBottom: 1,
        marginLeft: 0,
        paddingLeft: 0,
      }, //设置TabBar标签的样式
      allowFontScaling: true,
    },
  },
);

export default TopTabNavigator;
