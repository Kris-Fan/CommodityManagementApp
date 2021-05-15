import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from '../common/Icon';
import {FillGlyphMapType} from '@ant-design/icons-react-native/lib/index';
import {OutlineGlyphMapType} from '@ant-design/icons-react-native/lib/index';
import {Colors, Size, Style as styles} from '../../constant';

interface ISquare {
  name: string;
  descName?: string;
  icon?: {
    name?: OutlineGlyphMapType;
    fillName?: FillGlyphMapType;
    // 图标颜色
    color?: string;
    // 是否需要图标背景及其颜色
    needBg?: boolean | null | undefined;
    bgColor?: string;
    size?: number;
  };
  onPress?: (_?: any) => void;
}

/**
 * 方形图标形状功能选择块——适用于九宫格
 */
const Square: React.FC<ISquare> = ({name, descName, icon, onPress}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const borderStyle = {
    minWidth: 90,
    maxWidth: 95,
    borderRadius: 8,
  };
  const viewStyle: StyleProp<ViewStyle> = {
    padding: 10,
    justifyContent: 'space-between',
  };
  const iconStyle: StyleProp<TextStyle> = {
    color: icon?.color ? icon.color : Colors.primary,
    fontSize: icon?.size || Size.header1,
    textAlign: 'center',
  };
  const iconBgStyle = icon?.needBg
    ? {
        backgroundColor: isDarkMode
          ? Colors.dark
          : icon?.bgColor || Colors.white,
        ...styles.commonBorderRadius,
        paddingVertical: 8,
        marginHorizontal: 8,
        marginBottom: 2,
      }
    : {};
  const nameText: StyleProp<TextStyle> = {
    color: isDarkMode ? Colors.white : Colors.dark,
    fontSize: Size.small,
    textAlign: 'center',
  };
  const desText: StyleProp<TextStyle> = {
    color: Colors.gray,
    fontSize: Size.smaller,
    textAlign: 'center',
  };
  // 是否需要渲染标题
  const [needDescContent] = useState(descName);
  const renderDescContent = () => {
    if (needDescContent) {
      return <Text style={desText}>{needDescContent}</Text>;
    }
  };
  // 是否需要图标
  const [needIcon] = useState(icon);
  const renderIcon = () => {
    if (needIcon) {
      return (
        <View style={iconBgStyle}>
          <Icon name={icon?.name} fillName={icon?.fillName} style={iconStyle} />
        </View>
      );
    }
  };
  return (
    <TouchableOpacity style={borderStyle} onPress={onPress}>
      <View style={viewStyle}>
        {renderIcon()}
        <View>
          <Text style={nameText}>{name}</Text>
          {renderDescContent()}
        </View>
      </View>
    </TouchableOpacity>
  );
};

/**
 * 方形分组-可以制定标题
 */
const RetangleGroup: React.FC<{title?: string; bgColor?: string}> = ({
  title,
  bgColor,
  children,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const viewStyle: StyleProp<ViewStyle> = {
    marginLeft: 14,
    marginRight: 14,
    padding: 5,
    flexDirection: 'column',
    backgroundColor: isDarkMode ? Colors.dark : bgColor || Colors.white,
    borderRadius: 8,
  };
  const viewItemStyle: StyleProp<ViewStyle> = {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 4,
    borderRadius: 5,
  };
  const titleStyle: StyleProp<TextStyle> = {
    color: Colors.gray,
    fontSize: Size.small,
    marginBottom: 10,
    marginLeft: 10,
  };
  // 是否需要渲染标题
  const [needRenderTitle] = useState(title);
  const renderTitle = () => {
    if (needRenderTitle) {
      return <Text style={titleStyle}>{needRenderTitle}</Text>;
    }
  };
  return (
    <View style={viewStyle}>
      {renderTitle()}
      <View style={viewItemStyle}>{children}</View>
    </View>
  );
};

/**
 * 站位行，可指定高度
 */
const BlankLine: React.FC<{height?: number; needFill?: boolean}> = ({
  height,
  needFill,
}) => {
  const fillStyle = {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.transparent,
    height: height ? height : Size.small,
  };
  const viewStyle = {
    height: height ? height : Size.small,
    backgroundColor: Colors.transparent,
  };
  return <View style={needFill ? fillStyle : viewStyle} />;
};

export {Square, RetangleGroup, BlankLine};
