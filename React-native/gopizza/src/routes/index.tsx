import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {USerStackRoutes} from "./user.stack.routes";
import {useAuth} from "../hooks/auth";
import {SignIn} from "../screens/SignIn";

export function Routes() {
  const {user} = useAuth();
  return (
    <NavigationContainer>
      {user ? <USerStackRoutes /> : <SignIn/>}
    </NavigationContainer>
  )
}