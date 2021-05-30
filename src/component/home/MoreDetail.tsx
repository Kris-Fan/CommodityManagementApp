import React from 'react';
import {View} from 'react-native';
import {Colors} from '../../constant';
import {Square, BlankLine} from '../common/Square';
import {NavigationInjectedProps} from 'react-navigation';
import {Style as styles} from '../../constant/Style';

/**
 * 首页-浮层功能区
 */
export const MoreDetail: React.FC<
  NavigationInjectedProps & {onClose?: (_?: any) => void}
> = ({navigation, onClose}) => {
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
        <Square name="" />
      </View>
    </View>
  );
};
