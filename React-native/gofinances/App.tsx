import React from 'react';
import {ThemeProvider} from "styled-components";
import {useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold} from "@expo-google-fonts/poppins"

import theme from "./scr/global/styles/theme";
import AppLoading from "expo-app-loading";
import {NavigationContainer} from "@react-navigation/native";

import "intl";
import "intl/locale-data/jsonp/pt-BR";
import {StatusBar} from "react-native";
import {SignIn} from "./scr/screens/SignIn";
import {AuthProvider} from "./scr/hooks/auth";

export default function App() {
  const [fontsLoaded] = useFonts({Poppins_400Regular, Poppins_500Medium, Poppins_700Bold});

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <AuthProvider>
            <SignIn />
          </AuthProvider>
        </NavigationContainer>
      </ThemeProvider>
  );
}
