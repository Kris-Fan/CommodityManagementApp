import React, {useState} from 'react';
import {StyleProp, TextStyle} from 'react-native';
import IconOutline from '@ant-design/icons-react-native/lib/outline';
import IconFill from '@ant-design/icons-react-native/lib/fill';
import {FillGlyphMapType} from '@ant-design/icons-react-native/lib/index';
import {OutlineGlyphMapType} from '@ant-design/icons-react-native/lib/index';

interface IIcon {
  name?: OutlineGlyphMapType;
  fillName?: FillGlyphMapType;
  style?: StyleProp<TextStyle>;
}

const Icon: React.FC<IIcon> = ({name, fillName, style}) => {
  // 是否需要图标
  const [outline] = useState(name);
  const renderIcon = () => {
    if (outline) {
      return <IconOutline name={name || 'appstore'} style={style} />;
    }
    return <IconFill name={fillName || 'appstore'} style={style} />;
  };
  return renderIcon();
};

/**
 * 图标SVG
 * ref:https://iconsvg.xyz
 * 支持自定义大小、颜色
 * @param size
 * @param color
 */

export default Icon;
