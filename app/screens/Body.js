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

import WhiteBG from "./WhiteBG";
import GradientBG from "./GradientBG";
import Navigation from "../elements/Navigation";
import Disclamer from "./Disclamer";
import Rewarded from "./Rewarded";
import Chords from "./Chords";
import Scales from "./Scales";

import { eng } from "../locales";
import { useReview } from "../utils";
import { scaleList } from "../utils/patterns";
import { admob } from "../tokens";

import main_style from "../styles/main_style";

const reviewDelay = new Date().valueOf() + 60000;
const emulator = Device.isDevice;
const admob_ios = {
  banner: emulator ? admob.banner.ios : admob.banner.ios_test,
  rewarded: emulator ? admob.rewarded.ios : admob.rewarded.ios_test,
};
const admob_android = {
  banner: emulator ? admob.banner.android : admob.banner.android_test,
  rewarded: emulator ? admob.rewarded.android : admob.rewarded.android_test,
};

function Body() {
  const [ads, setAds] = useState(false);
  const [personalised, setPersonalised] = useState(false);
  const [chordsUnlocked, setChordsUnlocked] = useState(true);
  const [alert, setAlert] = useState(false);

  const [selectedScale, setSelectedScale] = useState(scaleList[0]);
  const [scales, setScales] = useState(null);
  const [axis, setAxis] = useState({ status: false, angle: "0deg" });
  const [activeKey, setActiveKey] = useState({
    x: 0,
    y: 0,
    group: null,
    field: null,
  });

  useEffect(() => {
    setTimeout(askForPermission, 1000);
  }, []);

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

  const handleAlert = () => {
    setAlert(true);
    setTimeout(() => setAlert(false), 3000);
  };

  return (
    <View style={main_style.container}>
      <StatusBar hidden />

      {alert && !scales && (
        <View style={main_style.alert}>
          <Text style={main_style.alertText}>{eng.alert.noKey}</Text>
        </View>
      )}

      <NativeRouter>
        <BackButton />
        {/* <WhiteBG /> */}
        <GradientBG />

        <SafeAreaView style={main_style.safe}>
          <Navigation scales={scales} alert={handleAlert} />
          <Route path="/disclamer" component={Disclamer} />
          <Route path="/rewarded" component={Rewarded} />
          <Route path="/chords">
            <Chords
              selectedScale={selectedScale}
              scales={scales}
              chordsUnlocked={chordsUnlocked}
              review={() => useReview(chordsUnlocked, reviewDelay)}
            />
          </Route>
          <Route exact path="/">
            <Scales
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
        {ads && (
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
