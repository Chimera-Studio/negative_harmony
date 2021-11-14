import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import Body from "./app/screens/Body";

function App() {
  const [fontsLoaded] = useFonts({
    NegativeHarmonyRegular: require("./app/assets/fonts/NegativeHarmony-Montserrat-Regular.ttf"),
    NegativeHarmonyBold: require("./app/assets/fonts/NegativeHarmony-Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <Body />;
  }
}

export default App;
