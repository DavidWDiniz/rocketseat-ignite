import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {SignIn} from "../screens/SignIn";
import auth from "@react-native-firebase/auth";
import {AppRoutes} from "./app.routes";

interface User {
  uid: string;
}

export function Routes() {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    return auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);
  return (
    <NavigationContainer>
      {user ? <AppRoutes/> : <SignIn/>}
    </NavigationContainer>
  )
}