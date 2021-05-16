import React from 'react';
import {
  Text,
  useColorScheme,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import Flex from '@ant-design/react-native/lib/flex';
import Stepper from '@ant-design/react-native/lib/stepper';
import List from '@ant-design/react-native/lib/list';
import {Colors, Style as styles, Size} from '../../constant';
import {iSymbols} from '../../constant/const';
import {Square} from '../common/Square';
import {LabelLine, LabelLineLight} from '../common/LabelLine';

/**
 * 购物车产品项目
 */
export const CartItem: React.FC<{
  title: string;
  price: string;
  fixedPrice?: string;
  onPress?: (_?: any) => void;
  onLongPress?: (_?: any) => void;
}> = ({title, price, fixedPrice, children, onPress, onLongPress}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.white,
  };
  const color = {
    color: isDarkMode ? Colors.white : Colors.dark,
  };
  const colorLight = {
    color: isDarkMode ? Colors.gray : Colors.grisaillf,
  };
  const itemStyle: StyleProp<ViewStyle> = {
    marginBottom: 5,
    paddingBottom: 5,
    ...backgroundStyle,
    ...styles.commonBorderRadius,
  };
  const titleStyle: StyleProp<TextStyle> = {
    ...styles.sectionTitle,
    fontSize: Size.normal,
    ...color,
  };
  const contentStyle: StyleProp<TextStyle> = {
    ...styles.sectionDescription,
    ...colorLight,
    fontSize: Size.small,
    marginTop: 1,
    paddingBottom: 5,
  };
  const leftStyle = {
    flex: 1,
    marginRight: 20,
  };
  const rightStyle = {
    flex: 6,
  };
  const priceStyle = {
    fontSize: Size.normal,
    color: Colors.primaryActive,
    marginRight: Size.normal,
  };
  const normalTextStyle = {
    fontSize: Size.small,
    ...colorLight,
  };
  return (
    <View style={itemStyle}>
      <Flex justify="start" wrap="nowrap">
        <TouchableOpacity
          style={leftStyle}
          onPress={onPress}
          onLongPress={onLongPress}>
          <Square icon={{name: 'appstore'}} name="" />
        </TouchableOpacity>
        <View style={rightStyle}>
          <View>
            <Text style={titleStyle}>{title}</Text>
            <Text style={contentStyle}>{children}</Text>
          </View>
          <TouchableOpacity style={styles.flexRowView}>
            <Text style={priceStyle}>
              {price}
              {iSymbols.YUAN}
            </Text>
            <Text style={colorLight}>
              {fixedPrice}
              {iSymbols.YUAN}
            </Text>
          </TouchableOpacity>
        </View>
      </Flex>
      <List style={{borderBottomWidth: 0, borderColor: Colors.primaryActive}}>
        <List.Item
          extra={
            <Stepper
              key="1"
              max={999}
              min={1}
              readOnly={false}
              defaultValue={1}
              onChange={onChange}
            />
          }>
          <Text style={normalTextStyle}>购买数量：</Text>
        </List.Item>
      </List>
      <LabelLineLight title="优惠金额" rightIcon rightDesc="666" />
    </View>
  );
};

const onChange = (value: number) => {
  console.log('changed', value);
};
