import React from 'react';

import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {Colors, Size} from '../../constant';
import Add from './Add';
import Status from './Status';
import Home from './Home';
import {Platform} from 'react-native';
import Icon from '../common/Icon';

const CommodityNavigator = createMaterialTopTabNavigator(
  {
    /*Page1路由*/
    CommodityHome: {
      /*Page1页面*/
      screen: Home,
      /*屏幕导航选项,可以定制导航器显示屏幕的方式（头部标题，选项卡标签等）*/
      navigationOptions: {
        /*导航标签名*/
        tabBarLabel: '首页',
        /*导航呈现的图标*/
        tabBarIcon: ({tintColor}) => {
          if (tintColor === Colors.primary) {
            return (
              <Icon
                fillName={'home'}
                style={{fontSize: 30, color: tintColor}}
              />
            );
          }
          return (
            <Icon
              name={'home'}
              style={{fontSize: Size.iconSize, color: tintColor}}
            />
          );
        },
      },
    },
    CommodityAdd: {
      screen: Add,
      navigationOptions: {
        tabBarLabel: '添加商品',
        tabBarIcon: ({tintColor}) => {
          if (tintColor === Colors.primary) {
            return (
              <Icon
                fillName={'plus-circle'}
                style={{fontSize: 30, color: tintColor}}
              />
            );
          }
          return (
            <Icon
              name={'appstore-add'}
              style={{fontSize: Size.iconSize, color: tintColor}}
            />
          );
        },
      },
    },
    CommodityStatus: {
      screen: Status,
      navigationOptions: {
        tabBarLabel: '商品分析',
        tabBarIcon: ({tintColor}) => {
          if (tintColor === Colors.primary) {
            return (
              <Icon
                fillName={'build'}
                style={{fontSize: 30, color: tintColor}}
              />
            );
          }
          return (
            <Icon
              name={'block'}
              style={{fontSize: Size.iconSize, color: tintColor}}
            />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      /*设置活动选项卡标签的颜色*/
      activeTintColor: Platform.OS === 'ios' ? Colors.primary : Colors.primary,
      inactiveTintColor: Colors.grisaillf, //label和icon的前景色 活跃状态下（未选中）
      style: {
        backgroundColor: Colors.white,
        justifyContent: 'space-around',
      },
      showIcon: true,
      indicatorStyle: {
        height: 0,
      },
    },
    tabBarPosition: 'bottom',
  },
);

export default CommodityNavigator;
