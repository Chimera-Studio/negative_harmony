import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NativeRouter, Redirect, Route } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import {
  requestPermissionsAsync,
  getPermissionsAsync,
  AdMobBanner,
} from "expo-ads-admob";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get, isEqual } from "lodash";

import BG from "./BG";
import Navigation from "../elements/Navigation";
import Loading from "./Loading";
import Info from "./Info";
import Rewarded from "./Rewarded";
import Chords from "./Chords";
import Scales from "./Scales";

import useLocale from "../../locales";
import { isRealDevice, useAdmobIds } from "../../utils";
import { actions, selectors } from "../../store/cmsStore";
import { localStorageKeys } from "../../tokens";

import main_style from "../../styles/main_style";

function Body() {
  const t = useLocale;
  const dispatch = useDispatch();
  const [initLoad, setInitLoad] = useState(true);
  const varifyTimestamps = useSelector((state) =>
    selectors.getTimestamps(state)
  );
  const cms = useSelector((state) => state.cms);
  const global = useSelector((state) => state.global);
  const admobId = useAdmobIds(get(cms, "master.adIds", null)).banner;
  const [ads, setAds] = useState(false);
  const [personalised, setPersonalised] = useState(false);
  const [alert, setAlert] = useState(false);
  const [legend, setLegend] = useState(false);

  const localTimestamps = get(varifyTimestamps, "local", 0);
  const cmsTimestamps = get(varifyTimestamps, "cms", null);
  const checkStamps = isEqual(localTimestamps, cmsTimestamps);
  const displayAds = isRealDevice
    ? get(cms, "master.ads", false)
    : get(cms, "master.adsStaging", false);
  const loading = !["master", "scales", "chords"].every((key) => key in cms);

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

  const handleAlert = () => {
    setAlert(true);
    setTimeout(() => setAlert(false), 3000);
  };

  useEffect(() => {
    const handleLocalStorage = async () => {
      const res = await AsyncStorage.getItem(localStorageKeys.appContent);
      dispatch(actions.storeLocalCMS(JSON.parse(res)));
    };

    if (localTimestamps && cmsTimestamps && !checkStamps) {
      dispatch(actions.fetchCMS(cmsTimestamps));
    }

    if (localTimestamps && cmsTimestamps && checkStamps) {
      handleLocalStorage();
    }
  }, [checkStamps]);

  useEffect(() => {
    if (initLoad) {
      dispatch(actions.checkTimestamps());
      setTimeout(askForPermission, 1000);
      setInitLoad(false);
    }
  }, [initLoad]);

  if (loading) return <Loading />;

  return (
    <View style={main_style.container}>
      <StatusBar hidden />

      {alert && !global.scales && (
        <View style={main_style.alert}>
          <Text style={main_style.alertText}>{t("alert.noKey")}</Text>
        </View>
      )}

      <NativeRouter>
        <BG />

        <SafeAreaView style={main_style.safe}>
          <Navigation
            scales={global.scales}
            legend={legend}
            alert={handleAlert}
            legendCallback={(bool) => setLegend(bool)}
          />
          <Route path="/info" component={Info} />
          <Route path="/rewarded">
            <Rewarded />
          </Route>
          <Route path="/chords">
            <Chords legend={legend} displayAds={displayAds} />
          </Route>
          <Route exact path="/">
            <Scales legend={legend} />
          </Route>
        </SafeAreaView>

        <Redirect exact to="/" />
      </NativeRouter>

      <View style={main_style.ads}>
        {ads && displayAds && admobId && global.showBanner && (
          <AdMobBanner
            bannerSize="smartBannerPortrait"
            adUnitID={admobId}
            servePersonalizedAds={personalised}
          />
        )}
      </View>
    </View>
  );
}

export default Body;
