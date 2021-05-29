import {StyleSheet} from 'react-native';
import {Size, Colors} from './';

export const Style = StyleSheet.create({
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
  textArea: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    paddingTop: 4,
  },
  fullScreen: {
    height: '100%',
    width: '100%',
  },
  transBackground: {
    backgroundColor: Colors.transparent,
  },
  sectionContainer: {
    marginTop: 14,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  btmLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.light,
  },
  tabBar: {
    fontSize: 20,
    fontWeight: '600',
  },
  alpha: {
    fontWeight: '700',
    fontSize: Size.normal,
    color: Colors.primary,
  },
  searchStyle: {
    height: 35,
    borderRadius: 30,
  },
  btnStyle: {
    borderRadius: 14,
  },
  modalTitle: {
    fontSize: Size.normal,
    color: Colors.primary,
  },
  modalContent: {
    fontSize: Size.normal,
  },
  modalContentLight: {
    fontSize: Size.small,
  },
  commonBorderRadius: {
    /**
     * 8
     */
    borderRadius: 8,
  },
  modalViewStyle: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  flexRowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lightTitle: {
    color: Colors.gray,
    fontSize: Size.small,
    marginBottom: 8,
    marginLeft: 10,
  },
  input: {
    minWidth: 250,
    fontSize: Size.small,
    marginLeft: 5,
    flex: 1,
  },
});

export const basicStyle = (isDarkMode: boolean) => {
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const backgroundStyleLight = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.white,
  };
  const color = {
    color: isDarkMode ? Colors.white : Colors.dark,
  };
  const colorLight = {
    color: isDarkMode ? Colors.gray : Colors.grisaillf,
  };
  return {
    backgroundStyle,
    backgroundStyleLight,
    color,
    colorLight,
  };
};
