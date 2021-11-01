import axios, {AxiosError} from "axios";
import {parseCookies, setCookie} from "nookies";
import {signOut} from "../contexts/AuthContext";
import {GetServerSidePropsContext} from "next";
import {AuthTokenError} from "./errors/AuthTokenError";

let isRefreshing = false
let failedRequestsQueue: { onSuccess: (token: string) => void; onFailure: (err: AxiosError) => void; }[] = []

export function setupAPIClient(context: GetServerSidePropsContext | undefined = undefined) {
  let cookies = parseCookies(context)
  const api = axios.create({
    baseURL: "http://localhost:3333",
  })

  api.defaults.headers.common["Authorization"] = `Bearer ${cookies["auth.token"]}`

  api.interceptors.response.use(response => {
    return response
  }, (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (error.response.data?.code === "token.expired") {
        cookies = parseCookies(context)
        const {"auth.refreshToken": refreshToken} = cookies
        const originalConfig = error.config

        if (!isRefreshing) {
          isRefreshing = true
          api.post("/refresh", {
            refreshToken,
          }).then(response => {
            const {token} = response.data

            setCookie(context, "auth.token", token, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: "/"
            })

            setCookie(context, "auth.refreshToken", response.data.refreshToken, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: "/"
            })

            api.defaults.headers.common["Authorization"] = `Bearer ${token}`
            failedRequestsQueue.forEach(request => request.onSuccess(token))
            failedRequestsQueue = []
          }).catch(err => {
            failedRequestsQueue.forEach(request => request.onFailure(err))
            failedRequestsQueue = []
            if (process.browser) {
              signOut()
            } else {
              return Promise.reject(new AuthTokenError())
            }
          }).finally(() => {
            isRefreshing = false
          })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              if (originalConfig.headers) {
                originalConfig.headers["Authorization"] = `Bearer ${token}`
                resolve(api(originalConfig))
              }
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            }
          })
        })
      } else {
        if (process.browser) {
          signOut()
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }

      return Promise.reject(error)
    }
  })

  return api
}
