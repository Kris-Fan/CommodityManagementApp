import React, {useState} from 'react';
import {useColorScheme, View} from 'react-native';
import {Colors, Style as styles} from '../../constant';
import {Square, BlankLine} from '../common/Square';
import {NavigationInjectedProps} from 'react-navigation';

/**
 * 首页-浮层功能区
 */
export const MoreDetail: React.FC<
  NavigationInjectedProps & {onClose?: (_?: any) => void}
> = ({navigation, onClose}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View>
      <BlankLine />
      <View style={styles.flexRowView}>
        <Square
          name="扫一扫添加至订单"
          icon={{
            fillName: 'file-add',
            color: Colors.primaryLight,
            needBg: true,
          }}
          onPress={() => {
            if (onClose) {
              onClose();
            }
            navigation.navigate('ScanQRCode');
          }}
        />
        <Square
          name="扫一扫添加商品"
          icon={{name: 'scan', color: Colors.greenLight, needBg: true}}
          onPress={() => {}}
        />
        <Square
          name="扫一扫查找商品"
          icon={{name: 'security-scan', color: Colors.greenLight, needBg: true}}
          onPress={() => {}}
        />
        <Square
          name="扫一扫添加联系人"
          descName="仅支持手机通讯录中二维码"
          icon={{name: 'user-add', color: Colors.greenLight, needBg: true}}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};
