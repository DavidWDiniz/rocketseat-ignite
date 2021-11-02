import {parseCookies} from "nookies";
import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from "next";

export function withSSRGuest<P>(fn: GetServerSideProps<P>): GetServerSideProps {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context)

    if (cookies["auth.token"]) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false
        }
      }
    }

    return await fn(context)
  }
}
