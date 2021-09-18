import { GetServerSideProps, NextPage } from "next";
import { notRequireAuthentication } from "../HOC/requireAuthentication";
import Head from "next/head";
import { SignInComponent } from "../components/sign-in-component";
const SignIn: NextPage = () => {
  return (
    <>
      <Head>
        <title>Вход</title>
      </Head>
      <SignInComponent />
    </>
  );
};
export default SignIn;
export const getServerSideProps: GetServerSideProps = notRequireAuthentication(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
