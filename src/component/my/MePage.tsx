import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Colors} from '../../constant';
import {LabelLine} from '../common/LabelLine';
import {BlankLine, Square} from '../common/Square';
import MyHeader from './MyHeader';

const MePage: React.FC<{}> = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;
  const backgroundStyle = {
    backgroundColor,
  };
  const viewStyle: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    justifyContent: 'space-around',
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.darker : Colors.white}
      />
      <MyHeader />
      <BlankLine />
      <View style={viewStyle}>
        <Square
          name="进行中订单"
          icon={{name: 'send', needBg: true}}
          onPress={() => {}}
        />
        <Square
          name="全部订单"
          icon={{name: 'container', needBg: true}}
          onPress={() => {}}
        />
        <Square
          name="系统消息"
          icon={{name: 'message', needBg: true}}
          onPress={() => {}}
        />
      </View>
      <BlankLine />
      <LabelLine
        icon={{name: 'scan', color: Colors.primary}}
        content="扫一扫"
        rightIcon
        onPress={() => {}}
      />
      <LabelLine
        icon={{name: 'sync', color: Colors.primaryActive}}
        content="数据同步"
        rightIcon
        onPress={() => {}}
      />
      <BlankLine />
      <LabelLine
        icon={{name: 'tool', color: Colors.primaryLight}}
        content="工具"
        rightIcon
        onPress={() => {}}
      />
      <LabelLine
        icon={{name: 'question-circle', color: Colors.sand}}
        content="帮助与反馈"
        rightIcon
        onPress={() => {}}
      />
      <BlankLine />
      <LabelLine
        icon={{name: 'exclamation-circle', color: Colors.primaryLight}}
        content="关于"
        rightIcon
        onPress={() => {}}
      />
    </SafeAreaView>
  );
};

export default MePage;
