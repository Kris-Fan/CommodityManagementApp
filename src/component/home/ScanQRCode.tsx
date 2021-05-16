import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Animated,
  PermissionsAndroid,
  Easing,
  ImageBackground,
  View,
  Text,
} from 'react-native';
import {RNCamera, BarCodeReadEvent} from 'react-native-camera';
import {SafeAreaView} from 'react-navigation';
import {Colors} from '../../constant';
import {NavigationInjectedProps} from 'react-navigation';

let camera;

export const ScanQRCode: React.FC<NavigationInjectedProps> = ({navigation}) => {
  const moveAnim = useRef(new Animated.Value(-2)).current;

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
    //扫码后的操作
    console.log(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <RNCamera
        ref={ref => {
          camera = ref;
        }}
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
              height: 200,
              width: 200,
            }}
          />
          <ImageBackground
            source={require('../../assets/qrcode_bg.png')}
            style={{width: 200, height: 200}}>
            <Animated.View
              style={[styles.border, {transform: [{translateY: moveAnim}]}]}
            />
          </ImageBackground>
          <View
            style={{
              backgroundColor: Colors.translucent,
              height: 200,
              width: 200,
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
            将二维码放入框内，即可自动扫描
          </Text>
        </View>
      </RNCamera>
    </SafeAreaView>
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