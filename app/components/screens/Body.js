import React, { useState, useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NativeRouter, Redirect, Route } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import {
  requestPermissionsAsync,
  getPermissionsAsync,
  AdMobBanner,
} from "expo-ads-admob";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "lodash";

import BG from "./BG";
import Navigation from "../block/Navigation";
import Loading from "./Loading";
import Announcement from "./Announcement";
import Info from "./Info";
import Rewarded from "./Rewarded";
import Chords from "./Chords";
import Scales from "./Scales";
import Alert from "../elements/Alert";

import useLocale from "../../locales";
import { isProduction, useAdmobIds } from "../../utils";
import { actions } from "../../store/cmsStore";
import { appKeys, localStorageKeys } from "../../tokens";

import main_style from "../../styles/main_style";

function Body() {
  const t = useLocale;
  const dispatch = useDispatch();
  const [initLoad, setInitLoad] = useState(true);
  const cms = useSelector((state) => state.cms);
  const global = useSelector((state) => state.global);
  const admobId = useAdmobIds(get(cms, "master.adIds", null)).banner;
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [ads, setAds] = useState(false);
  const [personalised, setPersonalised] = useState(false);
  const [alert, setAlert] = useState(false);
  const [legend, setLegend] = useState(false);

  const localTimestamps = get(cms, "timestamps.local", 0);
  const onlineTimestamps = get(cms, "timestamps.online", null);
  const checkStamps =
    JSON.stringify(localTimestamps) === JSON.stringify(onlineTimestamps);
  const announcementSeen =
    get(cms, "timestamps.local.announcement", 0) <
    get(cms, "timestamps.announcement", 0);
  const displayAds = isProduction
    ? get(cms, "master.ads", false)
    : get(cms, "master.adsStaging", false);
  const loading = !["master", "scales", "chords"].every((key) => key in cms);
  const hasAnnouncement = get(cms, "announcement.content", null);

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
    if (loading) {
      const handleLocalStorage = async () => {
        const res = await AsyncStorage.getItem(localStorageKeys.appContent);
        dispatch(actions.storeLocalCMS(JSON.parse(res)));
      };

      const localCheck =
        localTimestamps && localTimestamps !== appKeys.noLocalData;
      const onlineCheck =
        onlineTimestamps && onlineTimestamps !== appKeys.noConnection;

      if (
        (localCheck && onlineCheck && !checkStamps) ||
        (localTimestamps === appKeys.noLocalData && onlineCheck)
      ) {
        dispatch(actions.fetchCMS(onlineTimestamps));
      }

      if (
        (localCheck && onlineCheck && checkStamps) ||
        (localCheck && onlineTimestamps === appKeys.noConnection)
      ) {
        handleLocalStorage();
      }
    }
  }, [localTimestamps, onlineTimestamps, checkStamps]);

  useEffect(() => {
    if (initLoad) {
      dispatch(actions.checkTimestamps());
      setTimeout(askForPermission, 1000);
      setInitLoad(false);
    }
  }, [initLoad]);

  if (
    (localTimestamps === appKeys.noLocalData &&
      onlineTimestamps === appKeys.noConnection) ||
    (hasAnnouncement && !announcementSeen && showAnnouncement)
  ) {
    return (
      <Announcement
        reload={() => dispatch(actions.checkTimestamps())}
        dismiss={() => setShowAnnouncement(false)}
        cms={hasAnnouncement}
      />
    );
  }

  if (loading) return <Loading />;

  return (
    <View style={main_style.container}>
      <StatusBar hidden />

      {alert && !global.scales && <Alert text={t("alert.noKey")} />}

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
