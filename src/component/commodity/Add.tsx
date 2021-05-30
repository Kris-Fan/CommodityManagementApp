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
 * 新增商品页面
 */
const Add: React.FC<NavigationInjectedProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {backgroundStyle, backgroundStyleLight, color, colorLight} = basicStyle(
    isDarkMode,
  );

  return (
    <SafeAreaView style={styles.fullScreen}>
      <HeaderName title="" bgColor={Colors.primary} />
      <StatusBar
        barStyle="light-content"
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

export default Add;
