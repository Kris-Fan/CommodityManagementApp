/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import Provider from '@ant-design/react-native/lib/provider';
import {useColorScheme} from 'react-native';

const App = () => {
  const scheme = useColorScheme();

  return (
    <Provider>
      <AppNavigation theme={scheme === 'dark' ? 'dark' : 'light'} />
    </Provider>
  );
};

export default App;
