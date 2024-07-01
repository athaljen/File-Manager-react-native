'use strict;';
import React, {memo, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Root from './src/navigation';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  return (
    <View style={styles.App}>
      <Root />
    </View>
  );
};

const styles = StyleSheet.create({
  App: {flex: 1},
  press: {alignSelf: 'center', marginTop: 100},
  text: {marginRight: 10, color: '#000000'},
});

export default memo(App);
