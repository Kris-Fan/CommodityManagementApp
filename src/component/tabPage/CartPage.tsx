import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors, Style as styles} from '../../constant';

/**
 * 订单页面
 */
const links = [
  {
    id: 1,
    name: 'CartPage me',
  },
];

const CartPage: React.FC<{}> = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {links.map(({id, name}) => {
          <Fragment key={id}>
            <View
              style={[
                styles.separator,
                {
                  backgroundColor: isDarkMode ? Colors.dark : Colors.light,
                },
              ]}
            />
            <Text>
              {id}, {name}
            </Text>
          </Fragment>;
        })}
      </Text>
    </SafeAreaView>
  );
};

export default CartPage;
