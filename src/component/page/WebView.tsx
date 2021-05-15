import React, {useState} from 'react';
import {
  StyleProp,
  ViewStyle,
  useColorScheme,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {WebView, WebViewProps} from 'react-native-webview';
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
  const modalViewStyle = {
    ...backgroundStyle,
    ...styles.modalViewStyle,
  };
  const [visible, setVisible] = useState(false);
  const onPressShowModal = () => setVisible(true);
  const onClose = () => setVisible(false);

  return (
    <SafeAreaView style={containerStyle}>
      <NavHeader navigation={navigation}>
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
        renderError={() => <Loading type={LoadingEnum.ERROR} />}
        startInLoadingState
        renderLoading={() => <Loading type={LoadingEnum.LOADING} />}
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
          <Square
            name="刷新"
            icon={{name: 'reload', needBg: true}}
            onPress={() => {}}
          />
          <BlankLine />
          <GhostButton name="取消" onPress={onClose} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export {MyWebView};
