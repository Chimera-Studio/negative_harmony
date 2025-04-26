import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import { NativeRouter, Route, Routes } from 'react-router-native';
import Navigation from '@components/containers/navigation/Navigation';
import Backgrounds from '@components/elements/backgrounds/Backgrounds';
import Chords from '@components/screens/Chords';
import Info from '@components/screens/Info';
import Scales from '@components/screens/Scales';
import StateTree from '@components/screens/StateTree';
import mainStyle from '@styles/main';
import { isApple } from '@utils';

function Body() {
  useEffect(() => {
    if (!isApple) return;

    // The app code is not actually tracking anything but Apple says otherwise
    request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY).catch(() => { });
  }, []);

  return (
    <View style={mainStyle.container}>
      <StatusBar hidden />
      <NativeRouter>
        <Backgrounds />

        <SafeAreaView style={mainStyle.safe}>
          <Navigation />
          <Routes>
            <Route index element={<Scales />} />
            <Route path="/chords" element={<Chords />} />
            <Route path="/info" element={<Info />} />
            <Route path="/state-tree" element={<StateTree />} />
          </Routes>
        </SafeAreaView>
      </NativeRouter>
    </View>
  );
}

export default Body;
