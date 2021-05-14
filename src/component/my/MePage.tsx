import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme, Text} from 'react-native';
import {Colors, Style as styles} from '../../constant';
import List from '@ant-design/react-native/lib/list';
import Icon from '@ant-design/react-native/lib/icon';
import MyHeader from './MyHeader';

// const links = [
//   {
//     id: 1,
//     name: 'first me',
//   },
// ];

const Item = List.Item;

const MePage: React.FC<{}> = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;
  const backgroundStyle = {
    backgroundColor,
    ...styles.textArea,
  };
  const itemStyle = {
    backgroundColor,
  };
  const textItemStyle = {
    marginLeft: 2,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MyHeader />
      <List renderHeader={'带缩略图'}>
        <Item
          style={itemStyle}
          thumb={<Icon name={'star'} />}
          arrow="horizontal">
          <Text style={textItemStyle}>thumb</Text>
        </Item>
        <Item
          style={itemStyle}
          thumb={<Icon name={'star'} />}
          arrow="horizontal">
          <Text style={textItemStyle}>thumb</Text>
        </Item>
        <Item
          style={itemStyle}
          thumb={<Icon name={'star'} />}
          arrow="horizontal">
          <Text style={textItemStyle}>thumb</Text>
        </Item>
      </List>
    </SafeAreaView>
  );
};

export default MePage;
