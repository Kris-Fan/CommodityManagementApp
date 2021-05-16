import React, {useState, useRef} from 'react';
import {
  StyleProp,
  ViewStyle,
  useColorScheme,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {NavHeader} from '../common/Header';
import {Colors, BaseUrl, Size, Style as styles} from '../../constant';
import {NavigationInjectedProps} from 'react-navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '../common/Icon';
import Modal from '@ant-design/react-native/lib/modal';
import {GhostButton} from '../common/Button';
import {Square, BlankLine} from '../common/Square';
import {Loading, LoadingEnum} from './Loading';

// Dimensions 用于获取设备宽、高、分辨率
const {height} = Dimensions.get('window');

const MyWebView: React.FC<NavigationInjectedProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const color = {
    color: isDarkMode ? Colors.gray : Colors.darker,
  };
  const containerStyle = {
    ...backgroundStyle,
    height,
  };
  const moreIconStyle = {
    ...color,
    fontSize: Size.iconSize,
  };
  const modalViewStyle: StyleProp<ViewStyle> = {
    ...backgroundStyle,
    ...styles.modalViewStyle,
  };
  const [visible, setVisible] = useState(false);
  const onPressShowModal = () => setVisible(true);
  const onClose = () => setVisible(false);
  const [percent, setPercent] = useState(1);
  const webViewRef = useRef<WebView>(null);
  return (
    <SafeAreaView style={containerStyle}>
      <NavHeader navigation={navigation} percent={percent}>
        <TouchableOpacity onPress={onPressShowModal}>
          <Icon name="ellipsis" style={moreIconStyle} />
          <Text style={color}>更多</Text>
        </TouchableOpacity>
      </NavHeader>
      <WebView
        source={{
          uri: `${
            navigation.getParam('baseUrl') || BaseUrl
          }${navigation.getParam('url')}`,
        }}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        style={backgroundStyle}
        renderError={(errorDomain, errorCode, errorDesc) => (
          <Loading
            type={LoadingEnum.ERROR}
            text={`加载失败 CODE:${errorCode}\nDESC:${errorDesc}`}
          />
        )}
        startInLoadingState
        renderLoading={() => <Loading type={LoadingEnum.LOADING} />}
        //设置进度 progress值为0～1
        onLoadProgress={({nativeEvent}) =>
          setPercent(nativeEvent.progress * 100)
        }
        ref={webViewRef}
      />
      <Modal
        popup
        visible={visible}
        animationType="slide-up"
        onClose={onClose}
        closable={true}
        maskClosable
        style={styles.transBackground}>
        <View style={modalViewStyle}>
          <View style={styles.flexRowView}>
            <Square
              name="刷新"
              icon={{name: 'reload', needBg: true}}
              onPress={() => {
                webViewRef.current?.reload();
                onClose();
              }}
            />
            <Square
              name="关闭本页"
              icon={{name: 'close', color: Colors.watermelon, needBg: true}}
              onPress={() => {
                onClose();
                navigation.goBack();
              }}
            />
          </View>
          <BlankLine />
          <GhostButton name="取消" onPress={onClose} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export {MyWebView};
