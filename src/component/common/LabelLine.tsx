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
  TextStyle,
} from 'react-native';
import {Colors, Size} from '../../constant';
import {Style as styles} from '../../constant/Style';
import Flex from '@ant-design/react-native/lib/flex';
import Icon from '../common/Icon';
import {FillGlyphMapType} from '@ant-design/icons-react-native/lib/index';
import {OutlineGlyphMapType} from '@ant-design/icons-react-native/lib/index';
import Toast from '@ant-design/react-native/lib/toast';
import Modal from '@ant-design/react-native/lib/modal';
import {RetangleGroupLight} from './Square';

export interface ISearchBar {
  onChange?: (_?: any) => void;
  onBlur?: (_?: any) => void;
  onFocus?: (_?: any) => void;
}

interface LabelLineBase {
  title?: string;
  icon?: {
    name?: OutlineGlyphMapType;
    fillName?: FillGlyphMapType;
    color?: string;
    size?: number;
  };
  rightIcon?: boolean; // 右侧箭头
  rightDesc?: string; // 右侧描述
  disabled?: boolean;
  paddingH?: number;
  onPress?: (_?: any) => void;
  onLongPress?: (_?: any) => void;
}

/**
 * 展示行，带标签/icon
 */
const LabelLine: React.FC<
  LabelLineBase & {
    content: string;
    noUnderLine?: boolean; // 不显示下划线
  }
> = ({
  title,
  content,
  icon,
  rightIcon,
  rightDesc,
  noUnderLine,
  paddingH,
  onPress,
  onLongPress,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [needIcon] = useState(icon);
  const [needTitle] = useState(title);
  const viewStyle = {
    paddingTop: 8,
    backgroundColor: isDarkMode ? Colors.dark : Colors.white,
    paddingHorizontal: rightIcon ? 24 : paddingH || 0,
  };
  const titleStyle = {
    fontSize: Size.normal,
    color: Colors.gray,
  };
  const underLine = noUnderLine ? {} : styles.btmLine;
  const textViewStyle: StyleProp<ViewStyle> = {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...underLine,
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
  const renderRightView = () => {
    if (rightIcon) {
      return (
        <View style={rightViewStyle}>
          <Text style={rightTextStyle}>{rightDesc}</Text>
          <Icon name="right" style={rightIconStyle} />
        </View>
      );
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
        {renderLeftFlex(needIcon, iconStyle, needTitle, titleStyle)}
        <View style={textViewStyle}>
          <Text style={contentStyle}>{content}</Text>
          {renderRightView()}
        </View>
      </Flex>
    </TouchableOpacity>
  );
};

/**
 * 展示行，带标签/icon，右侧内容可以完全自定义
 */
const LabelLineLight: React.FC<
  LabelLineBase & {color?: {titleColor: string; bgColor: string}}
> = ({
  title,
  icon,
  rightIcon,
  rightDesc,
  disabled,
  paddingH,
  onPress,
  onLongPress,
  children,
  color,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [needIcon] = useState(icon);
  const [needTitle] = useState(title);
  const viewStyle = {
    backgroundColor:
      color?.bgColor || (isDarkMode ? Colors.dark : Colors.white),
    paddingHorizontal: rightIcon ? 14 : paddingH || 6,
  };
  const titleStyle = {
    color: color?.titleColor || Colors.grisaillf,
  };
  const iconStyle = {
    fontSize: icon?.size || Size.iconSize,
    color: icon?.color || Colors.grisaillf,
    marginRight: 4,
  };
  const renderRightView = () => {
    if (rightIcon) {
      return (
        <View style={rightViewStyle}>
          <Text style={rightTextStyle}>{rightDesc}</Text>
          <Icon name="right" style={rightIconStyle} />
        </View>
      );
    }
  };
  return (
    <TouchableOpacity
      style={viewStyle}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}>
      <Flex justify="between">
        {renderLeftFlex(needIcon, iconStyle, needTitle, titleStyle)}
        <Flex justify="end">
          {children}
          {renderRightView()}
        </Flex>
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
        selectionColor={Colors.primary}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        maxLength={20}
      />
    </View>
  );
};

export const LabelLineTint: React.FC<{
  title?: string;
  name?: string;
  iconName?: OutlineGlyphMapType;
  description?: string;
  onPress?: (_: any) => void;
  onLongPress?: (_?: any) => void;
  style?: {color?: string; tintColor?: string; bgColor?: string};
  rightIcon?: boolean;
  marginH?: number;
}> = ({
  title,
  name,
  description,
  onPress,
  onLongPress,
  style,
  iconName,
  rightIcon,
  marginH,
}) => {
  return (
    <View>
      <RetangleGroupLight
        title={title}
        bgColor={style?.bgColor || Colors.primary}
        color={style?.color || Colors.light}
        marginH={marginH}>
        <LabelLineLight
          title={name}
          icon={{name: iconName, color: style?.tintColor || Colors.white}}
          color={{
            bgColor: Colors.transparent,
            titleColor: style?.color || Colors.light,
          }}
          rightIcon={rightIcon}
          onPress={onPress}
          onLongPress={onLongPress}>
          <Text style={{color: style?.color || Colors.light}}>
            {description}
          </Text>
        </LabelLineLight>
      </RetangleGroupLight>
    </View>
  );
};

// 渲染图标
const renderIcon = (iNeedIcon: any, iIconStyle: StyleProp<TextStyle>) => {
  if (iNeedIcon) {
    return (
      <Icon
        name={iNeedIcon.name}
        fillName={iNeedIcon.fillName}
        style={iIconStyle}
      />
    );
  }
};
// 渲染标题
const renderTitle = (
  iNeedTitle: string | undefined,
  iTitleStyle: StyleProp<TextStyle>,
) => {
  if (iNeedTitle) {
    return <Text style={iTitleStyle}>{iNeedTitle}</Text>;
  }
};
// 渲染左侧内容（图标+标题名字）
const renderLeftFlex = (
  iNeedIcon: any,
  iIconStyle: StyleProp<TextStyle>,
  iNeedTitle: string | undefined,
  iTitleStyle: StyleProp<TextStyle>,
) => {
  if (iNeedTitle || iNeedIcon) {
    return (
      <Flex justify="start">
        {renderIcon(iNeedIcon, iIconStyle)}
        {renderTitle(iNeedTitle, iTitleStyle)}
      </Flex>
    );
  }
};
const rightViewStyle: StyleProp<ViewStyle> = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
};
const rightIconStyle = {
  fontSize: Size.iconSizeLight,
  color: Colors.light,
  paddingVertical: 8,
};
const rightTextStyle = {
  fontSize: Size.small,
  color: Colors.grisaillf,
};

export {LabelLine, LabelLineLight, SearchBar};
