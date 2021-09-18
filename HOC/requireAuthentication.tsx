import { GetServerSideProps, GetServerSidePropsContext } from "next";
import axios from "axios";
import { url } from "../utils/url";

export function requireAuthentication(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;
    let logged = false;
    if (req.cookies) {
      try {
        const res = await axios.get(`${url}/api/auth`, {
          withCredentials: true,
          headers: { cookie: ctx.req.headers.cookie },
        });
        const data = await res.data;
        logged = data.logged;
      } catch (e) {
        console.log(e);
      }
      if (!logged) {
        return {
          redirect: {
            permanent: false,
            destination: "/sign-in",
          },
        };
      }
    }
    return await gssp(ctx);
  };
}
export function notRequireAuthentication(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;
    let logged = false;
    if (req.cookies) {
      try {
        const res = await axios.get(`${url}/api/auth`, {
          withCredentials: true,
          headers: { cookie: ctx.req.headers.cookie },
        });
        const data = await res.data;
        logged = data.logged;
      } catch (e) {
        console.log(e);
      }
      if (logged) {
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
        };
      }
    }
    return await gssp(ctx);
  };
}
