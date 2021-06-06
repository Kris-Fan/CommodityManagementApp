import React, {useState} from 'react';
import {
  Text,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import Modal from '@ant-design/react-native/lib/modal';
import Icon from '@ant-design/react-native/lib/icon';
import {Button} from './Button';
import {Colors, Size} from '../../constant';
import {basicStyle, Style as styles} from '../../constant/Style';
import {CircleButton} from './Circle';

const titleStyle: StyleProp<TextStyle> = {
  fontSize: Size.normal,
};

const titleStyleHighlight = {
  ...styles.modalTitle,
};

const contentStyle = {
  ...styles.modalContentLight,
  color: Colors.gray,
};

/**
 * question box
 */
const ModalAlert = (name: string) => {
  Modal.alert(
    <View>
      <Text style={titleStyle}>
        <Icon name="question-circle" style={titleStyle} />
        是否删除联系人<Text style={titleStyleHighlight}>{name}</Text>
      </Text>
    </View>,
    <Text style={contentStyle}>
      若“{name}”关联有订单您仍然可以在订单中找到对应联系人信息
    </Text>,
    [
      {
        text: '取消',
        onPress: () => console.log('cancel'),
        style: 'cancel',
      },
      {text: '删除', onPress: () => console.log('ok')},
    ],
  );
};

const ModalPop: React.FC<{visible: boolean}> = ({visible, children}) => {
  const [iVisible, setVisiable] = useState(visible);
  const onClose = () => setVisiable(false);
  return (
    <View>
      <Modal
        popup
        visible={iVisible}
        animationType="slide-up"
        onClose={onClose}
        style={styles.transBackground}>
        <View style={styles.modalViewStyle}>
          {children}
          <Button name="primary" onPress={onClose} />
        </View>
      </Modal>
    </View>
  );
};

export const ModalCard: React.FC<{visible?: boolean}> = ({
  visible,
  children,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {backgroundStyleLight, backgroundStyle, colorLight} = basicStyle(
    isDarkMode,
  );
  console.log(visible);
  const [iVisible, setVisiable] = useState(true);
  const onClose = () => setVisiable(false);
  const containerView: StyleProp<ViewStyle> = {
    ...styles.transBackground,
    alignItems: 'center',
  };
  console.log('iVisible', iVisible);
  return (
    <View style={[containerView, {display: iVisible ? 'flex' : 'none'}]}>
      <View style={[styles.modalViewStyle, backgroundStyle]}>
        {children}
        <Button name="primary" onPress={onClose} />
      </View>
      <View style={[{alignItems: 'center'}, styles.paddingVertical]}>
        <CircleButton iconName="close" size={Size.iconSize} onPress={onClose} />
        <Text style={colorLight}>关闭</Text>
      </View>
    </View>
  );
};

export {ModalAlert, ModalPop};
