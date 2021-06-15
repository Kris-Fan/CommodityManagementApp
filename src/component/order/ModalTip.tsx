import React from 'react';
import {Text, View, StyleProp, useColorScheme, ScrollView} from 'react-native';
import Modal from '@ant-design/react-native/lib/modal';
import {Colors} from '../../constant';
import {Style as styles, basicStyle} from '../../constant/Style';
import {BlankLine, RetangleGroup, Square} from '../common/Square';
import Section from '../common/Section';
import {Button} from '../common/Button';
import {NavigationInjectedProps} from 'react-navigation';
import {
  getAutoCoupons,
  getDefaultCoupons,
  getDiscountAmountArr,
} from '../../utils/coupon';
import Toast from '@ant-design/react-native/lib/toast';

interface ISelectCoupon {
  title?: string;
  tips?: string;
  price?: number;
  originPrice?: number;
}

/**
 * 选择优惠浮层
 */
export const SelectCoupon: React.FC<ISelectCoupon> = ({
  title,
  tips,
  price,
  originPrice,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {colorLight} = basicStyle(isDarkMode);
  const iTips =
    tips ||
    `售价：${price} 原价：${originPrice}\n⚠最多可选择一种优惠，折扣为原价基础上的折扣`;
  const defaultCoupons = getDefaultCoupons(price || 0);
  const autoCoupons = getAutoCoupons(price || 0);
  const discountArr = getDiscountAmountArr(originPrice || price || 0, [
    9.8,
    9,
    8.8,
    8,
  ]);
  const renderCoupons = (iCoupons: number[]) => {
    if (iCoupons.length > 0) {
      return (
        <RetangleGroup title={'金额'} marginH={0} justifyContent="flex-start">
          {iCoupons.map(coupon => {
            return (
              <Square
                name={`${coupon}元`}
                icon={{
                  fillName: 'red-envelope',
                  color: Colors.watermelon,
                }}
                key={coupon}
                onPress={() => Toast.info(`优惠 ${coupon}`, 1)}
              />
            );
          })}
        </RetangleGroup>
      );
    }
  };
  const renderDiscount = () => {
    if (defaultCoupons.length > 0) {
      return (
        <RetangleGroup title={'折扣'} marginH={0} justifyContent="flex-start">
          {discountArr.map(item => {
            return (
              <Square
                name={`${item.discount}折`}
                descName={`相当于¥${item.amount}`}
                icon={{
                  fillName: 'tag',
                  color: Colors.orange,
                }}
                key={item.discount}
                onPress={() => Toast.info(`折扣 ${item.discount}`, 1)}
              />
            );
          })}
        </RetangleGroup>
      );
    }
  };
  return (
    <ScrollView>
      <Section title={title || '请选择优惠'} />
      <Text style={[colorLight, textArea]}>{iTips}</Text>
      <BlankLine />
      {renderCoupons(defaultCoupons)}
      {renderCoupons(autoCoupons)}
      {renderDiscount()}
      <RetangleGroup title={'自定义'} marginH={0} justifyContent="flex-start">
        <Square
          name="自定义金额"
          icon={{
            name: 'red-envelope',
            color: Colors.watermelon,
          }}
        />
        <Square
          name="自定义折扣"
          icon={{
            name: 'tag',
            color: Colors.orange,
          }}
        />
      </RetangleGroup>
    </ScrollView>
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
