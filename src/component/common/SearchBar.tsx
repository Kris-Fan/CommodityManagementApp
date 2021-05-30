import React from 'react';
import {useColorScheme, StyleProp, TextStyle} from 'react-native';
import AntSearchBar from '@ant-design/react-native/lib/search-bar';
import {WithThemeStyles} from '@ant-design/react-native/lib/style';
import {SearchBarStyle} from '@ant-design/react-native/lib/search-bar/style';
import {Colors} from '../../constant';
import {Style as styles} from '../../constant/Style';
import {
  SearchBarPropsType,
  SearchBarState,
} from '@ant-design/react-native/lib/search-bar/PropsType';

interface ISearchBarType extends SearchBarState, SearchBarPropsType {
  placeholder: string;
}

// 封装查询组件
const SearchBar: React.FC<ISearchBarType> = ({
  placeholder = '搜索',
  onSubmit,
  onChange,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const searchStyle: StyleProp<TextStyle> | WithThemeStyles<SearchBarStyle> = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lightBg,
    color: isDarkMode ? Colors.white : Colors.black,
    ...styles.searchStyle,
    flexWrap: 'nowrap',
  };
  return (
    <AntSearchBar
      style={searchStyle}
      placeholder={placeholder}
      {...onSubmit}
      {...onChange}
    />
  );
};

export default SearchBar;
