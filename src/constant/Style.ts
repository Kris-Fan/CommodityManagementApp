import {StyleSheet} from 'react-native';
import {Size, Colors} from './';

export const Style = StyleSheet.create({
  textArea: {
    paddingHorizontal: 24,
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
    marginTop: 32,
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
});
