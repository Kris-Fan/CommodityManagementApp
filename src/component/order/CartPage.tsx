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
  FlatList,
} from 'react-native';
import Modal from '@ant-design/react-native/lib/modal';
import {BaseUrl, Colors, ImageUrl, Mock, Size} from '../../constant';
import {Style as styles, basicStyle} from '../../constant/Style';
import {Button, GhostButton} from '../common/Button';
import {LabelLine, LabelLineLight, LabelLineTint} from '../common/LabelLine';
import {BlankLine, RetangleGroupLight} from '../common/Square';
import {HeaderName} from '../common/Header';
import {CartItem} from './CartItem';
import {ContactTips, SelectCoupon} from './ModalTip';
import {NavigationInjectedProps} from 'react-navigation';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {ModalContentEnum} from '../../common/enum/modalEnum';
import {commodityItemType} from '../../common/interface';
import {Loading, LoadingEnum} from '../page/Loading';
import {DisplayPrice} from '../common/Price';
import {iSymbols} from '../../constant/const';

const {width, height} = Dimensions.get('window');

interface ModalParams {
  price?: number;
  originPrice?: number;
  count?: number;
}

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
  const [modalContentType, setModalContentType] = useState(
    ModalContentEnum.CONTACTS,
  );
  const [iPrice, setIPrice] = useState(0);
  const [iOriginPrice, setOriginPrice] = useState(0);
  const onClose = () => setVisible(false);
  const onShowModal = (iModal: ModalContentEnum, params?: ModalParams) => {
    setIPrice(params?.price || 0);
    setOriginPrice(params?.originPrice || 0);
    setModalContentType(iModal);
    setVisible(true);
  };
  const cartModalRef = useRef<Modal>(null);
  const renderModal = () => {
    if (modalContentType === ModalContentEnum.CONTACTS) {
      return (
        <ContactTips navigation={navigation} current={cartModalRef.current} />
      );
    }
    if (modalContentType === ModalContentEnum.COUPON) {
      return <SelectCoupon originPrice={iOriginPrice} price={iPrice} />;
    }
  };
  const cData: commodityItemType[] = Mock.COMMODITY_DATA.data.slice(0, 2);
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
      <FlatList
        data={cData}
        keyExtractor={(item: commodityItemType, index) => item.id + index}
        renderItem={({item, index}) => (
          <CartItem
            key={item.id + index}
            title={item.name}
            content={`型号 ${item.type}`}
            price={item.sellPrice + ''}
            imageUri={BaseUrl + ImageUrl + '/test.png'}
            tagList={item.tagList}
            fixedPrice={item.fixedPrice + ''}
            onPress={() => navigation.navigate('CommodityDetail', {item})}
            chooseCoupons={() =>
              onShowModal(ModalContentEnum.COUPON, {
                price: item.sellPrice,
                originPrice: item.fixedPrice,
              })
            }
          />
        )}
        ListEmptyComponent={() => (
          <Loading
            type={LoadingEnum.EMPTY}
            height={height / 2}
            text="订单空空如也"
            button={{
              name: '前往列表页添加',
              onPress: () => {
                navigation.navigate('CommodityNavigator');
              },
            }}
          />
        )}
        ListHeaderComponent={() => {
          return (
            <View>
              <BlankLine height={20} />
              <LabelLineTint
                title="订单所属客户"
                name="客户AA"
                iconName="user"
                description="aaaas"
                rightIcon
                onPress={() => {
                  onShowModal(ModalContentEnum.CONTACTS);
                }}
                marginH={0}
              />
              <BlankLine />
            </View>
          );
        }}
        ListFooterComponent={() => (
          <View>
            <RetangleGroupLight marginH={0}>
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
            <RetangleGroupLight marginH={0}>
              <LabelLine
                icon={{name: 'red-envelope', color: Colors.watermelon}}
                content="其他优惠金额"
                rightIcon
                rightDesc="666"
                noUnderLine
                onLongPress={() => {}}
                onPress={() => {
                  onShowModal(ModalContentEnum.COUPON);
                }}
              />
            </RetangleGroupLight>
            <BlankLine height={200} />
          </View>
        )}
        contentContainerStyle={pageArea}
        onRefresh={() => {}}
        refreshing={false}
        onScroll={() => {}}
      />
      <CartBottom total={cData.reduce((a, b) => a + b.sellPrice, 0)} />
      {/*浮层 */}
      <Modal
        popup
        visible={visible}
        animationType="slide-up"
        onClose={onClose}
        closable={true}
        maskClosable
        style={styles.transBackground}
        ref={cartModalRef}>
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
const CartBottom: React.FC<{
  total: number; // 总金额
  coupon?: number; // 优惠金额
  count?: number; // 总数
}> = ({total, coupon, count}) => {
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
  const renderTotalCoupons = () => {
    if (coupon && coupon > 0) {
      return <Text style={colorLight}>已优惠：{iSymbols.YUAN + coupon}</Text>;
    }
  };
  return (
    <View style={containerStyle}>
      <TouchableOpacity>
        <View style={styles.flexRowView}>
          <Text style={color}>合计：</Text>
          <DisplayPrice price={total} size="small" />
        </View>
        {renderTotalCoupons()}
      </TouchableOpacity>
      <Button name="创建订单" />
    </View>
  );
};
