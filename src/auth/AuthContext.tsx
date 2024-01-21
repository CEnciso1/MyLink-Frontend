import react from "react";
import { createContext, useContext, useState } from "react";
import { auth } from "./Auth";

const AuthContext = createContext<Partial<auth>>({});
type AuthContextProviderProps = {
  children: react.ReactNode;
};

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    _id: "",
    email: "",
    username: "",
    password: "",
    __v: null,
    links: Array(),
  });
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
        userData: userData,
        setUserData: setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
