import React from 'react';
import {Platform} from 'react-native';
// import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

import {HomePage, CartPage, MePage} from '..';
import ContactsPageTab from '../contacts/TopTab';
import {createAppContainer} from 'react-navigation';
import {Colors} from '../../constant';
// import {Home, Grid} from '../common/Icon';

const iconSize = 26;
const iconSizeLight = 22;

const BottomTabNavigator = createBottomTabNavigator(
  {
    /*Page1路由*/
    HomePage: {
      /*Page1页面*/
      screen: HomePage,
      /*屏幕导航选项,可以定制导航器显示屏幕的方式（头部标题，选项卡标签等）*/
      navigationOptions: {
        /*导航标签名*/
        tabBarLabel: '首页',
        /*导航呈现的图标*/
        tabBarIcon: ({tintColor}) => (
          /*第三方图标库（图标名称，图标大小，图标样式*/
          <Icon name={'home'} size={iconSize} style={{color: tintColor}} />
        ),
      },
    },
    ContactsPage: {
      screen: createAppContainer(ContactsPageTab),
      navigationOptions: {
        tabBarLabel: '联系人',
        tabBarIcon: ({tintColor}) => (
          /*第三方图标库（图标名称，图标大小，图标样式*/
          <Icon name={'team'} size={iconSize} style={{color: tintColor}} />
        ),
      },
    },
    CartPage: {
      screen: CartPage,
      navigationOptions: {
        tabBarLabel: '订单',
        tabBarIcon: ({tintColor}) => (
          /*第三方图标库（图标名称，图标大小，图标样式*/
          <Icon name={'tagso'} size={iconSize} style={{color: tintColor}} />
        ),
      },
    },
    MePage: {
      screen: MePage,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({tintColor}) => (
          /*第三方图标库（图标名称，图标大小，图标样式*/
          <Icon
            name={'smileo'}
            size={iconSizeLight}
            style={{color: tintColor}}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      /*设置活动选项卡标签的颜色*/
      activeTintColor: Platform.OS === 'ios' ? Colors.primary : Colors.primary,
      style: {
        backgroundColor: Colors.white,
      },
    },
  },
);

// const BottomTab = () => {
//   return createAppContainer(BottomTabNavigator);
// };

export default BottomTabNavigator;
