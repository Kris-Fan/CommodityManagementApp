import React, {useState} from 'react';
import {StyleProp, useColorScheme, ViewStyle} from 'react-native';
import {Colors} from '../../constant';
import {Style as styles, basicStyle} from '../../constant/Style';
import Modal from '@ant-design/react-native/lib/modal';
import Toast from '@ant-design/react-native/lib/toast';
import {RetangleGroupLight} from '../common/Square';
import {LabelLineLight, LabelLineTint} from '../common/LabelLine';
import Barcode from 'react-native-barcode-builder';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ModalCard} from '../common/Modal';

/**
 * 条码区域
 */
export const BarCodeArea: React.FC<{code?: string}> = ({code}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {backgroundStyle, backgroundStyleLight, color, colorLight} = basicStyle(
    isDarkMode,
  );
  const renderTips = () => {
    const title = !code
      ? '当前没有条码请添加'
      : code.length < 8 || code.length > 16
      ? '可能无效的条码'
      : '';
    const desc = !code
      ? '扫一扫立即添加'
      : code.length < 8 || code.length > 16
      ? '扫一扫立即更改'
      : '';
    if (title && desc) {
      return (
        <LabelLineLight
          icon={{name: 'barcode', color: Colors.grisaillf}}
          title={title}
          rightDesc={desc}
          rightIcon
        />
      );
    }
  };
  const onLongPress = () => {
    Modal.operation([
      {text: '复制条码', onPress: () => {}},
      {text: '保存至相册', onPress: () => {}},
      {text: '🖨️打印条码', onPress: () => {}},
    ]);
  };
  const showCode: StyleProp<ViewStyle> = {
    display: code ? 'flex' : 'none',
  };
  const [visible, setVisble] = useState(false);
  return (
    <RetangleGroupLight title="商品唯一识别条码" color={Colors.grisaillf}>
      <TouchableOpacity
        onLongPress={onLongPress}
        style={showCode}
        onPress={() => setVisble(true)}>
        <Barcode
          value={code || ''}
          format="CODE128"
          text={code}
          height={50}
          lineColor={color.color}
          background={backgroundStyleLight.backgroundColor}
          onError={() => 'invalid'}
        />
      </TouchableOpacity>
      {renderTips()}
    </RetangleGroupLight>
  );
};
