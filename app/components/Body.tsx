// @flow
import React, { useEffect, useRef, useState } from 'react';
import type { Node } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { NativeRouter, Routes, Route } from 'react-router-native';
import { secondsToMilliseconds } from 'date-fns';
import Scales from './screens/Scales';
import Chords from './screens/Chords';
import Rewarded from './screens/Rewarded';
import Info from './screens/Info';
import StateTree from './screens/StateTree';
import Loading from './screens/Loading';
import Navigation from './containers/navigation/Navigation';
import Backgrounds from './elements/backgrounds/Backgrounds';
import AdmobBanner from './elements/misc/AdmobBanner';
import { actions, actions as globalActions } from '../store/globalStore';
import { initializeAds } from '../utils';
import mainStyle from '../styles/main';

function Body(): Node {
  const dispatch = useDispatch();
  const initLoad = useRef(true);
  const [loadingAnimationDone, setLoadingAnimationDone] = useState(false);
  // const announcementSeen = get(cms, 'timestamps.local.announcement', 0) < get(cms, 'timestamps.announcement', 0);

  useEffect(() => {
    if (initLoad.current) {
      initLoad.current = false;
      dispatch(globalActions.getDeploymentData());

      setTimeout(() => {
        initializeAds().then((response) => {
          dispatch(actions.showAds(response.showAds));
          dispatch(actions.showPersonalisedAds(response.personalisedAds));
        }).finally(() => {
          setLoadingAnimationDone(true);
        });
      }, secondsToMilliseconds(3));
    }

    return () => clearTimeout();
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
