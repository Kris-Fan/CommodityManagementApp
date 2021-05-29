import React from 'react';
import {Text, View, StyleProp, useColorScheme, ViewStyle} from 'react-native';
import Modal from '@ant-design/react-native/lib/modal';
import {Colors, Style as styles, Size, basicStyle} from '../../constant';
import {BlankLine, Square} from '../common/Square';
import Section from '../common/Section';
import {Button} from '../common/Button';
import {NavigationInjectedProps} from 'react-navigation';

interface ISelectCoupon {
  title?: string;
  tips?: string;
}

/**
 * 选择优惠浮层
 */
export const SelectCoupon: React.FC<ISelectCoupon> = ({title, tips}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {colorLight} = basicStyle(isDarkMode);
  const viewStyle: StyleProp<ViewStyle> = [
    styles.flexRowView,
    {flexWrap: 'wrap'},
  ];
  return (
    <View>
      <Section title={title || '请选择优惠金额'} />
      <Text style={[colorLight, textArea]}>{tips}</Text>
      <BlankLine />
      <Text style={[colorLight, textArea]}>金额</Text>
      <View style={viewStyle}>
        <Square
          name="1元"
          icon={{
            fillName: 'pay-circle',
            color: Colors.sand,
            size: Size.iconBig,
          }}
        />
        <Square
          name="5元"
          icon={{
            fillName: 'pay-circle',
            color: Colors.sand,
            size: Size.iconBig,
          }}
        />
        <Square
          name="10元"
          icon={{
            fillName: 'pay-circle',
            color: Colors.sand,
            size: Size.iconBig,
          }}
        />
        <Square
          name="50元"
          icon={{
            fillName: 'pay-circle',
            color: Colors.sand,
            size: Size.iconBig,
          }}
        />
      </View>
      <Text style={[colorLight, textArea]}>折扣</Text>
      <View style={viewStyle}>
        <Square
          name="9折"
          descName="相当于12元"
          icon={{
            fillName: 'red-envelope',
            color: Colors.watermelon,
            size: Size.iconBig,
          }}
        />
        <Square
          name="8折"
          descName="相当于12元"
          icon={{
            fillName: 'red-envelope',
            color: Colors.watermelon,
            size: Size.iconBig,
          }}
        />
        <Square
          name="7折"
          descName="相当于12元"
          icon={{
            fillName: 'red-envelope',
            color: Colors.watermelon,
            size: Size.iconBig,
          }}
        />
      </View>
      <Text style={[colorLight, textArea]}>自定义</Text>
      <View style={viewStyle}>
        <Square
          name="自定义金额"
          icon={{
            name: 'pay-circle',
            color: Colors.sand,
            size: Size.iconBig,
          }}
        />
        <Square
          name="自定义折扣"
          icon={{
            name: 'red-envelope',
            color: Colors.watermelon,
            size: Size.iconBig,
          }}
        />
      </View>
    </View>
  );
};

/**
 * 选择联系人浮层
 */
export const ContactTips: React.FC<
  NavigationInjectedProps & React.RefObject<Modal>
> = ({navigation, current}) => {
  const {onClose} = current?.props || {};
  return (
    <View>
      <Section title="选择客户"> 请前往联系人页面选择客户</Section>
      <BlankLine height={100} />
      <Button
        name="去联系人页面"
        onPress={() => {
          navigation.navigate('ContactsPage');
          if (onClose instanceof Function) {
            onClose();
          }
        }}
      />
    </View>
  );
};

const textArea = {
  marginHorizontal: 24,
};
