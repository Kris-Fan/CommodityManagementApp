import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Linking,
  Clipboard,
} from 'react-native';
import {
  Colors,
  Style as styles,
  Size,
  StaticsCustomerUrl,
} from '../../constant';
import {NavigationInjectedProps} from 'react-navigation';
import Flex from '@ant-design/react-native/lib/flex';
import Icon from '../common/Icon';
import Circle from '../common/Circle';
import {LabelLine} from '../common/LabelLine';
import {Square, BlankLine} from '../common/Square';
import {NavHeader} from '../common/Header';
import {convertToTelephone} from '../../utils/displayFormat';
import Toast from '@ant-design/react-native/lib/toast';
import Modal from '@ant-design/react-native/lib/modal';
import {ModalAlert} from '../common/Modal';
import Section from '../common/Section';
import {Button, GhostButton} from '../common/Button';

const Detail: React.FC<NavigationInjectedProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const itemStyle: StyleProp<ViewStyle> = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.white,
    borderRadius: 8,
    flex: 1,
    padding: 10,
    margin: 12,
  };
  const modalViewStyle = {
    ...backgroundStyle,
    ...styles.modalViewStyle,
  };
  const name = navigation.getParam('name');
  const telphone = navigation.getParam('telphone');
  const company = navigation.getParam('company');
  const address = navigation.getParam('address');
  const email = navigation.getParam('email');
  const [validateParam, setValidateParam] = useState(!name || !telphone);
  const validateOnPress = () => {
    setValidateParam(false);
    navigation.navigate('MyWebView', {url: StaticsCustomerUrl});
  };
  const goBackScreen = () => {
    setValidateParam(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavHeader navigation={navigation} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View>
          <ContactTitle title={name} />
          <View style={itemStyle}>
            <BlankLine />
            <TelephoneLine telephone={telphone} />
            <BlankLine />
            <LabelLine icon={{name: 'copyright'}} content={company} />
            <BlankLine />
            <LabelLine icon={{name: 'environment'}} content={address} />
            <BlankLine />
            <LabelLine icon={{name: 'mail'}} content={email} />
          </View>
        </View>
      </ScrollView>
      <ContactBottom navigation={navigation} />
      {/*更多浮层 */}
      <Modal
        popup
        visible={validateParam}
        animationType="slide-up"
        style={styles.transBackground}>
        <View style={modalViewStyle}>
          <Section title="请补充完善联系人信息">
            联系人信息不完整，请前往编辑页面更新数据
          </Section>
          <BlankLine height={100} />
          <Button name="去 编 辑" onPress={validateOnPress} />
          <BlankLine />
          <GhostButton name="返 回" onPress={goBackScreen} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const ContactTitle: React.FC<{title: string; desc?: string}> = ({title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const viewStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    paddingBottom: 5,
  };
  const titleStyle: StyleProp<TextStyle> = {
    fontSize: Size.header,
    color: isDarkMode ? Colors.white : Colors.dark,
  };
  return (
    <View style={viewStyle}>
      <Flex justify="center" direction="column">
        <Circle name={title.slice(0, 1)} size={120} />
        <Text style={titleStyle}>{title}</Text>
      </Flex>
    </View>
  );
};

/**
 * 底部栏-提供功能：分析、编辑、删除
 */
const ContactBottom: React.FC<NavigationInjectedProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.white,
  };
  const color = {
    color: isDarkMode ? Colors.gray : Colors.grisaillf,
  };
  const containerStyle: StyleProp<ViewStyle> = {
    ...backgroundStyle,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  };
  return (
    <View style={containerStyle}>
      <Square
        name="交易数据"
        icon={{
          fillName: 'contacts',
          color: Colors.primaryLight,
          size: Size.iconSize,
        }}
        onPress={() =>
          navigation.navigate('MyWebView', {url: StaticsCustomerUrl})
        }
      />
      <Square name="编辑" icon={{fillName: 'edit', size: Size.iconSize}} />
      <Square
        name="删除"
        icon={{name: 'delete', color: color.color, size: Size.iconSize}}
        onPress={() => ModalAlert('')}
      />
    </View>
  );
};
const TelephoneLine: React.FC<{telephone: string}> = ({telephone}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const viewStyle = {
    padding: 5,
    ...styles.btmLine,
  };
  const telephoneStyle = {
    fontSize: Size.normal,
    marginLeft: 3,
    marginBottom: 4,
    color: isDarkMode ? Colors.lighter : Colors.dark,
  };
  const iconStyle = {
    fontSize: Size.iconSize,
    color: isDarkMode ? Colors.gray : Colors.dark,
    marginLeft: Size.normal,
  };
  const copyTel = (iTelephone: string) => {
    if (!iTelephone) {
      return;
    }
    Clipboard.setString(iTelephone);
    Clipboard.getString()
      .then(() => {
        Toast.success('已复制：' + iTelephone, 2);
      })
      .catch(() => {
        Toast.fail('ERROR-号码未复制');
      });
  };
  const callTel = (iTelephone: string) => {
    Linking.openURL('tel:' + iTelephone).catch(() => {
      Toast.fail('跳转拨号页失败，请检查权限');
    });
  };
  const sendSms = (iTelephone: string) => {
    const url = 'smsto:' + iTelephone;
    if (Linking.canOpenURL(url)) {
      Linking.openURL(url).catch(() => {
        Toast.fail('发短信失败');
      });
    } else {
      Toast.fail('无法打开短信应用');
    }
  };
  const onLongPress = (iTelephone: string) => {
    Modal.operation([
      {text: '复制号码', onPress: () => copyTel(iTelephone)},
      {text: '拨打电话', onPress: () => callTel(iTelephone)},
      {text: '发送短信', onPress: () => sendSms(iTelephone)},
    ]);
  };
  return (
    <TouchableOpacity
      style={viewStyle}
      onLongPress={() => onLongPress(telephone)}>
      <Flex justify="between">
        <Text style={telephoneStyle}>{convertToTelephone(telephone)}</Text>
        <Flex justify="around">
          <TouchableOpacity onPress={() => copyTel(telephone)}>
            <Icon name="copy" style={iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => callTel(telephone)}>
            <Icon name="phone" style={iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => sendSms(telephone)}>
            <Icon name="message" style={iconStyle} />
          </TouchableOpacity>
        </Flex>
      </Flex>
    </TouchableOpacity>
  );
};

export default Detail;
