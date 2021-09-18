import Link from "next/link";
import React from "react";
import { ProfileProps } from "../pages/user/[username]";

export const ProfileComponent: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="sing">
      <div className="container question">
        <div className="question-wrapper">
          <div className="username-wrapper">
            <p className="username">@{user.username}</p>
          </div>
          <div className="question-length username-wrapper">
            <h5>{user.questions.length} вопросов</h5>
          </div>
          {user.questions.length ? (
            <div className="collection">
              {user.questions.map((item) => {
                const { id, question, views } = item;
                return (
                  <Link href={`/q/${id}`} key={id}>
                    <a className="collection-item">
                      <span className="badge" key={id}>
                        {views}
                      </span>
                      {question}
                    </a>
                  </Link>
                );
              })}
            </div>
          ) : (
            <h4>Вопросов нет</h4>
          )}
        </div>
      </div>
    </div>
  );
};
