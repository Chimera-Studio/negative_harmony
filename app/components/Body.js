// @flow
import React, { useEffect, useRef, useState } from 'react';
import type { Node } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeRouter, Routes, Route } from 'react-router-native';
import Admob from 'react-native-google-mobile-ads';
import {
  get, isEmpty, isEqual, some, has,
} from 'lodash';
import { secondsToMilliseconds } from 'date-fns';
import Scales from './screens/Scales';
import Chords from './screens/Chords';
import Rewarded from './screens/Rewarded';
import Info from './screens/Info';
import Announcement from './screens/Announcement';
import Loading from './screens/Loading';
import Navigation from './containers/navigation/Navigation';
import Backgrounds from './elements/backgrounds/Backgrounds';
import AdmobBanner from './elements/misc/AdmobBanner';
import { actions as cmsActions, selectors } from '../store/cmsStore';
import { actions as globalActions } from '../store/globalStore';
import { handleAdsConsent } from '../utils';
import { appKeys } from '../tokens';
import mainStyle from '../styles/main';
import type { State as StateCMS } from '../store/cmsStore';
import type { ReduxState } from '../types';

function Body(): Node {
  const dispatch = useDispatch();
  const initLoad = useRef(true);
  const cms: StateCMS = useSelector(selectors.getCMS, isEqual);
  const deploymentEnvironment = useSelector((state: ReduxState) => state.global.codepushData?.environment, isEqual);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [adsReady, setAdsReady] = useState(false);
  const [loadingAnimationDone, setLoadingAnimationDone] = useState(false);
  const localTimestamps = get(cms, 'timestamps.local', 0);
  const onlineTimestamps = get(cms, 'timestamps.online', null);
  const hasAnnouncement = get(cms, 'announcement.content');
  const hasLocalData = !isEqual(localTimestamps, appKeys.noLocalData);
  const hasOnlineData = !isEqual(onlineTimestamps, appKeys.noConnection);
  const announcementSeen = get(cms, 'timestamps.local.announcement', 0) < get(cms, 'timestamps.announcement', 0);
  const isLoading = some(['master', 'scales', 'chords', 'timestamps'], (key) => !has(cms, key));

  const startAds = () => {
    Admob().initialize().then(() => {
      setAdsReady(true);
    });
  };

  const askForPermission = async () => {
    const { personalisedAds, showAds } = await handleAdsConsent();

    if (!showAds) {
      dispatch(globalActions.showAds(false));

      return;
    }

    dispatch(globalActions.showPersonalisedAds(personalisedAds));
    startAds();
  };

  useEffect(() => {
    if (initLoad.current) {
      initLoad.current = false;
      dispatch(globalActions.getDeploymentData());

      setTimeout(() => {
        askForPermission();
        setLoadingAnimationDone(true);
      }, secondsToMilliseconds(3));
    }

    return () => clearTimeout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isEmpty(deploymentEnvironment)) {
      dispatch(cmsActions.fetchCMS(deploymentEnvironment));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deploymentEnvironment]);

  if (
    (!hasLocalData && !hasOnlineData)
    || (hasAnnouncement && !announcementSeen && showAnnouncement)
  ) {
    return (
      <Announcement
        reload={() => dispatch(cmsActions.fetchCMS(deploymentEnvironment))}
        dismiss={() => setShowAnnouncement(false)}
        cms={hasAnnouncement}
      />
    );
  }

  if (isLoading || !loadingAnimationDone) return <Loading />;

  return (
    <View style={mainStyle.container}>
      <StatusBar hidden />
      <NativeRouter>
        <Backgrounds />

        <SafeAreaView style={mainStyle.safe}>
          <Navigation />
          <Routes>
            <Route exact path="/" element={<Scales />} />
            <Route path="/chords" element={<Chords />} />
            <Route path="/rewarded" element={<Rewarded />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </SafeAreaView>
        <AdmobBanner showAd={adsReady} />
      </NativeRouter>
    </View>
  );
}

export default Body;
