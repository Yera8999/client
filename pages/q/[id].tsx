import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { QuestionComponent } from "../../components/QuestionComponent";
import axios from "axios";
import FourOhFour from "../../components/404";
import Head from "next/head";
import { url } from "../../utils/url";

export interface QuestionProps {
  question: {
    id: number;
    question: string;
    tags: string;
    description: string;
    owner: string;
    username: string;
    answers: any[];
    views: string;
  };
}
const Question: NextPage<QuestionProps> = ({ question }) => {
  if (!question) {
    return (
      <>
        <Head>
          <title>Вопрос не найден</title>
        </Head>
        <FourOhFour errorMessage="Вопрос не найден" />
      </>
    );
  }
  return (
    <>
      <Head>
        <title>{question.question}</title>
      </Head>
      <QuestionComponent question={question} />
    </>
  );
};
export default Question;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  try {
    const res = await axios.get(`${url}/api/question/${id}`);
    const data = res.data;
    return {
      props: { question: data },
    };
  } catch (e) {
    return {
      props: { question: null },
    };
  }
  return {
    props: { question: null },
  };
};
