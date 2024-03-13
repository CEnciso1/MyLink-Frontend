import react from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./Auth";
import axios from "axios";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticateToken = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.post(
            "https://mylink-backend.onrender.com/auth",
            {
              token: token,
            }
          );
          setIsAuthenticated(response.data.result as boolean);
          delete response.data["result"];
          console.log("auth-context", response.data);
          setUserData(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };
    authenticateToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
        userData: userData,
        setUserData: setUserData,
        loading: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
