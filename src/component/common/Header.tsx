import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  useColorScheme,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from './Icon';
import {Colors, Size} from '../../constant';
import Flex from '@ant-design/react-native/lib/flex';
import {
  NavigationScreenProp,
  NavigationRoute,
  NavigationParams,
} from 'react-navigation';

interface INavHeader {
  title?: string;
  color?: string;
  navigation: NavigationScreenProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >;
}

interface ISearchHeader {
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
}

const NavHeader: React.FC<INavHeader> = ({
  title,
  color,
  children,
  navigation,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const headStyle: StyleProp<ViewStyle> = {
    backgroundColor: isDarkMode ? Colors.darker : color || Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  };
  const titleStyle = {
    fontSize: Size.normal,
  };
  return (
    <View style={headStyle}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" style={{fontSize: Size.iconSize}} />
      </TouchableOpacity>
      <Flex>
        <Text style={titleStyle}>{title}</Text>
      </Flex>
      <TouchableOpacity>{children}</TouchableOpacity>
    </View>
  );
};

const SearchHeader: React.FC<ISearchHeader> = ({
  headerLeft,
  headerRight,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const headStyle: StyleProp<ViewStyle> = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    padding: 8,
    alignItems: 'center'
  };
  const leftStyle: StyleProp<ViewStyle>  = {
    flex: 3,
  }
  const rightStyle: StyleProp<ViewStyle>  = {
    flex: 1,
  }
  return (
    <View style={headStyle}>
      <View style={leftStyle}>{headerLeft}</View>
      <View style={rightStyle}>{headerRight}</View>
    </View>
  );
};

export {NavHeader, SearchHeader};
