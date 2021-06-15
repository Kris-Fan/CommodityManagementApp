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
import {LabelLineTint} from '../common/LabelLine';
import {BlankLine, RetangleGroupLight} from '../common/Square';

/**
 * 新增商品页面
 */
const Add: React.FC<NavigationInjectedProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {backgroundStyle, backgroundStyleLight, color, colorLight} = basicStyle(
    isDarkMode,
  );

  return (
    <SafeAreaView style={[styles.fullScreen, backgroundStyle]}>
      <HeaderName title="" bgColor={Colors.primary} />
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={Colors.transparent}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <HeaderName
          title="更多"
          color={Colors.white}
          bgColor={Colors.primary}
          descBottpm="管理商品"
        />
        <BlankLine />
        <LabelLineTint
          title="通过进货单添加-适用于已录入的商品"
          name="创建进货单"
          description="🌟推荐使用"
          iconName="file-done"
          rightIcon
          style={{bgColor: Colors.primary}}
        />
        <BlankLine />
        <LabelLineTint
          title="免输编号-自动检测是否录入"
          name="扫一扫条码添加商品"
          description="🌟推荐使用"
          iconName="scan"
          style={{bgColor: Colors.deepSky}}
          rightIcon
        />
        <BlankLine />
        <LabelLineTint
          name="表格批量导入"
          description=""
          iconName="insert-row-below"
          style={{bgColor: Colors.grisaillf}}
          rightIcon
        />
        <BlankLine />
        <LabelLineTint
          name="手动单个添加"
          description=""
          iconName="edit"
          style={{
            bgColor: backgroundStyleLight.backgroundColor,
            color: colorLight.color,
            tintColor: color.color,
          }}
          rightIcon
        />
        <BlankLine />
        <RetangleGroupLight title="手动单个添加-填写下方表格" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Add;
