import React, {useState} from 'react';
import {
  useColorScheme,
  View,
  Text,
  TextInput,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import {Colors, Size, Style as styles} from '../../constant';
import Flex from '@ant-design/react-native/lib/flex';
import Icon from '../common/Icon';
import {FillGlyphMapType} from '@ant-design/icons-react-native/lib/index';
import {OutlineGlyphMapType} from '@ant-design/icons-react-native/lib/index';
import Toast from '@ant-design/react-native/lib/toast';
import Modal from '@ant-design/react-native/lib/modal';

export interface ISearchBar {
  onChange?: (_?: any) => void;
  onBlur?: (_?: any) => void;
  onFocus?: (_?: any) => void;
}

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
  rightIcon?: boolean;
  onPress?: (_?: any) => void;
  onLongPress?: (_?: any) => void;
}> = ({title, content, icon, rightIcon, onPress, onLongPress}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [needIcon] = useState(icon);
  const [needTitle] = useState(title);
  const viewStyle = {
    paddingTop: 8,
    backgroundColor: isDarkMode ? Colors.dark : Colors.white,
    paddingHorizontal: rightIcon ? 24 : 0,
  };
  const titleStyle = {
    fontSize: Size.normal,
    color: Colors.gray,
  };
  const textViewStyle: StyleProp<ViewStyle> = {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...styles.btmLine,
    borderBottomColor: isDarkMode ? Colors.darker : Colors.light,
  };
  const contentStyle = {
    fontSize: Size.normal,
    marginLeft: needIcon || needTitle ? Size.normal : 0,
    color: isDarkMode ? Colors.lighter : Colors.dark,
  };
  const iconStyle = {
    fontSize: icon?.size || Size.iconSize,
    color: icon?.color || Colors.gray,
    marginRight: 4,
  };
  const rightIconStyle = {
    fontSize: Size.iconSizeLight,
    color: Colors.light,
    paddingVertical: 8,
  };
  // 渲染图标
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
  // 渲染标题
  const renderTitle = () => {
    if (needTitle) {
      return <Text style={titleStyle}>{needTitle}</Text>;
    }
  };
  // 渲染左侧内容（图标+标题名字）
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
  const renderRightView = () => {
    if (rightIcon) {
      return <Icon name="right" style={rightIconStyle} />;
    }
  };
  const iOnLongPress = (iContent: string) => {
    if (onLongPress) {
      return onLongPress();
    }
    return Modal.operation([
      {
        text: '复制信息',
        onPress: () => {
          if (iContent) {
            Clipboard.setString(iContent);
            Clipboard.getString()
              .then(() => {
                Toast.success(
                  `已复制：${
                    iContent.length > 6
                      ? iContent.slice(0, 6) + '...'
                      : iContent
                  }`,
                  2,
                );
              })
              .catch(() => {
                Toast.fail('ERROR-复制失败');
              });
          } else {
            Toast.info('没有相关信息，请先更新数据');
          }
        },
      },
    ]);
  };
  return (
    <TouchableOpacity
      style={viewStyle}
      onPress={onPress}
      onLongPress={() => iOnLongPress(content)}>
      <Flex justify="start">
        {renderLeftFlex()}
        <View style={textViewStyle}>
          <Text style={contentStyle}>{content}</Text>
          {renderRightView()}
        </View>
      </Flex>
    </TouchableOpacity>
  );
};

/**
 * 自定义搜索栏
 */
const SearchBar: React.FC<ISearchBar> = ({onBlur, onFocus, onChange}) => {
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
  };
  const inputStyle = {
    minWidth: 250,
    fontSize: Size.small,
    marginLeft: 5,
  };
  return (
    <View style={wrapStyle}>
      <Icon name="search" style={searchIconStyle} />
      <TextInput
        style={inputStyle}
        placeholder="搜索..."
        clearButtonMode="while-editing"
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
      />
    </View>
  );
};

export {LabelLine, SearchBar};
