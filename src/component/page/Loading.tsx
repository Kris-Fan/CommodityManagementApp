import React from 'react';
import {
  StyleProp,
  ViewStyle,
  useColorScheme,
  Dimensions,
  View,
  Text,
} from 'react-native';
import {Colors, Size} from '../../constant';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '../common/Icon';
import {FillGlyphMapType} from '@ant-design/icons-react-native/lib/index';
import {OutlineGlyphMapType} from '@ant-design/icons-react-native/lib/index';

const {height} = Dimensions.get('window');

export enum LoadingEnum {
  // 正在加载中
  LOADING = 'loading',
  // 没有数据
  EMPTY = 'inbox',
  // 没有找到相关信息
  NOT_FOUND = 'file-search',
  // 未知错误
  ERROR = 'meh',
  // 无网络
  NET_ERROR = 'disconnect',
  // 系统异常
  SYS_ERROR = 'robot',
}

enum TipsEnum {
  loading = '正在加载中',
  inbox = '没有数据',
  'file-search' = '没有找到相关信息',
  meh = '未知错误',
  disconnect = '无网络',
  robot = '系统异常',
}

interface ILoading {
  type?: LoadingEnum;
  icon?: {
    name?: OutlineGlyphMapType;
    fillName?: FillGlyphMapType;
    // 图标颜色
    color?: string;
  };
  text?: string;
}
/**
 * 加载中
 */
export const Loading: React.FC<ILoading> = ({type, icon, text}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lightBg,
  };
  const color = {
    color: isDarkMode ? Colors.gray : Colors.darker,
  };
  const iconStyle = {
    color: Colors.primary,
    fontSize: Size.iconBig,
  };
  const containerStyle: StyleProp<ViewStyle> = {
    ...backgroundStyle,
    height,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const viewStyle: StyleProp<ViewStyle> = {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <SafeAreaView style={containerStyle}>
      <View style={viewStyle}>
        <Icon
          name={icon?.name || type || LoadingEnum.EMPTY}
          fillName={icon?.fillName}
          style={iconStyle}
        />
        <Text style={color}>{text || TipsEnum[type || 'inbox']}</Text>
      </View>
    </SafeAreaView>
  );
};
