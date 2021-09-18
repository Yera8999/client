import AuthContext from "./createContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../utils/url";

// @ts-ignore
export const AuthContextProvider = ({ children }) => {
  const [is_login, setIs_login] = useState(false);
  const [username, setUsername] = useState("");
  const [id, setId] = useState(0);
  const fetch = async () => {
    try {
      const res = await axios.get(`${url}/api/auth`, {
        withCredentials: true,
      });
      const data = await res.data;
      const { id, username, logged } = data;
      setIs_login(logged);
      setUsername(username);
      setId(id);
      return;
    } catch (e) {
      console.log(e);
      return {
        props: {
          id: null,
          username: null,
          logged: false,
        },
      };
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <AuthContext.Provider value={{ is_login, userData: { id, username } }}>
      {children}
    </AuthContext.Provider>
  );
};
