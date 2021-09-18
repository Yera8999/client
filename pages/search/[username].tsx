import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { UsersList } from "../../components/UsersList";
import { url } from "../../utils/url";
export interface SearchUsersProps {
  users: { id: number; username: string }[];
}
const SearchUsers: NextPage<SearchUsersProps> = ({ users }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{router.query.username}</title>
      </Head>
      <UsersList users={users} />
    </>
  );
};
export default SearchUsers;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.query.username;
  const res = await axios.get<SearchUsersProps>(
    `${url}/api/user/find/${username}`
  );
  const data = res.data;

  return {
    props: { users: data },
  };
};
