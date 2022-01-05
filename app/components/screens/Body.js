import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { NativeRouter, Redirect, Route } from "react-router-native";
import {
  requestPermissionsAsync,
  getPermissionsAsync,
  AdMobBanner,
} from "expo-ads-admob";
import { useDispatch, useSelector } from "react-redux";
import { get, isEqual } from "lodash";

import BG from "./BG";
import Navigation from "../elements/Navigation";
import Loading from "./Loading";
import Info from "./Info";
import Rewarded from "./Rewarded";
import Chords from "./Chords";
import Scales from "./Scales";

import useLocale from "../../locales";
import {
  isRealDevice,
  storeDataToLocal,
  useAdmobIds,
  useLocalStorage,
} from "../../utils";
import { actions, selectors } from "../../store/cmsStore";
import { localStorageKeys } from "../../tokens";

import main_style from "../../styles/main_style";

function Body() {
  const initLoad = useRef(false);
  const t = useLocale;
  const localStorage = useLocalStorage;
  const dispatch = useDispatch();
  const cmsTimestamps = useSelector((state) => selectors.getTimestamps(state));
  const cmsData = useSelector((state) => state.cms);
  const scales = useSelector((state) => state.global.scales);
  const admobId = useAdmobIds(get(cmsData, "master.adIds", null)).banner;
  const [ads, setAds] = useState(false);
  const [personalised, setPersonalised] = useState(false);
  const [alert, setAlert] = useState(false);
  const [legend, setLegend] = useState(false);
  const [savedTimestamps, setSavedTimestamps] = useState(null);
  const displayAds = isRealDevice
    ? get(cmsData, "master.ads", null)
    : get(cmsData, "master.adsStaging", null);
  const loading = !["master", "scales", "chords"].every(
    (key) => key in cmsData
  );

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
    const checkStamps = isEqual(cmsTimestamps, savedTimestamps);
    if (cmsTimestamps && savedTimestamps && checkStamps) {
      localStorage(localStorageKeys.appContent).then((res) =>
        dispatch(actions.storeLocalCMS(JSON.parse(res)))
      );
    }

    if (cmsTimestamps && savedTimestamps && !checkStamps) {
      dispatch(actions.fetchCMS());
      storeDataToLocal(
        localStorageKeys.contentTimestamps,
        JSON.stringify(cmsTimestamps)
      );
    }
  }, [cmsTimestamps, savedTimestamps]);

  useEffect(() => {
    if (!initLoad.current) {
      localStorage(localStorageKeys.contentTimestamps).then((res) =>
        setSavedTimestamps(JSON.parse(res))
      );
      dispatch(actions.checkTimestamps());
      setTimeout(askForPermission, 1000);
      initLoad.current = true;
    }
  }, []);

  if (loading) return <Loading />;

  return (
    <View style={main_style.container}>
      <StatusBar hidden />

      {alert && !scales && (
        <View style={main_style.alert}>
          <Text style={main_style.alertText}>{t("alert.noKey")}</Text>
        </View>
      )}

      <NativeRouter>
        <BG />

        <SafeAreaView style={main_style.safe}>
          <Navigation
            scales={scales}
            legend={legend}
            alert={handleAlert}
            legendCallback={(bool) => setLegend(bool)}
          />
          <Route path="/info" component={Info} />
          <Route path="/rewarded">
            <Rewarded />
          </Route>
          <Route path="/chords">
            <Chords legend={legend} />
          </Route>
          <Route exact path="/">
            <Scales legend={legend} />
          </Route>
        </SafeAreaView>

        <Redirect exact to="/" />
      </NativeRouter>

      <View style={main_style.ads}>
        {ads && displayAds && admobId && (
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
