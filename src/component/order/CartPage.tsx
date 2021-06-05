import React, {useState, useRef} from 'react';
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
import Modal from '@ant-design/react-native/lib/modal';
import {Colors, Size} from '../../constant';
import {Style as styles, basicStyle} from '../../constant/Style';
import {Button, GhostButton} from '../common/Button';
import {LabelLine, LabelLineLight, LabelLineTint} from '../common/LabelLine';
import {BlankLine, RetangleGroupLight} from '../common/Square';
import {HeaderName} from '../common/Header';
import {CartItem} from './CartItem';
import {ContactTips, SelectCoupon} from './ModalTip';
import {NavigationInjectedProps} from 'react-navigation';
import {TextInput} from 'react-native-gesture-handler';
import {ModalContentEnum} from '../../common/enum/modalEnum';

const {width, height} = Dimensions.get('window');

/**
 * 订单页面
 */
export const CartPage: React.FC<NavigationInjectedProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {backgroundStyle, backgroundStyleLight, color, colorLight} = basicStyle(
    isDarkMode,
  );
  const pageArea = {
    paddingHorizontal: 12,
  };
  const [visible, setVisible] = useState(false);
  const onShowModal = () => setVisible(true);
  const onClose = () => setVisible(false);
  const [modalContentType, setModalContentType] = useState(
    ModalContentEnum.CONTACTS,
  );
  const showContactTips = () => setModalContentType(ModalContentEnum.CONTACTS);
  const showCouponTips = () => setModalContentType(ModalContentEnum.COUPON);
  const modalRef = useRef<Modal>(null);
  const renderModal = () => {
    if (modalContentType === ModalContentEnum.CONTACTS) {
      return <ContactTips navigation={navigation} current={modalRef.current} />;
    }
    if (modalContentType === ModalContentEnum.COUPON) {
      return <SelectCoupon />;
    }
  };
  return (
    <SafeAreaView style={[backgroundStyle, {height: height}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent
      />
      <HeaderName
        title="订单"
        color={Colors.white}
        bgColor={Colors.primary}
        top
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <BlankLine height={20} />
        <LabelLineTint
          title="订单所属客户"
          name="客户AA"
          iconName="user"
          description="aaaas"
          rightIcon
          onPress={() => {
            showContactTips();
            onShowModal();
          }}
        />
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
          <LabelLineLight>
            <View
              style={[
                backgroundStyleLight,
                styles.flexRowView,
                styles.paddingHorizontal,
              ]}>
              <Text style={[color, {fontSize: Size.normal}]}>备注</Text>
              <TextInput
                placeholder="请输入备注信息..."
                style={[
                  styles.input,
                  colorLight,
                  backgroundStyle,
                  styles.btnStyle,
                  styles.paddingHorizontal,
                ]}
                multiline
                clearButtonMode="always"
                selectionColor={Colors.primary}
                maxLength={100}
              />
            </View>
          </LabelLineLight>
        </RetangleGroupLight>
        <RetangleGroupLight>
          <LabelLine
            icon={{name: 'red-envelope', color: Colors.watermelon}}
            content="其他优惠金额"
            rightIcon
            rightDesc="666"
            noUnderLine
            onLongPress={() => {
              onShowModal();
              showCouponTips();
            }}
            onPress={() => {
              onShowModal();
              showCouponTips();
            }}
          />
        </RetangleGroupLight>
        <BlankLine height={200} />
      </ScrollView>
      <CartBottom />
      {/*浮层 */}
      <Modal
        popup
        visible={visible}
        animationType="slide-up"
        onClose={onClose}
        closable={true}
        maskClosable
        style={styles.transBackground}
        ref={modalRef}>
        <View style={[backgroundStyleLight, styles.modalViewStyle]}>
          {renderModal()}
          <BlankLine />
          <GhostButton name="取消" onPress={onClose} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

/**
 * 底部栏-提供功能：分析、编辑、删除
 */
const CartBottom: React.FC<{}> = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {backgroundStyleLight, color, colorLight} = basicStyle(isDarkMode);
  const containerStyle: StyleProp<ViewStyle> = {
    ...backgroundStyleLight,
    ...styles.flexRowView,
    width,
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 18,
  };
  return (
    <View style={containerStyle}>
      <View>
        <View style={styles.flexRowView}>
          <Text style={color}>合计：</Text>
          <Text style={color}>6666$</Text>
        </View>
        <Text style={colorLight}>总优惠：0</Text>
      </View>
      <Button name="创建订单" />
    </View>
  );
};
