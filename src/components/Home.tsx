import { useState, useEffect } from "react";
import "../css/App.css";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [data, setData] = useState({
    _id: null,
    email: null,
    username: null,
    password: null,
  });

  const { isAuthenticated, setIsAuthenticated, setUserData } = useAuth();

  useEffect(() => {
    console.log("succesful signin");
    if (isAuthenticated && data.username) {
      navigate("/admin/" + data.username);
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //Attempt sign in if not display error
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/signin",
        {
          email: email,
          password: password,
          links: [],
        },
        { withCredentials: true }
      );
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

  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      {alert && (
        <div
          className="alert position-absolute mb-5 alert-danger"
          style={{ top: "180px" }}
          role="alert"
        >
          Email or password was incorrect
        </div>
      )}
      <div className="fs-1 position-absolute title fw-bold">MyLink</div>
      <form
        className="d-flex w-100 flex-column align-items-center justify-content-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="row justify-content-center w-100">
          <div className="col-md-7">
            <input
              type="email"
              className="form-control rounded-pill border-0 p-2"
              id="email"
              placeholder="email@example.com"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="row justify-content-center w-100 mt-4">
          <div className="col-md-7">
            <input
              type="password"
              className="form-control rounded-pill border-0 p-2"
              id="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
        </div>
        <button
          type="submit"
          className="submit w-50 rounded-pill p-2 mt-4 border-0 text-white mt-3"
        >
          Log In
        </button>
      </form>
      <button
        className="end-0 px-5 py-2 mt-4 rounded-pill border-0"
        onClick={() => navigate("/Signup")}
      >
        Sign Up
      </button>
    </div>
  );
}

export default Home;
