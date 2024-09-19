import React , { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginStartedScreen from './src/screens/LoginStartedScreen';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import SignupScreen from './src/screens/SignupScreen';
import AIsScreen from './src/screens/AIsScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MessageHistoryScreen from './src/screens/MessageHistoryScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name={'messageHistoryScreen'} component={MessageHistoryScreen} />
      <Tab.Screen name={'AIsScreen'} component={AIsScreen} />
      <Tab.Screen name={'ProfileScreen'} component={ProfileScreen} />
    </Tab.Navigator>
  )
}

const App = () => {
  const [isLogined, setIsLogined] = useState(false);
  console.log("12312312311312323312 ", isLogined);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLogined ? 'TabNavigator' : 'LoginStartedScreen'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="LoginStartedScreen" component={LoginStartedScreen} />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          initialParams={{ setIsLogined: setIsLogined }}
        />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="AIsScreen" component={AIsScreen} options={{ gestureEnabled: false }} />
        {/*gestureEnabled ile geri gitmeyi engelledik*/}
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
