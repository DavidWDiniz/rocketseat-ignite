import React from 'react';
import {ThemeProvider} from "styled-components";
import {useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold} from "@expo-google-fonts/poppins"

import theme from "./scr/global/styles/theme";
import AppLoading from "expo-app-loading";

import "intl";
import "intl/locale-data/jsonp/pt-BR";
import {StatusBar} from "react-native";
import {AuthProvider, useAuth} from "./scr/hooks/auth";
import {Routes} from "./scr/routes";

export default function App() {
  const [fontsLoaded] = useFonts({Poppins_400Regular, Poppins_500Medium, Poppins_700Bold});
  const {userStorageLoading} = useAuth();
  if(!fontsLoaded && userStorageLoading) {
    return <AppLoading />
  }

  return (
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
          <AuthProvider>
            <Routes />
          </AuthProvider>
      </ThemeProvider>
  );
}
