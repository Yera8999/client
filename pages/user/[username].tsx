import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { ProfileComponent } from "../../components/ProfileComponent";
import Head from "next/head";
import FourOhFour from "../../components/404";
import { url } from "../../utils/url";

interface ProfileQuestionsStructure {
  id: number;
  question: string;
  views: string;
}

export interface ProfileProps {
  user: { username: string; questions: ProfileQuestionsStructure[] };
}

const Profile: NextPage<ProfileProps> = ({ user }) => {
  if (!user) {
    return (
      <>
        <Head>
          <title>Пользователь не найден</title>
        </Head>
        <FourOhFour errorMessage="Пользователь не найден" />
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Профиль пользователя {user.username}</title>
      </Head>
      <ProfileComponent user={user} />
    </>
  );
};
export default Profile;
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { username } = ctx.query;
  try {
    const res = await axios.get<ProfileProps>(`${url}/api/user/${username}`);
    const data = await res.data;
    return {
      props: { user: data },
    };
  } catch (e) {
    return {
      props: { user: null },
    };
  }
  return {
    props: { user: null },
  };
};
