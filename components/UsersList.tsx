import Link from "next/link";
import React from "react";
import { SearchUsersProps } from "../pages/search/[username]";

export const UsersList: React.FC<SearchUsersProps> = ({ users }) => {
  return (
    <div className="container">
      <h3>Найдено пользователей: {users.length}</h3>
      <div className="collection">
        {users.map((user) => {
          const { username, id } = user;
          return (
            <Link key={id} href={`/user/${username}`}>
              <a className="collection-item">{username}</a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
