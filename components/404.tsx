import Link from "next/link";
import React from "react";

interface Props {
  errorMessage: string;
}

const FourOhFour: React.FC<Props> = ({ errorMessage }) => {
  return (
    <div className="container">
      <h1>404 - {errorMessage}</h1>
      <Link href="/">На главную страницу</Link>
    </div>
  );
};
export default FourOhFour;
