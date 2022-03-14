import React, {createContext, ReactNode, useContext, useState} from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {Alert} from "react-native";

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
}

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  isLogging: boolean;
  user: User | null;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps) {
  const [isLogging, setIsLogging] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  async function signIn(email: string, password: string) {
    if(!email || !password) {
      return Alert.alert("Login", "Informe o e-mail e a senha.");
    }
    setIsLogging(true);
    auth().signInWithEmailAndPassword(email, password)
      .then(account => {
        firestore()
          .collection("users")
          .doc(account.user.uid)
          .get()
          .then(profile => {
            const {name, isAdmin} = profile.data() as User;
            if (profile.exists) {
              const userData = {
                id: account.user.uid,
                name,
                isAdmin
              }
              setUser(userData);
            }
          })
          .catch(() => Alert.alert("Login", "Não foi possível buscar os dados do perfil do usuário"));
      })
      .catch(error => {
        const {code} = error;
        if(code === "auth/user-not-found" || code === "auth/wrong-password") {
          return Alert.alert("Login", "E-mail e/ou senha incorretos.");
        } else {
          return Alert.alert("Login", "Não foi possível realizar o login.");
        }
      })
      .finally(() => setIsLogging(false));

  }

  return (
    <AuthContext.Provider value={{
      signIn,
      isLogging,
      user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export {AuthProvider, useAuth}
