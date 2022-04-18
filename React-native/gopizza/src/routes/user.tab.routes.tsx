import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, {useEffect, useState} from "react";
import {useTheme} from "styled-components/native";
import {Platform} from "react-native";
import {Orders} from "../screens/Orders";
import {Home} from "../screens/Home";
import {BottomMenu} from "../components/BottomMenu";
import firestore from "@react-native-firebase/firestore";

const {Navigator, Screen} = createBottomTabNavigator();

export function UserTabRoutes() {
  const [notifications, setNotifications] = useState("0");

  const theme = useTheme();

  useEffect(() => {
    const subscribe = firestore()
      .collection("orders")
      .where("status", "==", "Pronto")
      .onSnapshot(querySnapshot => {
        setNotifications(String(querySnapshot.docs.length));
      });
    return () => subscribe();
  }, []);
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
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <BottomMenu title="Cardápio" color={color} />
          )
        }}
      />
      <Screen
        name="orders"
        component={Orders}
        options={{
          tabBarIcon: ({color}) => (
            <BottomMenu title="Pedidos" color={color} notifications={notifications} />
          )
        }}
      />
    </Navigator>
  );
}