import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {Colors} from '../../constant';
import {Style as styles, basicStyle} from '../../constant/Style';
import {NavigationInjectedProps} from 'react-navigation';
import {HeaderName, NavHeader} from '../common/Header';

/**
 * 商品状态数据分析页面
 */
const Status: React.FC<NavigationInjectedProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {backgroundStyle, backgroundStyleLight, color, colorLight} = basicStyle(
    isDarkMode,
  );

  return (
    <SafeAreaView style={styles.fullScreen}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={Colors.transparent}
      />
      <HeaderName title="" bgColor={Colors.primary} />
      <NavHeader navigation={navigation} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      />
    </SafeAreaView>
  );
};

export default Status;
