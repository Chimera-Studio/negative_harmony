import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";

import Body from "./app/components/screens/Body";
import { configureStore } from "./app/store";

const initialState = {
  global: {
    reviewDelay: Date.now() + 60000,
    scale: null,
    chord: null,
    axis: { status: false, angle: "0deg" },
    activeKey: { x: 0, y: 0, group: null, field: null },
    showBanner: true,
    unlocked: false,
  },
};
const store = configureStore(initialState);

function App() {
  const [fontsLoaded] = useFonts({
    NegativeHarmonyRegular: require("./app/assets/fonts/NegativeHarmony-Montserrat-Regular.ttf"),
    NegativeHarmonyBold: require("./app/assets/fonts/NegativeHarmony-Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <Body />
      </Provider>
    );
  }
}

export default App;
