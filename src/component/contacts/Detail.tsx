import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Button,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {Colors, Size} from '../../constant';
import {NavigationInjectedProps} from 'react-navigation';
import Flex from '@ant-design/react-native/lib/flex';
import Icon from '../common/Icon';
import Circle from '../common/Circle';
import {LabelLine} from '../common/LabelLine';
import {BlankLine} from '../common/Square';
import {NavHeader} from '../common/Header';
import styles from '../../constant/Style';
import {convertToTelephone} from '../../utils/displayFormat';

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
  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.white}
      />
      <NavHeader navigation={navigation} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View>
          <ContactTitle title={navigation.getParam('name')} />
          <View style={itemStyle}>
            <BlankLine />
            <TelephoneLine telephone={navigation.getParam('telphone')} />
            <BlankLine />
            <LabelLine
              icon={{name: 'copyright'}}
              content={navigation.getParam('company')}
            />
            <BlankLine />
            <LabelLine
              icon={{name: 'environment'}}
              content={navigation.getParam('address')}
            />
            <BlankLine />
            <LabelLine
              icon={{name: 'mail'}}
              content={navigation.getParam('email')}
            />
          </View>
        </View>
        <Button
          onPress={() => navigation.goBack()}
          title="Go back from this HomeScreen"
        />
      </ScrollView>
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
    color: Colors.dark,
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
  };
  const iconStyle = {
    fontSize: Size.iconSize,
    color: isDarkMode ? Colors.gray : Colors.dark,
    marginLeft: Size.normal,
  };
  return (
    <View style={viewStyle}>
      <Flex justify="between">
        <Text style={telephoneStyle}>{convertToTelephone(telephone)}</Text>
        <Flex justify="around">
          <Icon name="copy" style={iconStyle} />
          <Icon name="phone" style={iconStyle} />
          <Icon name="message" style={iconStyle} />
        </Flex>
      </Flex>
    </View>
  );
};

export default Detail;
