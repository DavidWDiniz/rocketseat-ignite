import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {USerStackRoutes} from "./user.stack.routes";

export function Routes() {
  return (
    <NavigationContainer>
      <USerStackRoutes/>
    </NavigationContainer>
  )
}