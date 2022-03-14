import React, {createContext, ReactNode, useContext} from "react";

type AuthContextData = {}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export {AuthProvider, useAuth}
