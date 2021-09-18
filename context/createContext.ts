import { createContext } from "react";

const AuthContext = createContext({
  is_login: false,
  userData: { id: 0, username: "" },
});
export default AuthContext;
