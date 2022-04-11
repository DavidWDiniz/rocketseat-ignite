import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import {useTheme} from "styled-components/native";
import {Platform} from "react-native";
import {Orders} from "../screens/Orders";
import {Home} from "../screens/Home";

const {Navigator, Screen} = createBottomTabNavigator();

export function UserTabRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.COLORS.SECONDARY_900,
        tabBarInactiveTintColor: theme.COLORS.SECONDARY_400,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingVertical: Platform.OS === "ios" ? 20 : 0
        }
      }}
    >
      <Screen name="home" component={Home}/>
      <Screen name="orders" component={Orders}/>
    </Navigator>
  );
}