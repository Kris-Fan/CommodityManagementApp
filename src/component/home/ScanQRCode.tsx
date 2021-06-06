import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Animated,
  PermissionsAndroid,
  Easing,
  ImageBackground,
  View,
  Text,
  StyleProp,
  ViewStyle,
  ScrollView,
} from 'react-native';
import {RNCamera, BarCodeReadEvent} from 'react-native-camera';
import {SafeAreaView} from 'react-navigation';
import {Colors, Size} from '../../constant';
import {NavigationInjectedProps} from 'react-navigation';
import {Style} from '../../constant/Style';
import {CircleButton} from '../common/Circle';
import {FilterItem} from '../commodity/Home';
import {ScanTypeEnum} from '../../common/enum';

/**
 * 扫一扫，业务逻辑：
 * 1. 扫码查找商品，二维码、条码根据id跳转对应商品详情页；找不到情况提示未找到弹框。
 * 2. 扫码添加商品，（1）未找到条码，直接将条码带入添加页 （2）找到已存在，出商品存在浮层，若选择继续添加则将全部信息进入添加页。
 * 3. 扫码将对应商品加入订单🛒，（1）找到，直接加入订单若已存在则自动加一（2）找不到，提示不存在是否添加，选是则走添加商品逻辑。
 */
export const ScanQRCode: React.FC<NavigationInjectedProps> = ({navigation}) => {
  const moveAnim = useRef(new Animated.Value(-2)).current;
  const [transCode, setTransCode] = useState('');
  const type = navigation.getParam('type');
  const [scanType, setScanType] = useState<ScanTypeEnum>(
    type || ScanTypeEnum.ADD_TO_CART,
  );
  const [lastScanType, setLastScanType] = useState(scanType);
  useEffect(() => {
    requestCameraPermission();
    startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //请求权限的方法
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: '申请摄像头权限',
          message: '扫描条形码/二维码需要开启相机权限',
          buttonNeutral: '等会再问我',
          buttonNegative: '不行',
          buttonPositive: '好吧',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('现在你获得摄像头权限了');
      } else {
        // console.log('用户没有允许相机权限');
        navigation.goBack();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  /** 扫描框动画*/
  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(moveAnim, {
        toValue: 200,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(moveAnim, {
        toValue: -1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start(() => startAnimation());
  };
  const onBarCodeRead = (result: BarCodeReadEvent) => {
    const {data} = result; //只要拿到data就可以了
    if (data !== transCode || lastScanType !== scanType) {
      // 避免重复操作,当切换tab时仍可重复操作
      setTransCode(data);
      setLastScanType(scanType);
      //扫码后的操作
    }
  };
  const onPressBottomBar = (iType: ScanTypeEnum) => {
    setScanType(iType);
  };
  const scanTips = scanType === ScanTypeEnum.SEARCH ? "二维码/条形码" : "条形码"
  const height = scanType === ScanTypeEnum.SEARCH ? 200 : 150
  const rnCamera = useRef<RNCamera>(null);
  return (
    <SafeAreaView style={styles.container}>
      <ScanTopBar title="扫一扫" navigation={navigation} />
      <BottomTab type={scanType} onPress={onPressBottomBar} />
      <RNCamera
        ref={rnCamera}
        autoFocus={RNCamera.Constants.AutoFocus.on} /*自动对焦*/
        style={[styles.preview]}
        type={RNCamera.Constants.Type.back} /*切换前后摄像头 front前back后*/
        flashMode={RNCamera.Constants.FlashMode.off} /*相机闪光模式*/
        captureAudio={false}
        onBarCodeRead={onBarCodeRead}>
        <View
          style={{
            width: 500,
            height: 220,
            backgroundColor: Colors.translucent,
          }}
        />

        <View style={[{flexDirection: 'row'}]}>
          <View
            style={{
              backgroundColor: Colors.translucent,
              height: height,
              width: 300,
            }}
          />
          <ImageBackground
            source={require('../../assets/qrcode_bg.png')}
            style={{width: 300, height: height}}>
            <Animated.View
              style={[styles.border, {transform: [{translateY: moveAnim}]}]}
            />
          </ImageBackground>
          <View
            style={{
              backgroundColor: Colors.translucent,
              height: height,
              width: 300,
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: Colors.translucent,
            width: 500,
            alignItems: 'center',
          }}>
          <Text style={styles.rectangleText}>
            将{scanTips}放入框内，即可自动扫描
          </Text>
        </View>
      </RNCamera>
    </SafeAreaView>
  );
};

/**
 * 顶部导航，返回、更多
 */
const ScanTopBar: React.FC<
  NavigationInjectedProps & {
    onPressMore?: (_?: any) => void;
    title?: string;
  }
> = ({navigation, onPressMore, title}) => {
  const viewStyle: StyleProp<ViewStyle> = {
    justifyContent: 'space-between',
    position: 'absolute',
    top: 30,
    zIndex: 100,
    width: '100%',
  };
  return (
    <View
      style={[
        Style.flexRowView,
        Style.paddingHorizontal,
        Style.paddingVertical,
        viewStyle,
      ]}>
      <CircleButton iconName="left" onPress={() => navigation.goBack()} />
      <Text style={[Style.tabBar, {color: Colors.white}]}>{title}</Text>
      <View style={Style.flexRowView}>
        {/* <CircleButton iconName="more"  onPress={onPressMore} /> */}
      </View>
    </View>
  );
};

const BottomTab: React.FC<{
  type?: ScanTypeEnum;
  onPress: (_?: any) => void;
}> = ({type, onPress}) => {
  const [scanType, setScanType] = useState(type || ScanTypeEnum.ADD_TO_CART);
  const viewStyle: StyleProp<ViewStyle> = {
    backgroundColor: Colors.translucent,
    paddingVertical: 30,
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
    width: '100%',
  };
  const tintColor = (iType: ScanTypeEnum) => {
    if (iType === scanType) {
      return {color: Colors.primary};
    }
    return {color: Colors.white};
  };
  return (
    <View style={viewStyle}>
      <ScrollView horizontal>
        <FilterItem
          name="添加商品至订单"
          icon={{name: 'shopping-cart', ...tintColor(ScanTypeEnum.ADD_TO_CART)}}
          textStyle={{
            ...tintColor(ScanTypeEnum.ADD_TO_CART),
            fontSize: Size.normal,
          }}
          onPress={() => {
            setScanType(ScanTypeEnum.ADD_TO_CART);
            onPress(ScanTypeEnum.ADD_TO_CART);
          }}
        />
        <FilterItem
          name="查找"
          icon={{name: 'search', ...tintColor(ScanTypeEnum.SEARCH)}}
          textStyle={{
            ...tintColor(ScanTypeEnum.SEARCH),
            fontSize: Size.normal,
          }}
          onPress={() => {
            setScanType(ScanTypeEnum.SEARCH);
            onPress(ScanTypeEnum.SEARCH);
          }}
        />
        <FilterItem
          name="新增商品"
          icon={{
            name: 'appstore-add',
            ...tintColor(ScanTypeEnum.ADD_NEW_COMMIDITY),
          }}
          textStyle={{
            ...tintColor(ScanTypeEnum.ADD_NEW_COMMIDITY),
            fontSize: Size.normalLight,
          }}
          onPress={() => {
            setScanType(ScanTypeEnum.ADD_NEW_COMMIDITY);
            onPress(ScanTypeEnum.ADD_NEW_COMMIDITY);
          }}
        />
        <FilterItem
          name="添加商品至进货单"
          icon={{
            name: 'file-add',
            ...tintColor(ScanTypeEnum.ADD_TO_PURCHASE_CART),
          }}
          textStyle={{
            ...tintColor(ScanTypeEnum.ADD_TO_PURCHASE_CART),
            fontSize: Size.normalLight,
          }}
          onPress={() => {
            setScanType(ScanTypeEnum.ADD_TO_PURCHASE_CART);
            onPress(ScanTypeEnum.ADD_TO_PURCHASE_CART);
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rectangle: {
    height: 200,
    width: 200,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  rectangleText: {
    flex: 0,
    color: '#fff',
    marginTop: 10,
  },
  border: {
    flex: 0,
    width: 196,
    height: 2,
    backgroundColor: Colors.primary,
    borderRadius: 50,
  },
});
