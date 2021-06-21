import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import MainScreen from "./app/screens/MainScreen";

function App() {
	let [fontsLoaded] = useFonts({
		NegativeHarmonyRegular: require("./app/assets/fonts/NegativeHarmony-Montserrat-Regular.ttf"),
		NegativeHarmonyBold: require("./app/assets/fonts/NegativeHarmony-Montserrat-Bold.ttf"),
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return <MainScreen />;
	}
}

export default App;
