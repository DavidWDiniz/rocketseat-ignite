import React from 'react';
import {ThemeProvider} from "styled-components";
import {useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold} from "@expo-google-fonts/poppins"

import theme from "./scr/global/styles/theme";
import AppLoading from "expo-app-loading";
import {Register} from "./scr/screens/Register";

export default function App() {
  const [fontsLoaded] = useFonts({Poppins_400Regular, Poppins_500Medium, Poppins_700Bold});

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
      <ThemeProvider theme={theme}>
        <Register />
      </ThemeProvider>
  );
}