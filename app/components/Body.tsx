import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import Navigation from '@components/containers/navigation/Navigation';
import Backgrounds from '@components/elements/backgrounds/Backgrounds';
import AdmobBanner from '@components/elements/misc/AdmobBanner';
import Chords from '@components/screens/Chords';
import Info from '@components/screens/Info';
import Loading from '@components/screens/Loading';
import Rewarded from '@components/screens/Rewarded';
import Scales from '@components/screens/Scales';
import StateTree from '@components/screens/StateTree';
import { actions } from '@store/globalStore';
import mainStyle from '@styles/main';
import { initializeAds } from '@utils';
import { useAppDispatch } from '@utils/hooks';
import { secondsToMilliseconds } from 'date-fns';

function Body() {
  const dispatch = useAppDispatch();
  const [loadingAnimationDone, setLoadingAnimationDone] = useState(false);
  const initLoad = useRef(true);
  const timeoutRef = useRef<any>();

  useEffect(() => {
    if (initLoad.current) {
      initLoad.current = false;

      timeoutRef.current = setTimeout(() => {
        initializeAds().then((response) => {
          dispatch(actions.showAds(response.showAds));
          dispatch(actions.showPersonalisedAds(response.personalisedAds));
        }).finally(() => {
          setLoadingAnimationDone(true);
        });
      }, secondsToMilliseconds(3));
    }

    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loadingAnimationDone) return <Loading />;

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
            <Route path="/rewarded" element={<Rewarded />} />
            <Route path="/info" element={<Info />} />
            <Route path="/state-tree" element={<StateTree />} />
          </Routes>
        </SafeAreaView>
        <AdmobBanner />
      </NativeRouter>
    </View>
  );
}

export default Body;
