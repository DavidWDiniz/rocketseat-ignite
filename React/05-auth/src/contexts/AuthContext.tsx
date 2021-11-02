import {createContext, ReactNode, useEffect, useState} from "react";
import Router from "next/router";
import {destroyCookie, parseCookies, setCookie} from "nookies";
import {api} from "../services/apiClient";

type User = {
  permissions: string[]
  roles: string[]
  email: string
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  user: User
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  isAuthenticated: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export function signOut() {
  destroyCookie(undefined, "auth.token")
  destroyCookie(undefined, "auth.refreshToken")

  authChannel.postMessage("signOut")
  Router.push("/")
}

export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<User>({email: "", permissions: [""], roles: [""]})
  const isAuthenticated = !!user

  useEffect(() => {
    authChannel = new BroadcastChannel("auth")
    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          signOut()
          break
        default:
          break
      }
    }
  }, [])

  useEffect(() => {
    const {"auth.token": token} = parseCookies()
    if (token) {
      api.get("/me").then(response => {
        const {email, permissions, roles} = response.data
        setUser({email, permissions, roles})
      }).catch(() => {
        signOut()
      })
    }
  }, [])

  async function signIn({email, password}: SignInCredentials) {
    try {
      const response = await api.post("sessions", {
        email,
        password
      })

      const {token, refreshToken, permissions, roles} = response.data

      setCookie(undefined, "auth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/"
      })
      setCookie(undefined, "auth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/"
      })

      setUser({email, permissions, roles})
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
      await Router.push("/dashboard")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{signIn, signOut, isAuthenticated, user}}>
      {children}
    </AuthContext.Provider>
  )
}
