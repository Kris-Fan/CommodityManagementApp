import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {Colors, Style as styles, basicStyle} from '../../constant';
import {NavigationInjectedProps} from 'react-navigation';
import {HeaderName, NavHeader} from '../common/Header';

/**
 * 商品详情页
 */
const Detail: React.FC<NavigationInjectedProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {backgroundStyle, backgroundStyleLight, color, colorLight} = basicStyle(
    isDarkMode,
  );

  return (
    <SafeAreaView style={styles.fullScreen}>
      <HeaderName title="" />
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor={Colors.transparent}
      />
      <NavHeader navigation={navigation} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      />
    </SafeAreaView>
  );
};

export default Detail;
