import React from 'react';
import {
  StyleProp,
  ViewStyle,
  useColorScheme,
  Dimensions,
  Text,
  TextStyle,
  Animated,
  Easing,
} from 'react-native';
import {Colors, Size} from '../../constant';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '../common/Icon';
import {FillGlyphMapType} from '@ant-design/icons-react-native/lib/index';
import {OutlineGlyphMapType} from '@ant-design/icons-react-native/lib/index';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AnimatedValue} from 'react-navigation';
import {Button} from '../common/Button';

const {height} = Dimensions.get('window');

export enum LoadingEnum {
  // 正在加载中
  LOADING = 'loading-3-quarters',
  // 超时
  TIMEOUT = 'global',
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
  'loading-3-quarters' = '正在加载中',
  global = '超时',
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
  button?: {
    name: string;
    onPress: (_?: any) => void;
  };
}
/**
 * 加载中
 */
export const Loading: React.FC<ILoading> = ({type, icon, text, button}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lightBg,
  };
  const color = {
    color: isDarkMode ? Colors.gray : Colors.darker,
  };
  const iconStyle: StyleProp<TextStyle> = {
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
  const viewStyle: StyleProp<AnimatedValue> = {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
  // Loading 动画相关
  let animatedStyle = {};
  if (type === LoadingEnum.LOADING) {
    const spinValue = new Animated.Value(0);
    const spin = spinValue.interpolate({
      inputRange: [0, 1], //输入值
      outputRange: ['0deg', '360deg'], //输出值
    });
    iSpin(spinValue);
    animatedStyle = {
      transform: [
        {
          rotate: spin,
        },
      ],
    };
  }
  const renderButton = () => {
    if (button) {
      return <Button name={button.name} onPress={button.onPress} />;
    }
  };
  return (
    <SafeAreaView style={containerStyle}>
      <TouchableOpacity style={viewStyle}>
        <Animated.View style={animatedStyle}>
          <Icon
            name={icon?.name || type || LoadingEnum.EMPTY}
            fillName={icon?.fillName}
            style={iconStyle}
          />
        </Animated.View>
        <Text style={color}>{text || TipsEnum[type || 'inbox']}</Text>
        {renderButton()}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const iSpin = (iSpinValue: Animated.Value) => {
  iSpinValue.setValue(0);
  Animated.timing(iSpinValue, {
    toValue: 1, // 最终值 为1，这里表示最大旋转 360度
    duration: 1000,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start(() => iSpin(iSpinValue));
};
