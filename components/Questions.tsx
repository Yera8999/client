import React from "react";
import Link from "next/link";

export interface QuestionsResponse {
  id: number;
  question: string;
  description: string;
  views: string;
}
interface Props {
  questions: QuestionsResponse[];
}

export const Questions: React.FC<Props> = ({ questions }) => {
  return (
    <>
      <div className="collection">
        {questions.map((item) => {
          const { id, views, question } = item;
          return (
            <Link href={`/q/${id}`} key={id}>
              <a className="collection-item">
                <span className="badge" key={id}>
                  {views} просмотров
                </span>
                {question}
              </a>
            </Link>
          );
        })}
      </div>
    </>
  );
};
