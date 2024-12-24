import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../pages/HomeScreen';
import ChatScreen from '../pages/ChatScreen';

const Stack = createNativeStackNavigator();

export default function HomeScreenNavigation() {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: true }} // Show header with the back arrow
      />
      <Stack.Screen
        name="chat"
        component={ChatScreen}
        options={{ headerShown: true }} // Show header with the back arrow
      />
    </Stack.Navigator>
  );
}
