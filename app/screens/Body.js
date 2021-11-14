import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { SafeAreaView, View } from "react-native";
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

import { admob } from "../tokens";

import main_style from "../styles/main_style";

const emulator = Device.isDevice;
const admob_ios = {
  banner: emulator ? admob.banner.ios : admob.banner.ios_test,
  rewarded: emulator ? admob.rewarded.ios : admob.rewarded.ios_test,
};
const admob_android = {
  banner: emulator ? admob.banner.android : admob.banner.android_test,
  rewarded: emulator ? admob.rewarded.android : admob.rewarded.android_test,
};

const delayTime = new Date().valueOf() + 60000;

function Body() {
  const [personalised, setPersonalised] = useState(false);
  const [ads, setAds] = useState(false);
  const [alert, setAlert] = useState(false);

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

  return (
    <View style={main_style.container}>
      <StatusBar hidden />

      {alert && (
        <View style={main_style.alert}>
          <Text style={main_style.alertText}>You need to tap on a field!</Text>
        </View>
      )}

      <NativeRouter>
        <BackButton />
        {/* <WhiteBG /> */}
        <GradientBG />

        <SafeAreaView style={main_style.safe}>
          <Navigation />
          <Route exact path="/disclamer" component={Disclamer} />
          <Route exact path="/rewarded" component={Rewarded} />
          <Route exact path="/chords" component={Chords} />
          <Route exact path="/" component={Scales} />
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
