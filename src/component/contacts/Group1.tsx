import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  SectionList,
  Text,
} from 'react-native';
import ContactItem from '../common/ContactItem';
import {Colors, Mock} from '../../constant';
import {Style as styles} from '../../constant/Style';
import SearchBar from '../common/SearchBar';
import Toast from '@ant-design/react-native/lib/toast';
import {NavigationInjectedProps} from 'react-navigation';
import {ModalAlert} from '../common/Modal';

const Group1: React.FC<NavigationInjectedProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? Colors.darker : Colors.lightBg;
  const backgroundStyle = {
    backgroundColor,
    paddingLeft: 24,
  };
  const alphaStyle = {
    backgroundColor,
    ...styles.alpha,
    marginBottom: 20,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent
      />
      <SearchBar
        placeholder={'搜索联系人'}
        onChange={value => Toast.fail(value)}
      />
      <SectionList
        // 数据源
        sections={Mock.CONTACT_DATA}
        // 此函数用于为给定的item生成一个不重复的key
        keyExtractor={(item, index) => item.id + index}
        // 根据行数据data渲染每一行的组件
        renderItem={({item, index}) => (
          <ContactItem
            title={item.name}
            onPress={() => navigation.navigate('ContactDetail', item)}
            onLongPress={() => ModalAlert(item.name)}>
            {item.telphone} + {index} + {item.company}
          </ContactItem>
        )}
        renderSectionHeader={({section: {alpha}}) => (
          <Text style={alphaStyle}>{alpha}</Text>
        )}
        stickySectionHeadersEnabled
      />
    </SafeAreaView>
  );
};

export default Group1;
