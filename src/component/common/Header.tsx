import React, {useState} from 'react';
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
import Progress from '@ant-design/react-native/lib/progress';
import {
  NavigationScreenProp,
  NavigationRoute,
  NavigationParams,
} from 'react-navigation';
import {SearchBar, ISearchBar} from './LabelLine';

interface INavHeader {
  title?: string;
  color?: string;
  navigation: NavigationScreenProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >;
  percent?: number;
}

interface ISearchHeader extends ISearchBar {
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
}

const NavHeader: React.FC<INavHeader> = ({
  title,
  color,
  children,
  navigation,
  percent,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const headStyle: StyleProp<ViewStyle> = {
    backgroundColor: isDarkMode ? Colors.darker : color || Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    position: color === Colors.transparent ? 'absolute' : 'relative',
    width: '100%',
    alignItems: 'center',
  };
  const titleStyle = {
    fontSize: Size.normal,
  };
  const iconStyle = {
    fontSize: Size.iconSize,
    color: isDarkMode ? Colors.white : Colors.darker,
  };
  const progressStyle: StyleProp<ViewStyle> = {
    position: 'relative',
    zIndex: 999,
    display: !percent || percent > 99 ? 'none' : 'flex',
  };
  return (
    <View>
      <View style={headStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" style={iconStyle} />
        </TouchableOpacity>
        <Flex>
          <Text style={titleStyle}>{title}</Text>
        </Flex>
        <View>{children}</View>
      </View>
      <Progress
        style={progressStyle}
        position="fixed"
        unfilled={false}
        percent={percent}
      />
    </View>
  );
};

const SearchHeader: React.FC<ISearchHeader> = ({headerLeft, headerRight}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [showRight, setShowRight] = useState(true);
  const headStyle: StyleProp<ViewStyle> = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    padding: 8,
    alignItems: 'center',
  };
  const leftStyle: StyleProp<ViewStyle> = {
    flex: 1,
    display: headerLeft ? 'flex' : 'none',
  };
  const searchStyle: StyleProp<ViewStyle> = {
    flex: 3,
  };
  const rightStyle: StyleProp<ViewStyle> = {
    flex: 1,
    display: showRight && headerRight ? 'flex' : 'none',
  };
  const onFocus = () => setShowRight(false);
  const onBlur = () => setShowRight(true);
  return (
    <View style={headStyle}>
      <View style={leftStyle}>{headerLeft}</View>
      <View style={searchStyle}>
        <SearchBar onFocus={onFocus} onBlur={onBlur} />
      </View>
      <View style={rightStyle}>{headerRight}</View>
    </View>
  );
};

export {NavHeader, SearchHeader};
