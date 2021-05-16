import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleProp,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import InputItem from '@ant-design/react-native/lib/input-item';
import List from '@ant-design/react-native/lib/list';
import {Section} from '..';
import {Colors, Style as styles} from '../../constant';
import {Button} from '../common/Button';
import {LabelLine, LabelLineLight} from '../common/LabelLine';
import {BlankLine, RetangleGroup, RetangleGroupLight} from '../common/Square';
import {CartItem} from './CartItem';

const {width, height} = Dimensions.get('window');
/**
 * 订单页面
 */
export const CartPage: React.FC<{}> = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    height,
  };
  const pageArea = {
    paddingHorizontal: 12,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <BlankLine height={20} />
        <RetangleGroupLight
          title="订单所属客户"
          bgColor={Colors.primary}
          color={Colors.light}>
          <LabelLineLight
            title="客户AA"
            icon={{name: 'user', color: Colors.white}}
            color={{bgColor: Colors.transparent, titleColor: Colors.light}}
            rightIcon>
            <Text style={{color: Colors.light}}>aaaas</Text>
          </LabelLineLight>
        </RetangleGroupLight>
        <BlankLine />
        <View style={pageArea}>
          <CartItem title="商品名字" price={'666'} fixedPrice={'888'}>
            描述信息；描述信息
          </CartItem>
          <CartItem title="商品名字" price={'666'} fixedPrice={'888'}>
            描述信息；描述信息
          </CartItem>
        </View>
        <BlankLine height={20} />
        <RetangleGroupLight>
          <List>
            <InputItem clear placeholder="text">
              备注信息
            </InputItem>
          </List>
        </RetangleGroupLight>
        <RetangleGroupLight>
          <LabelLine
            icon={{name: 'red-envelope', color: Colors.watermelon}}
            content="其他优惠金额"
            rightIcon
            rightDesc="666"
            noUnderLine
          />
        </RetangleGroupLight>
        <BlankLine height={200} />
      </ScrollView>
      <CartBottom />
    </SafeAreaView>
  );
};

/**
 * 底部栏-提供功能：分析、编辑、删除
 */
const CartBottom: React.FC<{}> = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.white,
  };
  const color = {
    color: isDarkMode ? Colors.gray : Colors.grisaillf,
  };
  const containerStyle: StyleProp<ViewStyle> = {
    ...backgroundStyle,
    ...styles.flexRowView,
    width,
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 50,
  };
  return (
    <View style={containerStyle}>
      <View>
        <View style={styles.flexRowView}>
          <Text>合计：</Text>
          <Text>6666$</Text>
        </View>
        <Text>总优惠：0</Text>
      </View>
      <Button name="创建订单" />
    </View>
  );
};
