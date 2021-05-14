import React from 'react';
import {StyleProp, ViewStyle, useColorScheme, View} from 'react-native';
import AntCarousel from '@ant-design/react-native/lib/carousel';
import {Colors} from '../../constant';

const Carousel: React.FC<{}> = ({children}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };
  const containerStyle: StyleProp<ViewStyle> = {
    ...backgroundStyle,
    borderRadius: 5,
  };

  return (
    <View style={containerStyle}>
      <AntCarousel style={backgroundStyle} selectedIndex={0} autoplay infinite>
        {children}
      </AntCarousel>
    </View>
  );
};

export {Carousel};
