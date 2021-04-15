import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {colors} from '../global';

import DrawerContent from '../components/Drawer';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import SignIn from '../pages/SignIn';
import Recover from '../pages/Recover';
import SignUp from '../pages/SignUp';
import Promotions from '../pages/Promotions';
import NewPromotion from '../pages/NewPromotion';

const App = createStackNavigator();
let state = null;

const StackRoutes = props => {
  useEffect(() => {
    state = props;
  }, [props]);
  return (
    <App.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: colors.white},
        headerShown: false,
      }}
      // initialRouteName="WebView"
    >
      <App.Screen name="Home" component={Home} />
      <App.Screen name="Profile" component={Profile} />
      <App.Screen name="SignIn" component={SignIn} />
      <App.Screen name="Recover" component={Recover} />
      <App.Screen name="SignUp" component={SignUp} />
      <App.Screen name="Promotions" component={Promotions} />
      <App.Screen name="NewPromotion" component={NewPromotion} />
    </App.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const DrawerRoutes = () => {
  return (
    <Drawer.Navigator
      sceneContainerStyle={{backgroundColor: 'transparent'}}
      drawerContent={() => <DrawerContent state={state} />}>
      <Drawer.Screen name="Start" component={StackRoutes} />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
