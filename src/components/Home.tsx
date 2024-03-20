import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

function Home() {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setUserData,
    userData,
    loading,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  console.log(userData);
  const [data, setData] = useState(userData);

  console.log("auth", isAuthenticated, loading);
  useEffect(() => {
    if (!loading) {
      if (isAuthenticated && userData?.username) {
        navigate("/admin/" + userData?.username);
      }
    }
  }, [isAuthenticated, loading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //Attempt sign in if not display error
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://mylink-backend.onrender.com/signin",
        {
          email: email.toLocaleLowerCase(),
          password: password,
          links: [],
        },
        { withCredentials: true }
      );
      console.log("response", response);
      localStorage.setItem("token", response.data.token);
      if (response.data.success) {
        if (setIsAuthenticated) {
          setData(response.data.user);
          if (setUserData) setUserData(response.data.user);
          setIsAuthenticated(true);
        }
      }

      setAlert(!response.data.success);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {alert && (
        <div
          className="alert absolute mb-5 alert-danger"
          style={{ top: "110px" }}
          role="alert"
        >
          Email or password was incorrect
        </div>
      )}
      <div className="text-5xl relative bottom-5 font-bold">MyLink</div>
      <div className="w-full flex-col flex items-center mb-4">
        <form
          className="flex w-full flex-column items-center justify-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="w-7/12">
            <input
              type="email"
              className="form-control rounded-3xl border-0 p-2"
              id="email"
              placeholder="email@example.com"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="w-7/12 mt-4">
            <input
              type="password"
              className="form-control rounded-3xl border-0 p-2"
              id="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button
            type="submit"
            className="bg-green-500 w-50 rounded-3xl p-2 border-0 text-white mt-4 font-bold"
          >
            Log In
          </button>
        </form>
        <button
          className="end-0 bg-white px-5 py-2 mt-4 rounded-3xl border-0 font-bold text-black"
          onClick={() => navigate("/Signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Home;
