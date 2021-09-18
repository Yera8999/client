import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { notRequireAuthentication } from "../HOC/requireAuthentication";
import { SignUpComponent } from "../components/sign-up-component";
const SignUp: NextPage = () => {
  return (
    <>
      <Head>
        <title>Регистрация аккаунта</title>
      </Head>
      <SignUpComponent />
    </>
  );
};
export default SignUp;
export const getServerSideProps: GetServerSideProps = notRequireAuthentication(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
