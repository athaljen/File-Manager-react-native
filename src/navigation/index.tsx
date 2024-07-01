'use strict;';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import Home from '../screens/Home';

type StackParamList = {Home: {name: string}};

export type StackScreenProps<S extends keyof StackParamList> = {
  route: RouteProp<StackParamList, S>;
  navigation: NativeStackNavigationProp<StackParamList, S>;
};

const Stack = createNativeStackNavigator<StackParamList>();

const Root = memo(() => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{animation: 'slide_from_right'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

const styles = StyleSheet.create({
  Root: {flex: 1},
});

export default Root;
