import React, {useState, useRef} from 'react';
import {
  useColorScheme,
  Dimensions,
  TouchableOpacity,
  View,
  StatusBar,
  BackHandler,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {NavHeader} from '../common/Header';
import {Colors, BaseUrl, Size} from '../../constant';
import {basicStyle, Style as styles} from '../../constant/Style';
import {NavigationInjectedProps} from 'react-navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '../common/Icon';
import Modal from '@ant-design/react-native/lib/modal';
import {GhostButton} from '../common/Button';
import {Square, BlankLine} from '../common/Square';
import {Loading, LoadingEnum} from './Loading';

// Dimensions 用于获取设备宽、高、分辨率
const {height} = Dimensions.get('window');

export interface IWebViewParam {
  baseUrl?: string;
  url: string;
  title?: string;
}

const MyWebView: React.FC<NavigationInjectedProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const {backgroundStyle, color, colorLight} = basicStyle(isDarkMode);

  const containerStyle = {
    ...backgroundStyle,
    height,
  };
  const moreIconStyle = {
    ...color,
    fontSize: Size.iconSize,
  };
  const [visible, setVisible] = useState(false);
  const [iCanGoBack, setICanGoBack] = useState(false);
  const [iCanGoForward, setICanGoForward] = useState(false);
  const onPressShowModal = () => setVisible(true);
  const onClose = () => setVisible(false);
  const [percent, setPercent] = useState(1);
  const webViewRef = useRef<WebView>(null);
  const iData: IWebViewParam = {
    baseUrl: navigation.getParam('baseUrl') || BaseUrl,
    url: navigation.getParam('url'),
    title: navigation.getParam('title'),
  };
  return (
    <SafeAreaView style={containerStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent
      />
      <NavHeader
        navigation={navigation}
        percent={percent}
        title={iData.title}
        goBack={() => {
          if (iCanGoBack) {
            webViewRef.current?.goBack();
          } else {
            navigation.goBack();
          }
        }}>
        <TouchableOpacity onPress={onPressShowModal}>
          <Icon name="ellipsis" style={moreIconStyle} />
        </TouchableOpacity>
      </NavHeader>
      <WebView
        source={{
          uri: `${iData.baseUrl}${iData.url}`,
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
        onNavigationStateChange={({canGoBack, canGoForward}) => {
          // 如果可以回退就使用 webview.goBack() ; 如果不能回退就执行 navigator 的出栈操作
          setICanGoBack(canGoBack);
          setICanGoForward(canGoForward);
        }}
      />
      <Modal
        popup
        visible={visible}
        animationType="slide-up"
        onClose={onClose}
        closable={true}
        maskClosable
        style={styles.transBackground}>
        <View style={[backgroundStyle, styles.modalViewStyle]}>
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
            <Square
              name="前进"
              icon={{name: 'forward', color: colorLight.color, needBg: true}}
              onPress={() => {
                onClose();
                webViewRef.current?.goForward();
              }}
              hidden={!iCanGoForward}
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
