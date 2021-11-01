import {destroyCookie, parseCookies} from "nookies";
import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from "next";
import {AuthTokenError} from "../services/errors/AuthTokenError";

export function withSSRAuth<P>(fn: GetServerSideProps<P>): GetServerSideProps {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context)

    if (!cookies["auth.token"]) {
      return {
        redirect: {
          destination: "/",
          permanent: false
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
