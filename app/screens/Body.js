import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { NativeRouter, Redirect, Route, BackButton } from "react-router-native";
import {
  requestPermissionsAsync,
  getPermissionsAsync,
  AdMobBanner,
} from "expo-ads-admob";
import * as Device from "expo-device";
import Constants from "expo-constants";

import BG from "./BG";
import Navigation from "../elements/Navigation";
import Info from "./Info";
import Rewarded from "./Rewarded";
import Chords from "./Chords";
import Scales from "./Scales";

import { eng } from "../locales";
import { useReview } from "../utils";
import { scaleList } from "../utils/patterns";
import { cmsFetch } from "../api";
import { MASTER_QUERY } from "../api/cms";
import { admob } from "../tokens";

import main_style from "../styles/main_style";

const reviewDelay = Date.now() + 60000;
const realDevice = Device.isDevice;
const admob_ios = {
  banner:
    realDevice && Constants.appOwnership === "standalone"
      ? admob.banner.ios
      : admob.banner.ios_test,
  rewarded:
    realDevice && Constants.appOwnership === "standalone"
      ? admob.rewarded.ios
      : admob.rewarded.ios_test,
};
const admob_android = {
  banner:
    realDevice && Constants.appOwnership === "standalone"
      ? admob.banner.android
      : admob.banner.android_test,
  rewarded:
    realDevice && Constants.appOwnership === "standalone"
      ? admob.rewarded.android
      : admob.rewarded.android_test,
};

function Body() {
  const [cmsData, setCmsData] = useState(null);
  const [displayAds, setDisplayAds] = useState(true);
  const [ads, setAds] = useState(false);
  const [personalised, setPersonalised] = useState(false);
  const [chordsUnlocked, setChordsUnlocked] = useState(false);
  const [alert, setAlert] = useState(false);
  const [legend, setLegend] = useState(false);

  const [selectedScale, setSelectedScale] = useState(scaleList[0]);
  const [scales, setScales] = useState(null);
  const [axis, setAxis] = useState({ status: false, angle: "0deg" });
  const [activeKey, setActiveKey] = useState({
    x: 0,
    y: 0,
    group: null,
    field: null,
  });

  const askForPermission = async () => {
    const { granted } = await getPermissionsAsync();
    if (granted) {
      setPersonalised(true);
      setAds(true);
    } else {
      const { status } = await requestPermissionsAsync();
      if (status === "granted") {
        setPersonalised(true);
      }
      setAds(true);
    }
  };

  const handleScaleCallbacks = (origin, val) => {
    if (origin === "selectedScale") setSelectedScale(val);
    else if (origin === "scales") setScales(val);
    else if (origin === "axis") setAxis(val);
    else if (origin === "activeKey") setActiveKey(val);
  };

  const handleReward = (origin) => {
    if (origin === "chords") setChordsUnlocked(true);
  };

  const handleAlert = () => {
    setAlert(true);
    setTimeout(() => setAlert(false), 3000);
  };

  useEffect(() => {
    cmsFetch(MASTER_QUERY, (data) => {
      setCmsData(data.appCollection.items[0]);
      setDisplayAds(
        Constants.appOwnership === "expo"
          ? data.appCollection.items[0].adsStaging
          : data.appCollection.items[0].ads
      );
    });
    setTimeout(askForPermission, 1000);
  }, []);

  return (
    <View style={main_style.container}>
      <StatusBar hidden />

      {alert && !scales && (
        <View style={main_style.alert}>
          <Text style={main_style.alertText}>{eng.alert.noKey}</Text>
        </View>
      )}

      <NativeRouter>
        <BG />

        <SafeAreaView style={main_style.safe}>
          <Navigation
            scales={scales}
            alert={handleAlert}
            legend={legend}
            legendCallback={(bool) => setLegend(bool)}
          />
          <Route path="/info" component={Info} />
          <Route path="/rewarded">
            <Rewarded
              ads={{ ios: admob_ios.rewarded, android: admob_android.rewarded }}
              reward={handleReward}
            />
          </Route>
          <Route path="/chords">
            <Chords
              legend={legend}
              selectedScale={selectedScale}
              scales={scales}
              chordsUnlocked={displayAds ? chordsUnlocked : true}
              review={() => useReview(chordsUnlocked, reviewDelay)}
            />
          </Route>
          <Route exact path="/">
            <Scales
              legend={legend}
              selectedScale={selectedScale}
              scales={scales}
              axis={axis}
              activeKey={activeKey}
              callbacks={handleScaleCallbacks}
              review={() => useReview(chordsUnlocked, reviewDelay)}
            />
          </Route>
        </SafeAreaView>

        <Redirect exact to="/" />
      </NativeRouter>

      <View style={main_style.ads}>
        {ads && displayAds && (
          <AdMobBanner
            bannerSize="smartBannerPortrait"
            adUnitID={
              Platform.OS === "ios" ? admob_ios.banner : admob_android.banner
            }
            servePersonalizedAds={personalised}
          />
        )}
      </View>
    </View>
  );
}

export default Body;
