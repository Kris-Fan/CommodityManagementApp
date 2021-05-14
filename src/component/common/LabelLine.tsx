import React, {useState} from 'react';
import {useColorScheme, View, Text, TextInput, StyleProp, ViewStyle} from 'react-native';
import {Colors, Size} from '../../constant';
import Flex from '@ant-design/react-native/lib/flex';
import Icon from '../common/Icon';
import styles from '../../constant/Style';
import {FillGlyphMapType} from '@ant-design/icons-react-native/lib/index';
import {OutlineGlyphMapType} from '@ant-design/icons-react-native/lib/index';
import AntInputItem from '@ant-design/react-native/lib/input-item';
import AntList from '@ant-design/react-native/lib/list'

/**
 * 展示行，带标签/icon
 */
const LabelLine: React.FC<{
  title?: string;
  content: string;
  icon?: {
    name?: OutlineGlyphMapType;
    fillName?: FillGlyphMapType;
    color?: string;
    size?: number;
  };
}> = ({title, content, icon}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [needIcon] = useState(icon);
  const [needTitle] = useState(title);
  const viewStyle = {
    padding: 5,
    ...styles.btmLine,
  };
  const titleStyle = {
    fontSize: Size.normal,
    color: Colors.gray,
  };
  const contentStyle = {
    fontSize: Size.normal,
    marginLeft: needIcon || needTitle ? Size.normal : 0,
    marginBottom: 4,
  };
  const iconStyle = {
    fontSize: icon?.size || Size.iconSize,
    color: isDarkMode ? Colors.gray : icon?.color || Colors.gray,
    marginRight: 4,
  };
  const renderIcon = () => {
    if (needIcon) {
      return (
        <Icon
          name={needIcon.name}
          fillName={needIcon.fillName}
          style={iconStyle}
        />
      );
    }
  };
  const renderTitle = () => {
    if (needTitle) {
      return <Text style={titleStyle}>{needTitle}</Text>;
    }
  };
  const renderLeftFlex = () => {
    if (needTitle || needIcon) {
      return (
        <Flex justify="start">
          {renderIcon()}
          {renderTitle()}
        </Flex>
      );
    }
  };
  return (
    <View style={viewStyle}>
      <Flex justify="start">
        {renderLeftFlex()}
        <Text style={contentStyle}>{content}</Text>
      </Flex>
    </View>
  );
};

/**
 * 自定义搜索栏
 */
const SearchBar: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const wrapStyle: StyleProp<ViewStyle> = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.lighter,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 5,
  };
  const searchIconStyle = {
    fontSize: Size.iconSize,
    color: isDarkMode ? Colors.gray : Colors.primary,
    paddingLeft: 5,
  }
  const inputStyle = {
    minWidth: 250,
    fontSize: Size.small,
    marginLeft: 5,
  }
  return (
    <View style={wrapStyle}>
      <Icon name="search" style={searchIconStyle}/>
      <TextInput style={inputStyle} placeholder="搜索..." clearButtonMode="while-editing"></TextInput>
    </View>
  );
};

export {LabelLine, SearchBar};
