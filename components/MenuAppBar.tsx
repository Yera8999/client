import styles from "../styles/Header.module.css";
import Link from "next/link";
import axios from "axios";
import AuthContext from "../context/createContext";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import store from "../store/index";
import { url } from "../utils/url";
export default function MenuAppBar() {
  const [username, setUsername] = useState("");
  const { is_login, userData } = useContext(AuthContext);
  const router = useRouter();
  const logoutHandler = async () => {
    await axios
      .post(`${url}/api/auth/logout`, null, {
        withCredentials: true,
      })
      .then(() => {
        router.reload();
      })
      .catch(() => {
        alert("Произошла ошибка");
      });
  };
  const openModal = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    store.openModal();
  };
  const searchHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await router.push(`/search/${username}`);
  };
  return (
    <>
      <nav className="navbar navbar-light nav-bg">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand">
              <span className={styles.brand}>Рабр</span>{" "}
              <span className={styles.subBrand}>Q&A</span>
            </a>
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {!is_login ? (
              <li>
                <li>
                  <Link href="/sign-in">Войти на сайт</Link>
                </li>
                <li>
                  <Link href="#">
                    <a onClick={(e) => openModal(e)}>Задать вопрос</a>
                  </Link>
                </li>
              </li>
            ) : (
              <>
                <li>
                  <button className="btn" onClick={() => logoutHandler()}>
                    Выйти
                  </button>
                </li>
                <li>
                  <Link href={`/user/${userData.username}`}>К профилю</Link>
                </li>
                <li>
                  <Link href="/ask">Задать вопрос</Link>
                </li>
              </>
            )}
            <li>
              <form onSubmit={(e) => searchHandler(e)}>
                <input
                  type="text"
                  placeholder="Найти пользователя"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </form>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
