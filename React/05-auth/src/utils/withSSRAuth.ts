import {destroyCookie, parseCookies} from "nookies";
import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from "next";
import {AuthTokenError} from "../services/errors/AuthTokenError";
import decode from "jwt-decode";
import {validateUserPermissions} from "./validateUserPermissions";

type WithSSRAuthOptions = {
  permissions?: string[]
  roles?: string[]
}

export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: WithSSRAuthOptions): GetServerSideProps {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context)
    const token = cookies["auth.token"]
    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false
        }
      }
    }

    const user = decode<{permissions: string[], roles: string[]}>(token)
    if (options) {
      const {roles, permissions} = options
      const userHasValidPermissions = validateUserPermissions({
        user,
        permissions,
        roles
      })

      if (!userHasValidPermissions) {
        return {
          redirect: {
            destination: "/dashboard",
            permanent: false
          }
        }
      }
    }

    try {
      return await fn(context)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(context, "auth.token")
        destroyCookie(context, "auth.refreshToken")

        return {
          redirect: {
            destination: "/",
            permanent: false
          }
        }
      }
      return {notFound: true}
    }
  }
}
