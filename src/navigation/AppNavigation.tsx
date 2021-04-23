import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import BottomTab from '../component/main/BottomTab';
import {createStackNavigator} from 'react-navigation-stack';
import ContactDetail from '../component/contacts/Detail';
// import {HomePage, MePage, LoginPage} from '../component';

// APP的启动页面必须使用createSwitchNavigator，防止按返回按钮回到启动页
/*
const IninNavigator = createSwitchNavigator({
  LoginPage: {
    screen: LoginPage,
    navigationOptions: {
      header: null,
    },
  },
});

const MainNavigator = createSwitchNavigator(
  {
    HomePage: {
      screen: HomePage,
      navigationOptions: {
        header: null,
      },
    },
    MePage: {
      screen: MePage,
      navigationOptions: {},
    },
  },
  {
    initialRouteName: 'HomePage',
  },
);
*/

const AppRouter = createStackNavigator({
  Home: {
    screen: createAppContainer(BottomTab),
    navigationOptions: {
      headerShown: false, //可以通过将header设为null来禁用StackNavigator的Navigation
    },
  },
  ContactDetail: {
    screen: ContactDetail,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const App = createSwitchNavigator(
  {
    // Init: IninNavigator,
    // Main: MainNavigator,
    AppRouter: AppRouter,
  },
  {
    initialRouteName: 'AppRouter',
  },
  //   {
  //     navigationOptions: {
  //       header: null,
  //     },
  //   },
);

const AppNavigation = createAppContainer(App); // react-navigation3.x必须使用createAppContainer包裹
export default AppNavigation;
