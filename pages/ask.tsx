import { GetServerSideProps, NextPage } from "next";
import { requireAuthentication } from "../HOC/requireAuthentication";
import Head from "next/head";
import { AskComponent } from "../components/AskComponent";
const Ask: NextPage = () => {
  return (
    <>
      <Head>
        <title>Задать вопрос</title>
      </Head>
      <AskComponent />
    </>
  );
};
export default Ask;
export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
